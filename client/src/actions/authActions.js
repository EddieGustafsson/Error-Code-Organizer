import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";
import API from '../api/apiMap';

// Validate token and load ther user.
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING});

    axios.get(API.user, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Register user
export const register = (user) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post(API.register, user, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        });

}

// Logout user

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

// Setup config/headers end token
export const tokenConfig = getState => {
        // Get token from localstorage
        const token = getState().auth.token;

        // Set headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
        // If token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}