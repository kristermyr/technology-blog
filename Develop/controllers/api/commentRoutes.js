const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');


router.post("/",withAuth, async (req,res) => {
    Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.post_id,
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
router.get('/', (req,res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
    });
        

module.exports = router;