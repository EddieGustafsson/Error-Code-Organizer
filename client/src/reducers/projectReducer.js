import { 
    GET_PROJECTS, 
    GET_PROJECT, 
    CREATE_PROJECT, 
    UPDATE_PROJECT, 
    ARCHIVE_PROJECT, 
    EXPORT_PROJECT, 
    DELETE_PROJECT,
    PROJECT_LOADING
} from '../actions/types';

const initialState = {
    response: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case CREATE_PROJECT:
            return {
                ...state,
                response: action.payload
            }
        case DELETE_PROJECT:
            return  {
                ...state,
                response: action.payload
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