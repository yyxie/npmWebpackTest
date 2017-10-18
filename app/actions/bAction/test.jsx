import Reflux from 'reflux';
import RefluxPromise from 'reflux-promise';

Reflux.use(RefluxPromise(window.Promise));

const TestAction = Reflux.createActions({
    getList: {asyncResult: true, sync: false}

});

TestAction.getList.listen(function (data) {
    var url = '/saas20/api/2017063002/Apartment/free/largescreenview/energy/consumption';
    this.promise(common.ajaxPromise(url, data, 'POST', 'json', true));
});


export default TestAction;
