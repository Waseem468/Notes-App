require('dotenv').config();
const noteModel = require('../model/noteSchema');


// Create a note
const createNote=async(req,res)=>{
    try {
        const { title, description,userId } = req.body;
        // const userId = req.user.userId; // Get the user ID from the token
    
        const newNote = new noteModel({ title, description, userId });
        await newNote.save();
    
        res.status(201).json(newNote);
      } catch (error) {
        console.error('Create note error:', error);
        res.status(500).json({ error: 'Create note failed' });
      }
}


// Get all notes of the authenticated user

const getNotes = async (req, res) => {
    try {
      const userId = req.params.id;
      const notes = await noteModel.find({ userId });
      res.json(notes);
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ error: 'Get notes failed' });
    }
  };


// Update a note (checking ownership)

const updateNote=async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        // const userId = req.user.userId; 
    
        const note = await noteModel.findById(id);
    
        if (!note) {
          return res.status(404).json({ error: 'Note not found' });
        }
    
        // if (note.userId !== userId) {
        //   return res.status(403).json({ error: 'Unauthorized: You can only update your own notes' });
        // }
    
        const updatedNote = await noteModel.findByIdAndUpdate(id, { title, description }, { new: true });
        res.json(updatedNote);
      } catch (error) {
        console.error('Update note error:', error);
        res.status(500).json({ error: 'Update note failed' });
      }
}


// Delete a note (checking ownership)

const deleteNote=async(req,res)=>{
    try {
        const { id } = req.params;
        // const userId = req.user.userId; // Get the user ID from the token
    
        const note = await noteModel.findById(id);
    
        if (!note) {
          return res.status(404).json({ error: 'Note not found' });
        }
    
        // if (note.userId !== userId) {
        //   return res.status(403).json({ error: 'Unauthorized: You can only delete your own notes' });
        // }
    
        const deletedNote = await noteModel.findByIdAndRemove(id);
        res.status(200).json({ message: 'Note deleted successfully' });      }
       catch (error) {
        console.error('Delete note error:', error);
        res.status(500).json({ error: 'Delete note failed' });
      }
}

module.exports = { createNote, getNotes,updateNote,deleteNote }



