import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, selectSong } from '../redux/actions';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'; // Importa le icone
import './styles/MusicSection.css';

const MusicSection = () => {
    const [rockSongs, setRockSongs] = useState([]);
    const [popSongs, setPopSongs] = useState([]);
    const [hipHopSongs, setHipHopSongs] = useState([]);
    const [playingSongId, setPlayingSongId] = useState(null); // Stato per la canzone in riproduzione

    const dispatch = useDispatch();
    const likedSongs = useSelector(state => state.song.likedSongs);
    const currentSong = useSelector(state => state.song.currentSong);

    const fetchSongsByArtist = async (artist, setSongs) => {
        try {
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`);
            if (response.ok) {
                let { data } = await response.json();
                setSongs(data.slice(0, 4));
            } else {
                throw new Error('Error in fetching songs');
            }
        } catch (err) {
            console.log('error', err);
        }
    };

    useEffect(() => {
        fetchSongsByArtist('Queen', setRockSongs);
        fetchSongsByArtist('Katy Perry', setPopSongs);
        fetchSongsByArtist('Eminem', setHipHopSongs);
    }, []);

    useEffect(() => {
        if (playingSongId && currentSong && playingSongId !== currentSong.id) {
            dispatch(selectSong(rockSongs.find(song => song.id === playingSongId) ||
                popSongs.find(song => song.id === playingSongId) ||
                hipHopSongs.find(song => song.id === playingSongId)));
        }
    }, [playingSongId, currentSong, rockSongs, popSongs, hipHopSongs, dispatch]);

    const isLiked = (songId) => likedSongs.includes(songId);

    const handleLike = (songId) => {
        dispatch(toggleLike(songId));
    };

    const handlePlayPause = (song) => {
        if (playingSongId === song.id) {
            setPlayingSongId(null); // Se la canzone è già in riproduzione, mettila in pausa
        } else {
            setPlayingSongId(song.id); // Altrimenti, riproduci la nuova canzone
            dispatch(selectSong(song)); // Imposta la canzone nel Redux store
        }
    };

    const renderSongs = (songs) => (
        <div className="album-container">
            {songs.map((song) => (
                <div key={song.id} className="album-item">
                    <img src={song.album.cover_medium} alt="album cover" />
                    <p>{song.title}</p>
                    <p>{song.artist.name}</p>
                    <button
                        onClick={() => handlePlayPause(song)}
                        className="icon-button"
                    >
                        {playingSongId === song.id ? (
                            <FaPauseCircle size={36} />
                        ) : (
                            <FaPlayCircle size={36} />
                        )}
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="main-section">
            <div className="mainLinks">
                <a href="#">TRENDING</a>
                <a href="#">PODCAST</a>
                <a href="#">MOODS AND GENRES</a>
                <a href="#">NEW RELEASES</a>
                <a href="#">DISCOVER</a>
            </div>

            <div id="rockSection" className="section">
                <h2>Rock Classics</h2>
                {renderSongs(rockSongs)}
            </div>

            <div id="popSection" className="section">
                <h2>Pop Culture</h2>
                {renderSongs(popSongs)}
            </div>

            <div id="hipHopSection" className="section">
                <h2>#HipHop</h2>
                {renderSongs(hipHopSongs)}
            </div>
        </div>
    );
};

export default MusicSection;
