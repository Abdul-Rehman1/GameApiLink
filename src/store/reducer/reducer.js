import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: 'Abdul Rehman',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.USERNAME:
            return ({
                ...state,
                userName: action.payload
            })
        default:
            return state;
    }

}