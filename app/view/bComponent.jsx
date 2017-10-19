import React from 'react';
import {Button, Table} from 'antd';

import TestAction from "../actions/bAction/test.jsx";
import HighComponent from './highComponent/index.jsx';

const {Column} = Table;
@HighComponent
class Bcomponent extends React.Component {
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
        this.getList();
    }

    componentWillUnmount() {
        this.existed = false;
    }

    onSearchClick() {
       this.getList();
    }
    getList() {
        const request = TestAction.getList();
        request.then(result => {
            if (this.existed) {
                if (result.errorCode == 0 && result.data) {

                    this.setState({list: result.data});
                } else
                    this.setState({list: result.data});
            }
        }).catch(err => {
            alert("warning");
        });
    }

    /* _onChange() {
     if (this.existed) {
     // 重新获取TodoStore的数据，并通过调用setState，触发re-render
     this.setState({list: TestStore.getInfoState()});
     }
     }*/

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

export default Bcomponent;