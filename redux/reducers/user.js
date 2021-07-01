import { USER_POSTS_STATE_CHANG, USER_STATE_CHANG } from '../constants';

const initialState = {
    currentUser: null,
    posts: [],
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
        default:
            return state;
    }
};
