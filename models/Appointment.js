const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);

class Appointment extends Model {}

Appointment.init(
  {
    attendee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'user',
        key: "id"
    }
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
          model: 'user',
          key: "id"
      }
    },
    appointment_time: {
      type: TIMESTAMP,
      allowNull: false,
    },
    duration: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscore: true,
    freezeTableName: true,
    modelName: "appointment",
  }
);

module.exports = Appointment;
