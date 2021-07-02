import {
    USER_FOLLOWING_STATE_CHANGE,
    USER_POSTS_STATE_CHANG,
    USER_STATE_CHANG,
} from '../constants';

const initialState = {
    currentUser: null,
    posts: [],
    following: [],
};
export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANG:
            return {
                ...state,
                currentUser: action.currentUser,
            };
        case USER_POSTS_STATE_CHANG:
            return {
                ...state,
                posts: action.posts,
            };
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following,
            };
        default:
            return state;
    }
};
