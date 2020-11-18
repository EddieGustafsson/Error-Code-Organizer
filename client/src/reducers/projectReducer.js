import {
    GET_PROJECT,
    CREATE_PROJECT,
    DELETE_PROJECT,
    PROJECT_LOADING
} from '../actions/types';

const initialState = {
    project: [],
    erros: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
                loading: false
            }
        case CREATE_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        case DELETE_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        case PROJECT_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}