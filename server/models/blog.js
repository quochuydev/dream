const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, default: null },
  body: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = { BlogModel };
