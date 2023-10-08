const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const noteModel = require('../model/noteSchema');



// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Create a note
const createNote=async(req,res)
app.post('/api/notes', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId; // Get the user ID from the token

    const newNote = new Note({ title, content, userId });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Create note failed' });
  }
});

// Get all notes of the authenticated user
app.get('/api/notes', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the token
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Get notes failed' });
  }
});

// Update a note (checking ownership)
app.put('/api/notes/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.userId; // Get the user ID from the token

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own notes' });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Update note failed' });
  }
});

// Delete a note (checking ownership)
app.delete('/api/notes/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Get the user ID from the token

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own notes' });
    }

    const deletedNote = await Note.findByIdAndRemove(id);
    res.json(deletedNote);
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Delete note failed' });
  }
});


