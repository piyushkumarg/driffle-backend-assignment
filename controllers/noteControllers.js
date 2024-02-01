const noteModel = require("../models/noteSchema");

/**
 * Controller to create a new note.
 *
 * @param {Object} req - Express request object with note details in the body.
 *   - title: Title of the note
 *   - content: Content/details of the note
 * @param {Object} res - Express response object indicating successful note creation or an error message.
 */
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newNote = new noteModel({
    title: title,
    content: content,
    userId: req.userId,
  });

  try {
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note Added successfully!", note: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

/**
 * Controller to update an existing note.
 *
 * @param {Object} req - Express request object with note ID in params and updated details in the body.
 *   - id: ID of the note to be updated
 *   - title: Updated title of the note
 *   - content: Updated content/details of the note
 * @param {Object} res - Express response object indicating successful note update or an error message.
 */
const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const newNote = {
    _id: id,
    title: title,
    content: content,
    userId: req.userId,
  };

  try {
    await noteModel.findByIdAndUpdate(id, newNote, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Note Updated successfully!", note: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

/**
 * Controller to delete a note.
 *
 * @param {Object} req - Express request object with note ID in params.
 *   - id: ID of the note to be deleted
 * @param {Object} res - Express response object indicating successful note deletion or an error message.
 */
const deleteNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await noteModel.findOneAndDelete({ _id: id });
    if (note) {
      res
        .status(200)
        .json({ message: "Note deleted successfully!", note: note });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Controller to get all notes for a user.
 *
 * @param {Object} req - Express request object with user ID.
 * @param {Object} res - Express response object indicating the list of user's notes or an error message.
 */
const getNote = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

/**
 * Controller to search for notes based on a query.
 *
 * @param {Object} req - Express request object with user ID and search query in params.
 *   - query: Search query to match against note titles
 * @param {Object} res - Express response object indicating the list of matching notes or an error message.
 */
const searchNote = async (req, res) => {
  const query = req.params.query;

  try {
    const notes = await noteModel.find({
      userId: req.userId,
      $or: [{ title: { $regex: query, $options: "i" } }],
    });

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Controller to update the status of a note.
 *
 * @param {Object} req - Express request object with note ID in params and status in the body.
 *   - id: ID of the note to be updated
 *   - status: Updated status of the note
 * @param {Object} res - Express response object indicating successful status update or an error message.
 */
const updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const note = await noteModel.findByIdAndUpdate(
      id,
      { status: status },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ message: "Status updated successfully", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
  searchNote,
  updateStatus,
};
