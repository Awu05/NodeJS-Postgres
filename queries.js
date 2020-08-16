const Pool = require("pg").Pool;
const pool = new Pool({
  user: "admin",
  host: "host.docker.internal",
  database: "appDB",
  password: "admin",
  port: 5432,
});

const initDB = () => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS users (ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30));",
    () => {}
  );
};

const getUsers = (request, respose) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      console.log(error);
    } else {
      respose.status(200).json(results.rows);
    }
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        response.status(201).send(`${name} as been added!`);
      }
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        response.status(200).send(`User with ID: ${id} has been updated!`);
      }
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.status(200).send(`User with ID: ${id} has been deleted!`);
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  initDB,
};
