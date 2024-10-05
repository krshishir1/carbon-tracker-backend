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
        imageUrl: Joi.string()
    })

    const { error } = bodySchema.validate(req.body);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);


    const { author, content, imageUrl } = req.body;

    const newPost = new Post({
        author,
        content,
        imageUrl,
        orderId: 0
    })

    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
