import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
       trim: true
    },
    phoneno: {  // ← yeh field name backend me phoneno hai
      type: String,
      trim: true,
    },
    department: String,
    company: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["superAdmin", "projectManager", "developer", "client"],
      default: "client",
    },
    assignedPM: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

    isActive: {
      type: Boolean,
      default: true,
    },
    // ✅ NEW FIELD (Who created this user)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);



userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);