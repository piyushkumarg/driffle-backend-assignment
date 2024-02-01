const express = require("express");
const {
  getNote,
  createNote,
  updateNote,
  deleteNote,
  searchNote,
  updateStatus,
} = require("../controllers/noteControllers");
const authenticateUser = require("../middleware/authenticate");


const router = express.Router();

router.get("/note", authenticateUser, getNote);
router.get("/note/search/:query", authenticateUser, searchNote);
router.post("/note", authenticateUser, createNote);
router.put("/note/:id", authenticateUser, updateNote);
router.delete("/note/:id", authenticateUser, deleteNote);
router.put("/note/update-status/:id", authenticateUser, updateStatus);

module.exports = router;
