import React from 'react';
import Util from './util.jsx';
function ppHOC(WrappedComponent) {
    return class PP extends React.Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            Util.requireAuth(this.props.history, this.props.location);
        }

        render() {

            return <WrappedComponent {...this.props} />
        }
    }
}
export default ppHOC;