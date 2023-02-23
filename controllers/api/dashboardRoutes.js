const router = require("express").Router();
const { Post,User } = require('../../models');
const withAuth = require('../../utils/auth');


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
		});

		res.render('dashboard', {
			...user,
			loggedIn: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
