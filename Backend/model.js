
const mongoose = require('mongoose');

// Define the schema
const schema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img_url: { type: String, required: true }
}, { collection: 'user' }); // Specify the collection name

// Create the model
const BlogModel = mongoose.model('Blog', schema);

module.exports = BlogModel;
