import { combineReducers } from 'redux';
let defReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
let asyncReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            debugger;
            return action.data
        case 'DECREMENT':
            return state
        default:
            return state
    }

}
export default combineReducers({
    defReducer,
    asyncReducer
})