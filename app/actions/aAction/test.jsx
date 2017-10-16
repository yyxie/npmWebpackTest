import Reflux from 'reflux';

const TestAction = Reflux.createActions({
    'getList': {children: ['completed', 'failed']}

});

TestAction.getList.listen(function (data) {
    var url = '/saas20/api/2017063002/Apartment/free/largescreenview/energy/consumption';
    common.ajax(url, data, 'POST', 'json', true, this.completed, this.failed);
});



export default TestAction;
