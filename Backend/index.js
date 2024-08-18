const express = require('express');
const cors = require('cors');
const connectDB = require('./connection'); // Import the connection module
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Define Mongoose Schema and Model
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img_url: { type: String, required: true }
}, { collection: 'user' });

const BlogModel = mongoose.model('Blog', blogSchema);

// POST API to add a new blog post
app.post('/add', async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.send({ message: 'Blog post added successfully' });
  } catch (error) {
    console.error('Error adding blog post:', error);
    res.status(500).send({ message: 'Failed to add blog post', error: error.message });
  }
});

// GET API to fetch all blog posts
app.get('/get', async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).send({ message: 'Failed to fetch blog posts', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
