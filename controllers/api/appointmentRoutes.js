const router = require('express').Router();
const { User, Appointment } = require('../../models');

// Create Appointment
router.post('/', async (req, res) => {
  try {
    // Create object to send to db
    const userData = {
      attendee_id: req.body.attendee_id,
      organizer_id: req.session.user_id,
      appointment_time: req.body.appointment_time,
      duration: req.body.duration,
    };
    const newOnsie = await Appointment.create(userData);
    // Success
    res.status(200).json(newOnsie);
  } catch (err) {
    // We messed up
    res.status(500).json(err);
  }
});

// Update Appointment
router.put('/', async (req, res) => {
  try {
    // Only allow users to change time and duration
    const updatedOnesie = await Appointment.update(
      {
        duration: req.body.duration,
        appointment_time: req.body.appointment_time,
      },
      {
        where: {
          id: req.body.appointment_id,
        },
      }
    );

    if (!updatedOnesie) {
      // Appointment not found
      res.status(400).json({ message: 'Appointment not found.' });
    } else {
      // Success
      res.status(200).json(updatedOnesie);
    }
  } catch (err) {
    // We messed up
    res.status(500).json(err);
  }
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedAppointment) {
      // Appointment not found
      res.status(400).json({ message: 'Appointment not found.' });
    } else {
      // Success
      res.status(200).json(deletedAppointment);
    }
  } catch (err) {
    // We messed up
    res.status(500).json(err);
  }
});

module.exports = router;
