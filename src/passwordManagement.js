const bcrypt = require("bcryptjs");

const hashPassword = async function (password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};


module.exports = {
    hashPassword,
    comparePassword
}
