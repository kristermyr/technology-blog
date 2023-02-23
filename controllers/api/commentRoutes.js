const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post("/", withAuth, async (req, res) => {
    try {
      const comment = await Comment.create({
        post_id: req.body.post_id,
        comment_content: req.body.commentContent,
        user_id: req.session.user_id,
      });
      if (!comment) {
        res.status(404).json({ message: "No Comment Found" });
        return;
      }
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;