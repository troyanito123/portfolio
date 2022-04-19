const { User } = require("../database/models/index");

const createDefaultUser = async () => {
  const user = await User.findOne({
    where: { email: process.env.DEFAULT_USER_EMAIL },
  });

  if (!user) {
    await User.create({
      name: process.env.DEFAULT_USER_NAME,
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PASSWORD,
    });
  }
};

module.exports = { createDefaultUser };
