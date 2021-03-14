import {
    GET_PROFILE,
    PROFILE_LOADING
} from '../actions/types';

const initialState = {
    user: [],
    errors: [],
    loading: false
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}