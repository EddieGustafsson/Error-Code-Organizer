import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import projectReducer from './projectReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    project: projectReducer,
    projects: projectsReducer,
    profile: profileReducer,
    error: errorReducer,
    auth: authReducer
});