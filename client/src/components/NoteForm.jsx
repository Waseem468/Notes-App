import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/noteForm.css';
import { useNoteContext } from '../context/NoteContext';

const NoteForm = () => {
    const { selectedNote, setSelectedNote } = useNoteContext();

    const [formData, setFormData] = useState({
        title: selectedNote ? selectedNote.title : '',
        description: selectedNote ? selectedNote.description : '',
        userId: selectedNote ? selectedNote.userId : ''
    });

    useEffect(() => {
        if (selectedNote) {
            setFormData({
                title: selectedNote.title,
                description: selectedNote.description,
                userId: selectedNote.userId,
            });
        }
    }, [selectedNote]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem("User-token");
        const userId = localStorage.getItem("User-Id");

        try {
            if (selectedNote) {
                // If selectedNote exists, it means we are updating an existing note
                const response = await axios.put(
                    `http://localhost:5000/api/notes/${selectedNote._id}`,
                    { ...formData, userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    alert('Note updated successfully!');
                }
            } else {
                // If selectedNote doesn't exist, it means we are creating a new note
                const response = await axios.post(
                    'http://localhost:5000/api/notes',
                    { ...formData, userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 201) {
                    alert('Note created successfully!');
                }
            }

            // Clear the form data and the selectedNote after submission
            setFormData({
                title: '',
                description: '',
                userId: '',
            });
            setSelectedNote(null);
        } catch (error) {
            console.error('Note submission error:', error);
            alert('Note submission failed.');
        }
    };

    return (
        <div className='main-container'>
            <h2 style={{ color: "red", margin: "30px" }}>
                WELCOME TO OUR NOTES APP ENTER YOUR NOTES CREDENTIALS BELOW
            </h2>
            <form className="notes" onSubmit={handleSubmit}>
                <div>
                    <input
                        className='note-title'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder='Enter Note Title'
                    />
                </div>
                <div>
                    <textarea
                        className='note-desc'
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        cols="30"
                        rows="10"
                        placeholder='Desription'
                    ></textarea>
                </div>
                <button className='note-btn' type='submit'>
                    {selectedNote ? 'Update Note' : 'Add Note'}
                </button>
            </form>
        </div>
    );
};

export default NoteForm;
