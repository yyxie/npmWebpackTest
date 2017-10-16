'use strict';

import Reflux from 'reflux';
import TestAction from '../../actions/bAction/test.jsx';

let testState = {
    data: []
};

let TestStore = Reflux.createStore({
    listenables: TestAction,
    getInfoState() {
        return testState.data;
    },
    onGetListCompleted(result){
        if (result.errorCode == 0 && result.data) {
            testState.data = result.data;
            this.trigger(testState.data);
        }
    },
    onGetListFailed(xhr) {
        testState.info.featureInfo = [];
        this.trigger(testState.data);
    }

});

export default TestStore;
