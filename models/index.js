const User = require('./User');
const Appointment = require('./Appointment');

User.hasMany(Appointment,{
    foreignKey: 'attendee_id',
    onDelete: 'CASCADE'
});

User.hasMany(Appointment,{
    foreignKey: 'organizer_id',
    onDelete: 'CASCADE'
});

Appointment.belongsTo(User, {
    foreignKey: 'attendee_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Appointment};
