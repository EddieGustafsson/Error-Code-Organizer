import axios from 'axios';
import API from '../api/apiMap';
import {
    GET_PROJECTS,
    PROJECTS_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProjects = () => (dispatch, getState) => {
    dispatch(setProjectsLoading());
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

export const setProjectsLoading = () => {
    return {
        type: PROJECTS_LOADING
    }
}