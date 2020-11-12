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
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProjects = ()  => (dispatch, getState) => {
    dispatch(setProjectLoading());
    axios
        .get(API.project, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }))
        .catch(error => 
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const getProject = (id) => (dispatch, getState) => {
    dispatch(setProjectLoading());
    axios
        .get(API.project + id, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_PROJECT,
            payload: res.data
        }))
        .catch(error => 
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const createProject = (project) => (dispatch, getState) => {
    axios
        .post(API.project, project, tokenConfig(getState))
        .then(res => dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        }))
        .catch(error => 
            dispatch(returnErrors(error.response.data, error.response.status))
        );
    dispatch(getProjects());
}

export const updateProject = (id, project) => (dispatch, getState) => {
    axios
        .patch(API.project + id, project, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        }))
        .catch(error => 
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const archiveProject = (id) => (dispatch, getState) => {
    return {
        type: ARCHIVE_PROJECT,
        payload: id
    }
}

export const exportProject = (id) => (dispatch, getState) => {
    return {
        type: EXPORT_PROJECT,
        payload: id
    }
}

export const deleteProject = (id) => (dispatch, getState) => {
    axios
        .delete(API.project + id, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        }))
        .catch(error => 
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const setProjectLoading = () => {
    return {
        type: PROJECT_LOADING
    }
}