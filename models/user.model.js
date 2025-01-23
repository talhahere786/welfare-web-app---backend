import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a case-insensitive index for the email field
UserSchema.index({ email: 1 }, { collation: { locale: "en", strength: 2 } });

export const User = mongoose.model("User", UserSchema);
