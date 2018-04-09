var url = '/saas20/api/2017063002/Apartment/free/largescreenview/energy/consumption';


const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(data) {
    return {
        type: RECEIVE_POSTS,
        posts: data,
        receivedAt: Date.now()
    }
}

let requestData = () => dispatch => {
    fetch(url, {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => dispatch(receivePosts(json)));
}

export default requestData;
