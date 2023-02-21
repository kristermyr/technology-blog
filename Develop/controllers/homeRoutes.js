const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   res.render("homepage", {loggedIn:req.session.loggedIn});
// });
router.get("/dashboard", async (req, res) => {
  res.render("dashboard", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard/newpost", withAuth, async (req, res) => {
  res.render("newpost");
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
//dashboard

// router.get("/dashboard", (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.loggedIn) {
//     res.render("dashboard");
//     return;
//   }

//   res.render("login");
// });
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
          logged_in: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
});
module.exports = router;
