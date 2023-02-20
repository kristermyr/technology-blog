const router = require("express").Router();
const { Post,User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/dashboard", async (req, res) => {
    res.render("dashboard", {loggedIn:req.session.loggedIn});
  });


  router.get("/", async (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.usder_id
      },
      attributes: [
      'id',
      'content',
      'title',
      'date_created']
      
    })
      .then((postData) => {
        const posts = postData.map((post) =>
          post.get({
            plain: true,
          })
          
        ); 
      
        res.render("dashboard", {
          posts,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });