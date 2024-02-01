const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Controller to handle user registration (signup).
 *
 * @param {Object} req - Express request object with user details in the body.
 *   - username: User's username
 *   - email: User's email
 *   - password: User's password
 * @param {Object} res - Express response object indicating successful registration or an error message.
 */
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //validations
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if user with the given email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashePassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashePassword,
    });

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Controller to handle user login.
 *
 * @param {Object} req - Express request object with user email and password in the body.
 *   - email: User's email
 *   - password: User's password
 * @param {Object} res - Express response object indicating successful login or an error message.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not exist" });
    }

    const matchPass = await bcrypt.compare(password, existingUser.password);
    if (!matchPass) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .cookie("token", token, { maxAge: 900000, httpOnly: true })
      .json({ message: "User logged in successfully!", user: existingUser }); //don't send token from here
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Controller to handle user logout by clearing the authentication token cookie.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object indicating successful logout.
 */
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully!" });
};

module.exports = { signUp, login, logout };
