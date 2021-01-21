const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagSchema = new Schema({
  name: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

const TagModel = mongoose.model("Tag", TagSchema);

module.exports = { TagModel };
