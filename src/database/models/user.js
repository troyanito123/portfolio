"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    static async auth(email, password) {
      const user = await this.findOne({
        where: { email },
        attributes: ["id", "name", "email", "password", "role"],
      });
      if (!user) {
        return false;
      }

      if (!user.authenticate(password)) {
        return false;
      }

      const { id, name, email: e, role } = user;
      return { id, name, email: e, role };
    }

    authenticate(password) {
      return bcryptjs.compareSync(password, this.password);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", bcryptjs.hashSync(value));
        },
      },
      role: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("role", value.toUpperCase());
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      defaultScope: { attributes: { exclude: ["password"] } },
    }
  );

  return User;
};
