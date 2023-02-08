const router = require("express").Router();
const { Post,User } = require('../../models');
const withAuth = require('../../utils/auth');
router.get("/dashboard", async (req, res) => {
    res.render("dashboard", {loggedIn:req.session.loggedIn});
  });




 