import axios from 'axios';
import API from '../api/apiMap';
import {
    GET_ERROR_CODE,
    CREATE_ERROR_CODE,
    UPDATE_ERROR_CODE,
    DELETE_ERROR_CODE,
    ERROR_CODE_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { getProject } from './projectActions';

export const getErrorCode = (id) => (dispatch, getState) => {
    dispatch(setErrorCodeLoading());
    axios
        .get(API.error_code + id, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ERROR_CODE,
            payload: res.data
        }))
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const createErrorCode = (error_code) => (dispatch, getState) => {
    axios
        .post(API.error_code, error_code, tokenConfig(getState))
        .then(res => dispatch({
            type: CREATE_ERROR_CODE,
            payload: res.data
        }))
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
    dispatch(getProject(error_code.project_id));
}

export const updateErrorCode = (id, error_code) => (dispatch, getState) => {
    axios
        .patch(API.error_code + id, error_code, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_ERROR_CODE,
            payload: res.data
        }))
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const deleteErrorCode= (id) => (dispatch, getState) => {
    axios
        .delete(API.error_code + id, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ERROR_CODE,
            payload: res.data
        }))
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const setErrorCodeLoading = () => {
    return {
        type: ERROR_CODE_LOADING
    }
}