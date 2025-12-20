const Post = require("../../models/posts");
const Joi = require("joi");
const { uploadToS3 } = require("../../utils/s3Config");

module.exports = async (req, res) => {
  try {
    // If sent as multipart, req.body might need parsing for JSON parts
    if (typeof req.body.author === 'string') {
      req.body.author = JSON.parse(req.body.author);
    }

    const bodySchema = Joi.object({
      author: Joi.object({
        name: Joi.string().allow(''),
        username: Joi.string().allow(''),
        avatarUrl: Joi.string().allow('')
      }),
      content: Joi.string().required(),
      impactTag: Joi.string().valid("Air", "Water", "Plastic", "Climate").required()
    })

    const { error } = bodySchema.validate(req.body);
    const isValid = error === undefined || null;
    if (!isValid) throw new Error(error.message);

    const { author, content, impactTag } = req.body;
    let imageUrl = null;
    let videoUrl = null;

    if (req.file) {
      const url = await uploadToS3(req.file);
      if (req.file.mimetype.startsWith('video/')) {
        videoUrl = url;
      } else {
        imageUrl = url;
      }
    }

    const newPost = new Post({
      author,
      content,
      impactTag,
      imageUrl,
      videoUrl,
      orderId: 0
    })

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
