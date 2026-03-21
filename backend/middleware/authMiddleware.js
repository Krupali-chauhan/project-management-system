// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")) {

//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();

//     } catch (error) {
//       res.status(401).json({ message: "Not authorized" });
//     }

//   } else {
//     res.status(401).json({ message: "No token" });
//   }
// };

// export { protect };
// middleware/authMiddleware.js  (ya jahan bhi yeh file hai)

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Header check
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token nikaalo
      token = req.headers.authorization.split(" ")[1];

      // Token verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Debug ke liye print (production mein comment kar dena)
      console.log("🔐 Token decoded successfully:", decoded);

      // User fetch karo (id se)
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User attached to req.user - ID type:", typeof req.user._id, "value:", req.user._id?.toString());

      if (!req.user) {
        console.log("User not found for ID:", decoded.id);
        return res.status(401).json({ message: "User not found - Not authorized" });
      }

      // Debug: user attach ho gaya ya nahi
      console.log("✅ req.user attached →", {
        id: req.user._id.toString(),
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      });

      next();  // sab theek → aage badho

    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    console.log("No authorization header or Bearer missing");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

export { protect };