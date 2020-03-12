import {combineReducers} from 'redux';
import sessionReducer from './sessionReducer.js';
import courseReducer from './courseReducer.js';

export default combineReducers({
    session: sessionReducer,
    course: courseReducer
});
