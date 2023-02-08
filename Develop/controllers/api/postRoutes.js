const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { User,Post } = require('../../models');


router.post("/",withAuth, async (req,res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        })
        .then(dbPostData => {
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
        })


module.exports = router;