const mongoose = require("mongoose");
const validator = require("validator");

const { hashPassword } = require("../passwordManagement");

const historySchema = new mongoose.Schema({
  dateOfTrack: {
    type: Date,
    required: true,
  },
  totalEmissions: {
    type: Number
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email is invalid",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  activities: {
    type: [historySchema],
    default: []
  },
  treesPlanted: {
    type: Number,
    default: 0
  },
  dailyTreesPlanted: {
    count: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  totalDonated: {
    type: Number,
    default: 0
  },
  helpfulComments: {
    type: Number,
    default: 0
  },
  impactScore: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

userSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  if (hashedPassword) {
    this.password = hashedPassword;
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
