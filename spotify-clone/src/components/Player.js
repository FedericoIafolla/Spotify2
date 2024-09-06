import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../redux/actions'; // Assicurati di importare toggleLike
import './styles/player.css';

import shuffleImg from '../assets/playerbuttons/shuffle.png';
import prevImg from '../assets/playerbuttons/prev.png';
import playImg from '../assets/playerbuttons/play.png';
import nextImg from '../assets/playerbuttons/next.png';
import repeatImg from '../assets/playerbuttons/repeat.png';
import likeSvg from '../assets/playerbuttons/like.svg'; // Importa l'icona SVG
import dislikeSvg from '../assets/playerbuttons/dislike.svg';

const Player = () => {
    const dispatch = useDispatch();
    const currentSong = useSelector(state => state.song.currentSong);
    const likedSongs = useSelector(state => state.song.likedSongs);

    const [liked, setLiked] = React.useState(false);

    React.useEffect(() => {
        if (currentSong) {
            setLiked(likedSongs.includes(currentSong.id));
        }
    }, [currentSong, likedSongs]);

    const handleLikeClick = () => {
        if (currentSong) {
            dispatch(toggleLike(currentSong.id));
            setLiked(!liked); // Cambia lo stato dell'icona
        }
    };

    return (
        <div className="container-fluid fixed-bottom bg-container pt-1">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 song-details-container">
                    {currentSong && (
                        <p className="song-details">
                            {currentSong.artist.name} - {currentSong.title}
                        </p>
                    )}
                </div>

                <div className="col-12 playerControls">
                    <img
                        src={liked ? dislikeSvg : likeSvg}
                        alt="like"
                        className="like-icon"
                        onClick={handleLikeClick}
                    /> {/* Icona SVG */}
                    <div className="d-flex justify-content-center align-items-center">
                        <a href="#">
                            <img src={shuffleImg} alt="shuffle" />
                        </a>
                        <a href="#">
                            <img src={prevImg} alt="prev" />
                        </a>
                        <a href="#">
                            <img src={playImg} alt="play" />
                        </a>
                        <a href="#">
                            <img src={nextImg} alt="next" />
                        </a>
                        <a href="#">
                            <img src={repeatImg} alt="repeat" />
                        </a>
                    </div>
                    <div className="progress mt-3">
                        <div role="progressbar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;