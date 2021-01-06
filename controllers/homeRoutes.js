const router = require('express').Router();
const { Appointment, User } = require('../models')
const { Op } = require("sequelize");

// Homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  })
});
// Login page
router.get('/login', async (req, res) =>{
  res.render('login')
});
// Sign Up page
router.get('/signup', async (req, res) =>{
  res.render('signup', {
    logged_in: req.session.logged_in,
  })
});
// Dashboard
router.get('/dashboard', async (req, res) => {  
  if(!req.session.logged_in){
    // Redirect non logged in users to login page
    res.render('login');
  }else {

    // Get all of users appointments
    const allOnesies = await Appointment.findAll({
      where: {
        [Op.or]: [
          { organizer_id: req.session.user_id }, 
          { attendee_id: req.session.user_id }]
      },
      include: [
        {
          model: User,
          attributes: ['displayName'],
        },
      ],
    });
    console.log(allOnesies)
    // scrub data from db before sending out  
    const appData = allOnesies.map((onesie) => onesie.get({ plain: true}));

    console.log(appData)
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      appointments: appData
    });
  };
});

module.exports = router;