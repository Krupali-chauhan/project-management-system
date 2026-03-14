import bcrypt from "bcryptjs";

const generateHash = async () => {
  const hash = await bcrypt.hash("admin123", 10);
  console.log("Hashed Password:");
  console.log(hash);
};

generateHash();