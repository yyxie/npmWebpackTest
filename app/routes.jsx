import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect, Link, withRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
import App from './view/entry';
import aComponent from 'bundle-loader?lazy&name=aComponent!./view/aComponent';
import bComponent from 'bundle-loader?lazy&name=bComponent!./view/bComponent';
import Detail from 'bundle-loader?lazy&name=detail!./view/detail.jsx';
import ReduxComponent from 'bundle-loader?lazy&name=ReduxTest!./view/ReduxTest.jsx';
import Parent from 'bundle-loader?lazy&name=Parent!./view/Parent.jsx';
import Login from './view/login.jsx';
import ReduxTest from 'bundle-loader?lazy&name=ReduxTest!./view/ReduxTest.jsx';

import NoMatch from './view/noMatch.jsx';



import Bundle from './view/lazyload';
import HighComponent from './view/highComponent/'

const Loading = function () {
    return <div>Loading...</div>
}
const createComponent = (component) =>
    () => {
        let AsyncComponent = (
            <Bundle load={component}>
                {
                    (Async) => Async ? <Async/> : <Loading/>
                }
            </Bundle>
        )
        return AsyncComponent
    }

/*class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        Util.requireAuth(this.props.history, this.props.location);
    }

    render() {
        const props = this.props;

        return (
            <div>
                <Route path={`${props.match.url}a`} component={createComponent(aComponent)}/>
                <Route path={`${props.match.url}b`} component={createComponent(bComponent)}/>
            </div>
        )

    }
}*/
const checkSignin = function (cName) {
    debugger;
    if (!Cookies.get('isLogin')) {
        return false;
    } else {
        return true;
    };
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       checkSignin() ? (
           <Bundle load={Component}>
               {
                   (Async) => Async ? <Async {...rest}/> : <Loading/>
               }
           </Bundle>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)
const outRoute = (
    <Router>
        <switch>
            <Route path={"/"}
                   /*component={About}*/
                  render={(match) => {

                 if (match.location.pathname == '/login') {
                    return <Route name="login" path="/login" component={Login}/>
                 } else {
                    return <App>
                         <Switch>
                             <Redirect exact from="/" to="/a"/>
                             <PrivateRoute path="/a" component={aComponent}/>
                             <PrivateRoute path="/b" component={bComponent}/>
                           <PrivateRoute path="/detail/:id" component={Detail}/>
                             <PrivateRoute path="/redux" component={ReduxComponent}/>
                          <PrivateRoute path="/parent/:child" component={Parent}/>
                             <PrivateRoute path="/counter" component={ReduxTest}/>
                          {/*  <Route name="aComponent" path="/a" component={createComponent(aComponent)}/>
                             <Route name="bComponent" path="/b" component={createComponent(bComponent)}/>
                             <Route name="Detail" path="/detail/:id" component={Detail}/>
                             <Route name="ReduxComponent" path="/redux" component={ReduxComponent}/>
                             <Route name="Parent" path='/parent/:child' component={Parent}/>
                             <Route name="ReduxTest" path='/counter' component={ReduxTest}/>
                             <Route name="highComponent" path='/highcomponent' component={HighComponent}/>*/}
                             <Route name="NoMatch" component={NoMatch}/>
                         </Switch>
                     </App>
                 }
             }}
            />
        </switch>
    </Router>
)
export default outRoute;
