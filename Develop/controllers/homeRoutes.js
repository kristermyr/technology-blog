const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  res.render("homepage", {loggedIn:req.session.loggedIn});
});
router.get("/dashboard", async (req, res) => {
  res.render("dashboard", {loggedIn:req.session.loggedIn});
});

router.get("/dashboard/newpost", async (req, res) => {
  res.render("newpost",{loggedIn:req.session.loggedIn});
});
router.get('/login', (req, res) => {
   
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});
//dashboard

router.get("/dashboard", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.render("dashboard");
    return;
  }

  res.render("login");
});


module.exports = router;