const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const { sequelize } = require("../database/models");
const { createDefaultUser } = require("../scripts/generate-default-values");
const path = require("path");

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
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../public/index.html"));
    });
    this.app.use(this.paths.messages, require("../routes/messages.route"));
    this.app.use(this.paths.users, require("../routes/users.route"));
    this.app.use(this.paths.auth, require("../routes/auth.route"));
  }

  listen() {
    this.app.listen(this.port, async () => {
      await createDefaultUser();
      console.log(`SERVER READY ON PORT ${this.port}`);
    });
  }
}

module.exports = Server;
