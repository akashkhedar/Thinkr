const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");

const { body, validationResult } = require("express-validator");

router.get("/show", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/upload",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Enter atleast 3 characters"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Enter atleast 5 characters"),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal Server Error uploading");
    }
  }
);

router.put("/update/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ sucess: "Note deleted" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
