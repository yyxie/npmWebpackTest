import React from 'react';
import {Link} from 'react-router-dom';
import TestAction from "../actions/aAction/test.jsx";
import TestStore from "../stores/aStore/test.jsx";
import {Button, Table} from 'antd'

const {Column} = Table;

class Acomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            currentPage: 1,
            sizePerPage: 10,
            totalCount: 0
        }
    }

    componentDidMount() {
        this.existed = true;
        TestStore.listen(this._onChange.bind(this));
        TestAction.getList();
    }

    onSearchClick() {
        TestAction.getList();
    }

    componentWillUnmount() {
        this.existed = false;
    }

    _onChange() {
        if (this.existed) {
            // 重新获取TodoStore的数据，并通过调用setState，触发re-render
            this.setState({list: TestStore.getInfoState()});
        }
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onSearchClick.bind(this)}>查 询</Button>
                <Table dataSource={this.state.list}>

                    <Column
                        title="sumNumber"
                        dataIndex="sumNumber"
                        key="sumNumber"
                    />
                    <Column
                        title="type"
                        dataIndex="type"
                        key="type"
                    />
                    <Column
                        title="date"
                        dataIndex="date"
                        key="date"
                    />

                </Table>
            </div>
        )
    }
}

export default Acomponent;