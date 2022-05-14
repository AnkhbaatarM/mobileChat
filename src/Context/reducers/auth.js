import { AUTHENTICATE_USER } from 'context_constants/auth';

const initialAuth = {
    auth: false,
};

const reducerAuth = (state, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return action.list;
        default:
            return state;
    }
};

export default [reducerAuth, initialAuth];
