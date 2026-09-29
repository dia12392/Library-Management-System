const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library Book Management System API is running");
});
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  publicationYear: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, isbn, category, publicationYear } = req.body;

    if (!title || !author || !isbn || !category || !publicationYear) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const book = new Book({
      title,
      author,
      isbn,
      category,
      publicationYear
    });

    const savedBook = await book.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add book",
      error: error.message
    });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(5001, () => {
  console.log("Server running on port 5001");
});