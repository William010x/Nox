import { GET_COURSES, ADD_COURSE, COURSES_LOADING } from '../actions/types'

const initialState = {
    courses: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                sessions: action.payload,
                loading: false
            };
        case ADD_COURSE:
            return {
                ...state,
                sessions: [action.payload, ...state.courses]
            };
        case COURSES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}