const { User } = require("./../../models/index");

exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id);
    if (!data) return res.status(404).send({ err: "User not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ err: "User not found" });
    } else {
      await User.destroy({
        where: {
          id,
        },
      });
      return res.status(200).send({ data: "User deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
