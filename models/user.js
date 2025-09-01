const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: false },
    bio: { type: String },
    image: { type: String },
    password: { type: String, required: true, minlength: 6 },
    isDeleted: { type: Boolean, default: false }, 
    role: { type: String, enum: ['user', 'admin'], default: 'user' ,required:true}
  },
  {
    timestamps: true,
   
  }
);


module.exports = mongoose.model("User", userSchema);
