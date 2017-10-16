import React from 'react';
import TestAction from "../actions/aAction/test.jsx";
import TestStore from "../stores/aStore/test.jsx";
import {Button, Table} from 'antd'

const {Column} = Table;

class Acomponent extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }



    componentWillUnmount() {
    }



    render() {
    debugger;
        const {id} = this.props.match.params;
        return (
            <div>
                {id}
            </div>
        )
    }
}

export default Acomponent;