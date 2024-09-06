// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import songReducer from './reducers';

const rootReducer = combineReducers({
    song: songReducer
});

const store = createStore(rootReducer);

export default store;