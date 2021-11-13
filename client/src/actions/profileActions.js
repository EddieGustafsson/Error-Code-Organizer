import axios from 'axios';
import API from '../api/apiMap';
import {
    GET_PROFILE,
    PROFILE_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProfile= (username) => (dispatch, getState) => {
    dispatch(setProfileLoading());
    axios
        .get(API.user + username, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(error =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}