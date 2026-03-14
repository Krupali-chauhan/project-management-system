import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// 🔹 REGISTER


export const signup = async (req, res) => {
  try {
    const { name, email, phoneno, password, confirmPassword } = req.body;

    if (!name || !email || !phoneno || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phoneno,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
  console.log(error);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: error.message });
}
};


// 🔹 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)   // optional but recommended
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};  