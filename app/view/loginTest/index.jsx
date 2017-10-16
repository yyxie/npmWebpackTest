import React from 'react';
import Util from '../../util.jsx';

class LoginTest extends React.Component {
    constructor(props) {

        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default LoginTest;