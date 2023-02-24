const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// renders newpost for the user to write a new post
router.get("/dashboard/newpost", withAuth, async (req, res) => {
  res.render("newpost");
});

//lets user log in, if already logged in redirect to home
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
//sends user to signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

//getting PostData from DB on to homepage
router.get("/", async (req, res) => {
  Post.findAll({
    include:{model:User},
    model:Post,
    
  })
    .then((postData) => {
      const posts = postData.map((post) =>
        post.get({
          plain: true,
        })
        
      ); 
      console.log('Postdata',posts)
        
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// gets individual post 
router.get('/post/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comment,
					include: [User]
				}
			],
		});

    const post = postData.get({
			plain: true
		});
		res.render('post', {
			...post,
			loggedIn: req.session.loggedIn
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// renders dashboard with the logged in users posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: {
              exclude: ['password']
          },
          include: [{
              model: Post
          }],
      });

      const user = userData.get({
          plain: true
          
      }); console.log(user);

      res.render('dashboard', {
          ...user,
          loggedIn: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;
