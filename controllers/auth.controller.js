const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).send({ err: "Invalid credentials" });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).send({ err: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "168h",
    });
    const data = {
      token,
    };
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.signup = async (req, res) => {
  const { name, address, phone, email, password } = req.body;
  if (!name.trim() || !address.trim() || !phone.trim() || !email.trim() || !password.trim()) {
    return res.status(400).send({ error: "All fields are required" });
  }
  
  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    // Check if phone number already exists
    const phoneExists = await User.findOne({ where: { phone: phone } });
    if (phoneExists) {
      return res.status(400).send({ error: "Phone number already exists" });
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).send({ error: "Invalid phone number" });
    }

    // Create a new user
    const user = await User.create({
      name,
      address,
      phone,
      email,
      password,
    });

    // Return user details
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
};
