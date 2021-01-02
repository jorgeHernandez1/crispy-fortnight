const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class User extends Model {
  // Compare Passwords and encrypt
  checkPassword(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
  }
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;
    delete values.email;
    return values;
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          await bcrypt.genSalt(10)
        );
        return newUserData;
      },
    },
    sequelize,
    underscore: true,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
