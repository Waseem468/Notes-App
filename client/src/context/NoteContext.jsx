import React, { createContext, useContext, useState } from 'react';

export const NoteContext = createContext();

export const useNoteContext = () => {
    return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
  
    return (
      <NoteContext.Provider value={{ selectedNote, setSelectedNote }}>
        {children}
      </NoteContext.Provider>
    );
  };
