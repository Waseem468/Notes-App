import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import UserRegister from "./components/user/UserRegister";
// import NoteForm from "./components/NoteForm";
import { NoteProvider } from "./context/NoteContext"; 


function App() {
  return (
    <div className="App">
      <Router>
      <NoteProvider> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route path='/register' element={<UserRegister />} />
          </Routes>
        </NoteProvider>
      </Router>
    </div>
  );
}

export default App;
