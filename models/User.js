const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class User extends Model {
  // Compare Passwords and encrypt
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
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
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    underscore: true,
    freezeTableName: true,
    modelName: "user",
  }
);

model.exports = User;
