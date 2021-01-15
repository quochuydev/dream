const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  username: { type: String, default: null },
  password: { type: String, default: null },
  salt: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
