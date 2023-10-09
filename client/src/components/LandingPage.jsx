import React from 'react';
import '../styles/landing.css';
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

const LandingPage = () => {
  return (
    <div className='main-container'>
      <div className='sub-container-a'>
        <NoteForm />
      </div>
      <div className='sub-container-b'>
        <NotesList />
      </div>
    </div>
  );
}

export default LandingPage;
