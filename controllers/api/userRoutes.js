const router = require('express').Router();
const  { User } = require("../../models");

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.user = {id: userData.id}
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/session', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(user && await user.checkPassword(password)){
        req.session.user = {id: user.id}
        res.status(200).json(user); 
        return 
    }
    res.status(401).send("Invalid login credentials!");
})

// Logout
router.delete('/session', async (req, res) => {
    if(req.session.user == null) {
        res.status(401).send("Youre not logged in!");
        return
    }
    req.session = null;
    res.sendStatus(204);
})



module.exports = router;