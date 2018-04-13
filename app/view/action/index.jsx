var url = '/saas20/api/2017063002/Apartment/free/largescreenview/energy/consumption';
let requestData = (dispatch) => {
    fetch(url, {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => dispatch({type: 'FETCH_POSTS', data: json}));
}
export default requestData;