// src/components/NavbarAside.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist, addSongToPlaylist } from '../redux/actions';
import './styles/navbarAside.css';
import logo from '../assets/logo.png';

function NavbarAside() {
    const [isLibraryOpen, setLibraryOpen] = useState(false);
    const [isFavoritesOpen, setFavoritesOpen] = useState(false);
    const dispatch = useDispatch();

    const allSongs = useSelector(state => state.song.allSongs);
    const playlists = useSelector(state => state.song.playlists);

    const dislikedSongs = allSongs.filter(song => !song.liked);
    const likedSongs = allSongs.filter(song => song.liked);

    useEffect(() => {
        if (!playlists['Disliked Songs']) {
            dispatch(createPlaylist('Disliked Songs'));
        }

        if (!playlists['Your Favorites']) {
            dispatch(createPlaylist('Your Favorites'));
        }

        dislikedSongs.forEach(song => {
            if (playlists['Disliked Songs']) {
                dispatch(addSongToPlaylist('Disliked Songs', song));
            }
        });

        likedSongs.forEach(song => {
            if (playlists['Your Favorites']) {
                dispatch(addSongToPlaylist('Your Favorites', song));
            }
        });
    }, [dispatch, dislikedSongs, likedSongs, playlists]);

    const handleLibraryToggle = () => {
        setLibraryOpen(!isLibraryOpen);
    };

    const handleFavoritesToggle = () => {
        setFavoritesOpen(!isFavoritesOpen);
    };

    return (
        <aside className="col col-2">
            <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
                <div className="container flex-column align-items-start">
                    <a className="navbar-brand" href="index.html">
                        <img src={logo} alt="Spotify Logo" width="131" height="40" />
                    </a>
                    <div className="input-group mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary btn-sm h-100"
                            >
                                GO
                            </button>
                        </div>
                    </div>
                    <button
                        className="navbar-toggler mt-3"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <ul>
                                <li>
                                    <a
                                        className="nav-item nav-link d-flex align-items-center"
                                        href="#"
                                    >
                                        <i className="bi bi-house-door-fill"></i>&nbsp; Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="nav-item nav-link d-flex align-items-center"
                                        href="#"
                                        onClick={handleLibraryToggle}
                                    >
                                        <i className="bi bi-book-fill"></i>&nbsp; Your Library
                                    </a>
                                    {isLibraryOpen && (
                                        <ul className="disliked-songs-list">
                                            {dislikedSongs.map(song => (
                                                <li key={song.id}>
                                                    {song.title} - {song.artist.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <a
                                        className="nav-item nav-link d-flex align-items-center"
                                        href="#"
                                        onClick={handleFavoritesToggle}
                                    >
                                        <i className="bi bi-star-fill"></i>&nbsp; Your Favorites
                                    </a>
                                    {isFavoritesOpen && (
                                        <ul className="favorites-songs-list">
                                            {likedSongs.map(song => (
                                                <li key={song.id}>
                                                    {song.title} - {song.artist.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nav-btn">
                    <button className="btn signup-btn" type="button">Sign Up</button>
                    <button className="btn login-btn" type="button">Login</button>
                    <div className="links-container">
                        <a href="#">Cookie</a> | <a href="#">Policy</a> | <a href="#">Privacy</a>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default NavbarAside;
