import Reflux from 'reflux';
import RefluxPromise from 'reflux-promise';
Reflux.use(RefluxPromise(window.Promise));

const TestAction = Reflux.createActions({
    getList: {asyncResult: true}

});

TestAction.getList.listen(function (data) {
    debugger;
    var url = '/saas20/api/2017063002/Apartment/free/largescreenview/energy/consumption';
    common.ajaxPromise(url, data, 'POST', 'json', true)
        .then(this.completed).fail(this.failed);
});


export default TestAction;
