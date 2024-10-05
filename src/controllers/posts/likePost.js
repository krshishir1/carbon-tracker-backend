const Post = require("../../models/posts");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const bodySchema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string().required(),
    });

    const { error } = bodySchema.validate(req.body);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { postId, userId } = req.body;
    const reqPost = await Post.findById(postId);

    if (!reqPost) throw new Error("Post not found");
    const isLiked = reqPost.likes.includes(userId);

    if (isLiked) throw new Error("Post already liked");

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });

    res.status(201).json({ message: `${userId} liked ${postId}` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
