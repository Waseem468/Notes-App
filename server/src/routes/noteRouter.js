const express = require('express');
const router = express.Router();
const { createNote, getNotes,updateNote,deleteNote }= require('../controller/noteController');
// const { authenticateUser } = require('../middleware/auth'); 

// Use the middleware to protect routes
router.get('/notes/:id', getNotes);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;
