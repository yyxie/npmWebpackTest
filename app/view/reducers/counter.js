export function counter(state = {}, action) {
    switch (action.type) {
        case "RECEIVE_POSTS":
            return action.posts
        default:
            return state
    }
}