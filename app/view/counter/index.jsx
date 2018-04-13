import React, { Component } from 'react'
import {Button, Table} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import requestData from '../action'
const Column = Table.Column;
class Counter extends Component {
    constructor(props) {
        super(props);
       /* this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);*/
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        debugger;
        /*const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                点击: {value} 次数<br/>
                {' '}
                <Button onClick={onIncrement}>
                    +
                </Button>
                {' '}
                <Button onClick={onDecrement}>
                    -
                </Button>
                {' '}
                <Button onClick={this.incrementIfOdd}>
                    Increment if odd
                </Button>
                {' '}
                <Button onClick={this.incrementAsync}>
                    Increment async
                </Button>
            </p>
        )*/
        const {requestData, list} = this.props;
        return (
            <div>
                <Button onClick={requestData}>
                    请求数据
                </Button>
                <Table dataSource={list}>

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

/*Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}*/

const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        requestData: () => {
           requestData(dispatch);
        }
    };
}
const mapStateToProps = (state, ownProps) => {
    debugger;
    return {
        list: state.asyncReducer.data
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
