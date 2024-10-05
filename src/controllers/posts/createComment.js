const Post = require("../../models/posts");
const Joi = require("joi");

module.exports = async (req, res) => {
  try {
    const bodySchema = Joi.object({
        author: Joi.object({
            name: Joi.string(),
            username: Joi.string(),
            avatarUrl: Joi.string()
        }),
        content: Joi.string().required(),
        rootPost: Joi.string().required(),
        parentPost: Joi.string(),
        orderId: Joi.number().required(),
    })

    const { error } = bodySchema.validate(req.body);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);


    const { author, content, rootPost, parentPost, orderId } = req.body;

    const newComment = new Post({
        author,
        content,
        rootPost,
        parentPost,
        orderId
    })

    await newComment.save();

    res.status(201).json({ message: "Comment created successfully" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
