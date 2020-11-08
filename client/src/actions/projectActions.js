import axios from 'axios';
import API from '../api/apiMap';
import { 
    GET_PROJECTS, 
    GET_PROJECT, 
    CREATE_PROJECT, 
    UPDATE_PROJECT, 
    ARCHIVE_PROJECT, 
    EXPORT_PROJECT, 
    DELETE_PROJECT,
    PROJECT_LOADING
} from './types';

export const getProjects = ()  => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get(API.project)
        .then(res => dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }));
}

export const getProject = (id) => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get(API.project + id)
        .then(res => dispatch({
            type: GET_PROJECT,
            payload: res.data
        }));
}

export const createProject = (project) => dispatch => {
    axios
        .post(API.project, project)
        .then(res => dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        }));
}

export const updateProject = (id, project) => dispatch => {
    axios
        .patch(API.project + id, project)
        .then(res => dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        }));
}

export const archiveProject = (id) => {
    return {
        type: ARCHIVE_PROJECT,
        payload: id
    }
}

export const exportProject = (id) => {
    return {
        type: EXPORT_PROJECT,
        payload: id
    }
}

export const deleteProject = (id) => dispatch => {
    axios
        .delete(API.project + id)
        .then(res => dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        }));
}

export const setProjectLoading = () => {
    return {
        type: PROJECT_LOADING
    }
}