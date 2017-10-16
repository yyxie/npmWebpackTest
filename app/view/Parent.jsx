import React from 'react';
import Child from './child.jsx';
import Other from './other.jsx';

class Parent extends React.Component {
    constructor(props) {
        debugger;
        super(props);
    }

    renderChild() {
        const {child} = this.props.match.params;
        switch(child){
            case 'child':
                return <Child/>;
                break;
            case 'other':
                return <Other />;
                break;
            default: break;

        }


    }

    render() {
debugger;
        return (
            <div>
                {this.renderChild()}
            </div>
        )
    }
}

export default Parent;