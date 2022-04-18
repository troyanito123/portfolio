const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const { sequelize } = require("../database/models");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      messages: "/api/messages",
      auth: "/api/auth",
      users: "/api/users",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    sequelize.authenticate().then(() => {
      console.log("Se ha establecido la conexión");
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: false }));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.json("HELLO");
    });
    this.app.use(this.paths.messages, require("../routes/messages.route"));
    this.app.use(this.paths.users, require("../routes/users.route"));
    this.app.use(this.paths.auth, require("../routes/auth.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER READY ON PORT ${this.port}`);
    });
  }
}

module.exports = Server;
