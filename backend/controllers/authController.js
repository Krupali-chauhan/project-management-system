import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// 🔹 REGISTER


// export const signup = async (req, res) => {
//   try {
//     const { name, email, phoneno, password, confirmPassword } = req.body;

//     if (!name || !email || !phoneno || !password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       phoneno,
//       password: hashedPassword
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Signup successful" });

//   } catch (error) {
//   console.log(error);   // 👈 VERY IMPORTANT
//   res.status(500).json({ message: error.message });
// }
// };

export const signup = async (req, res) => {
  try {
    console.log("Signup request body:", req.body); // ← yeh line daal, console me dekhna kya aa raha

    const { name, email, password, phoneno, company, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // pre-hook hash karega
      phoneno: phoneno ? phoneno.trim() : "",
      company: company ? company.trim() : "",
      city: city ? city.trim() : "",
      role: "client"
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful! Please login." });

  } catch (error) {
    console.error("=== SIGNUP CRASHED ===");
    console.error("Full error:", error);
    console.error("Error message:", error.message);
    if (error.name === "ValidationError") {
      console.error("Validation details:", error.errors);
    }

    res.status(500).json({ 
      message: "Server error during signup",
      error: error.message  // frontend me yeh dikhega
    });
  }
};


// 🔹 LOGIN
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password.trim(), user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)   // optional but recommended
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };  
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔍 DEBUG START
console.log("Entered Password:", password);
console.log("DB Password:", user.password);

const isMatch = await user.matchPassword(password.trim());
console.log("Password Match:", isMatch);
// 🔍 DEBUG END

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // token generate aur role return
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// export const changePassword = async (req, res) => {

//   const user = await User.findById(req.user.id);
//   console.log("Logged User:", req.user);
//     console.log("Found User:", user);

//   const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

//   if (!isMatch) {
//     return res.status(400).json({ message: "Current password incorrect" });
//   }

//   const salt = await bcrypt.genSalt(10);
//   user.password = req.body.newPassword;
// await user.save();

//   await user.save();

//   res.json({ message: "Password updated" });
// };

export const changePassword = async (req, res) => {
  try {

    console.log("USER:", req.user);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    // ✅ direct set karo (pre-save hash karega)
    user.password = req.body.newPassword;

    await user.save();

    res.json({ message: "Password updated" });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= PM FUNCTIONS =================

// ✅ 1. Assign Developer to PM
// export const assignDeveloperToPM = async (req, res) => {
//   try {
//     const { developerId } = req.body;

//     const dev = await User.findById(developerId);

//     if (!dev || dev.role !== "developer") {
//       return res.status(400).json({ message: "Invalid developer" });
//     }

//     // optional: already assigned check
//     if (dev.assignedPM) {
//       return res.status(400).json({ message: "Already assigned to another PM" });
//     }

//     dev.assignedPM = req.user._id;

//     await dev.save();

//     res.json({ message: "Developer assigned successfully", dev });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const assignDeveloperToPM = async (req, res) => {
  try {
    const { developerId } = req.body;

    const dev = await User.findById(developerId);

    if (!dev || dev.role !== "developer") {
      return res.status(400).json({ message: "Invalid developer" });
    }

    // 🔥 MAIN LINE (DATABASE SAVE)
    dev.assignedPM = req.user._id;

    await dev.save();   // ✅ aa line thi DB ma store thay chhe

    res.json({ message: "Developer assigned", dev });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ 2. Get ALL developers (admin created)
export const getAllDevelopers = async (req, res) => {
  try {
    const devs = await User.find({ role: "developer" });
    res.json(devs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ 3. Get ONLY my developers
export const getMyDevelopers = async (req, res) => {
  try {
    const devs = await User.find({
      role: "developer",
      assignedPM: req.user._id
    });

    res.json(devs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeDeveloperFromPM = async (req, res) => {
  try {

    const { developerId } = req.body;

    const dev = await User.findById(developerId);

    if (!dev) {
      return res.status(400).json({ message: "Developer not found" });
    }

    // ✅ MAIN LOGIC (null karna)
    dev.assignedPM = null;

    await dev.save();

    res.json({ message: "Developer removed" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};