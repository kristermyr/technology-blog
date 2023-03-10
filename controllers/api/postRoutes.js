const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { User,Post, Comment } = require('../../models');

//creates new user

router.post("/",withAuth, async (req,res) => {
    console.log('checking',req.body)
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