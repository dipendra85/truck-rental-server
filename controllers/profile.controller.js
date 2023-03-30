const { User } = require("./../models/");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {
    const data = await User.findByPk(req.user.id);
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, address, phone } = req.body;
  if (!name.trim() || !address.trim() || !phone.trim()) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const user = await User.findByPk(req.user.id);

    const data = await User.update(
      {
        name,
        address,
        phone,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
exports.updatePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || newPassword.trim().length <= 0)
    return res.status(400).send({ err: "Password cannot be empty" });

  // Check if the new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).send({ err: "Passwords do not match" });
  }

  //   if (newPassword.length <= 5)
  //     return res.status(400).send({ err: "Password too short" });

  try {
    // Find the user by id
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).send({ err: "User not found" });

    const password = bcrypt.hashSync(newPassword, 10);
    // Update the user's password
    await user.update({
      password,
    });

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
};
