import { SELECT_SONG, TOGGLE_LIKE, ADD_SONG, SET_SEARCH_RESULTS, CREATE_PLAYLIST, ADD_SONG_TO_PLAYLIST } from './actions';

const initialState = {
    currentSong: null,
    likedSongs: [],
    allSongs: [],
    searchResults: [],
    playlists: {}
};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SONG:
            return {
                ...state,
                currentSong: action.payload
            };
        case TOGGLE_LIKE:
            const isLiked = state.likedSongs.includes(action.payload);
            return {
                ...state,
                likedSongs: isLiked
                    ? state.likedSongs.filter(id => id !== action.payload)
                    : [...state.likedSongs, action.payload]
            };
        case ADD_SONG:
            return {
                ...state,
                allSongs: [...state.allSongs, action.payload]
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case CREATE_PLAYLIST:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    [action.payload]: []
                }
            };
        case ADD_SONG_TO_PLAYLIST:
            const { playlistName, song } = action.payload;
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    [playlistName]: [...(state.playlists[playlistName] || []), song]
                }
            };
        default:
            return state;
    }
};

export default songReducer;
