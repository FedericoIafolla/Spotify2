// src/redux/actions.js
export const SELECT_SONG = 'SELECT_SONG';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const ADD_SONG = 'ADD_SONG';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'; // Aggiungi questa azione
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST'; // Aggiungi questa azione
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'; // Aggiungi questa azione

// Azione per selezionare una canzone
export const selectSong = (song) => ({
    type: SELECT_SONG,
    payload: song
});

// Azione per mettere o togliere "Mi piace"
export const toggleLike = (songId) => ({
    type: TOGGLE_LIKE,
    payload: songId
});

// Azione per aggiungere una canzone
export const addSong = (song) => ({
    type: ADD_SONG,
    payload: song
});

// Azione per salvare i risultati di ricerca
export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results
});

// Azione per creare una nuova playlist
export const createPlaylist = (playlistName) => ({
    type: CREATE_PLAYLIST,
    payload: playlistName
});

// Azione per aggiungere una canzone a una playlist
export const addSongToPlaylist = (playlistName, song) => ({
    type: ADD_SONG_TO_PLAYLIST,
    payload: { playlistName, song }
});
