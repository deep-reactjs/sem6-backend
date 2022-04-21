import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: { type: Number, default: 2, required: true }, //customer: 3, business user: 2, admin: 1
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  expireToken: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
