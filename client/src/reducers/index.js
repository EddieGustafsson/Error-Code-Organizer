import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    project: projectReducer,
    projects: projectsReducer,
    error: errorReducer,
    auth: authReducer
});