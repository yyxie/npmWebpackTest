import React from 'react'
import {createStore} from 'redux'
import Counter from './counter/index.jsx'
import redux from './reducers/index.jsx'

const store = createStore(redux)
export default class ReduxTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counterVal: store.getState()
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                counterVal: store.getState()
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        debugger;
        const {counterVal} = this.state;
        return (
         /*   <div>
                Clicked: {counterVal} times
                {' '}
                <button onClick={() => store.dispatch({type: 'INCREMENT'})}>
                    +
                </button>
                {' '}
                <button onClick={() => store.dispatch({type: 'DECREMENT'})}>
                    -
                </button>
            </div>*/
            <Counter
                value={counterVal}
                onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                onDecrement={() => store.dispatch({type: 'DECREMENT'})}
            />
        )
    }
}

