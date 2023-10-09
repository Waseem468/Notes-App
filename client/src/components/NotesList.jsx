
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/noteList.css';
import { useNoteContext } from '../context/NoteContext';

function NotesList() {
    const { selectedNote, setSelectedNote } = useNoteContext();
    const [notes, setNotes] = useState([]);
    const userId = localStorage.getItem("User-Id");

    useEffect(() => {
        // Fetch user's notes from the backend
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`https://note-app-5o9g.onrender.com/api/notes/${userId}`);
                setNotes(response.data);
            } catch (error) {
                console.error('Fetching notes error:', error);
            }
        };

        if (userId) {
            fetchNotes();
        }
    }, [userId]);

    const handleEditClick = (note) => {
        setSelectedNote(note);
    };

    const handleDeleteClick = async (id) => {
        try {
            const response=await axios.delete(`https://note-app-5o9g.onrender.com/api/notes/${id}`);
            if (response.status === 200) {
                alert('Note deleted successfully!');
            }

        } catch (error) {
            console.error('Deleting note error:', error);
        }
    };

    return (
        <div>
            <h2>My Notes:</h2>
            <div className='notelist'>
                {notes.map((note) => (
                    <div className='formlist' key={note._id}>
                        <div>
                            <strong className='front-section'>{note.title}</strong>
                            <p className='front-section'>{note.description}</p>
                        </div>
                        <div>
                            <button
                                className='listButton'
                                onClick={() => handleEditClick(note)}
                            >
                                Edit Note
                            </button>
                            <button
                                className='listButton'
                                onClick={() => handleDeleteClick(note._id)}
                            >
                                Delete Note
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotesList;

