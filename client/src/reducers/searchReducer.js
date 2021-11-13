import {
    CLEAN_QUERY,
    START_SEARCH,
    INISH_SEARCH,
    UPDATE_SELECTION
} from '../actions/types';

const initialState = {
    loading: false,
    results: [],
    value: '',
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAN_QUERY:
            return initialState
        case START_SEARCH:
            return { ...state, loading: true, value: action.query }
        case INISH_SEARCH:
            return { ...state, loading: false, results: action.results }
        case UPDATE_SELECTION:
            return { ...state, value: action.selection }
        default:
            throw new Error()
    }
}