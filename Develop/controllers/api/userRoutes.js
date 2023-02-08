const router = require('express').Router();
const { User } = require('../../models');


//creates new user
router.post('/', async (req, res) => {
  console.log("inside the signup route:", req.body)
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    console.log("user create",userData)
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      req.session.username = userData.username
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
   
  }
  
});


//login rout
router.post('/login', async (req, res) => {
  console.log("login route: ", req.body)
  // try {
    console.log("before the findOne call")

    const userData = await User.findOne({
       where: { username: req.body.name } });
      console.log("after the findOne call")
    if (!userData) {
      console.log("userdata not found")
      res
        .status(400)
        .json({ message: 'User not found' });
      return;
    }
    console.log("userData: ", userData);

    const validPassword = await userData.checkPassword(req.body.password);
    console.log("validPassword: ", validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      req.session.username = userData.username
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  // } catch (err) {
  //   res.status(400).json(err);
  // }
});
//logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;


