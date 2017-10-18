import React, { Component } from 'react'
import {Button} from 'antd';
import PropTypes from 'prop-types'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
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
        const { value, onIncrement, onDecrement } = this.props;
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
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default Counter
