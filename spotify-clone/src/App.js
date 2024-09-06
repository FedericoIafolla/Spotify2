import React from 'react';
import NavbarAside from './components/NavbarAside';
import MusicSectionMain from './components/MusicSection'; // Importa il nuovo componente
import Player from './components/Player'; // Importa il componente Player
import './App.css'; // Per il CSS personalizzato

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
