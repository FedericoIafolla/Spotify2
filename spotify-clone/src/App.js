import React from 'react';
import NavbarAside from './components/NavbarAside';
import MusicSectionMain from './components/MusicSection';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavbarAside />
        <MusicSectionMain />
      </div>
      {/* Aggiungi il player in fondo alla pagina */}
      <Player />
    </div>
  );
}

export default App;
