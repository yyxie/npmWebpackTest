import React from 'react'
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import Counter from './counter/index.jsx'
import store from './store';

export default class ReduxTest extends React.Component {
    constructor(props) {
        super(props);
        //
        // this.state = {
        //     counterVal: store.getState()
        // }
    }

    componentDidMount() {
        /* this.unsubscribe = store.subscribe(() => {
              this.setState({
                  store: store
              })
          })*/
    }

    componentWillUnmount() {
        // this.unsubscribe();
    }

    render() {

        //const {counterVal} = this.state;
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
            <Provider store={store}>
                <Counter
                    /*value={counterVal}
                    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                    onDecrement={() => store.dispatch({type: 'DECREMENT'})}*/
                />
            </Provider>
        )
    }
}

