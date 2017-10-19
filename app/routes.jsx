import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
import App from './view/entry';
import Detail from './view/detail.jsx';
import aComponent from './view/aComponent.jsx';
import bComponent from './view/bComponent.jsx';
import ReduxComponent from './view/ReduxTest.jsx';
import Parent from './view/Parent.jsx';
import Login from './view/login.jsx';
import ReduxTest from './view/ReduxTest.jsx';
import HighComponent from './view/highComponent/'
import NoMatch from './view/noMatch.jsx';


const outRoute = (
    /*   <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
           <Route path='/' component={App}>

           </Route>
           <Route path='/a' component={aComponent}/>

        </BrowserRouter>*/
    <Router>
        {/* <App className="test">
             <Route path="/" onEnter={(nextState, replace) => replace("/a")} />
            <Route path="/" onEnter={(nextState, replace) => replace("/a")} />
            <Route path="/a" component = {aComponent}/>
            <Route path="/b" component = {bComponent}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="/redux" component={ReduxComponent}/>
            <Route path='/parent/:child' component={Parent} />

        </App>*/}
        <switch>
           {/* <Route exact path="/" render={() => <Redirect to="/a" component={App} />} />*/}
            <Route path="/" render={(match) => {

                if (match.location.pathname == '/login') {
                   return <Route name="login" path="/login" component={Login}/>
                } else {
                   return <App>
                        <Switch>
                            <Redirect exact from="/" to="/a"/>
                            <Route name="aComponent" path="/a" component={aComponent}/>
                            <Route name="bComponent" path="/b" component={bComponent}/>
                            <Route name="Detail" path="/detail/:id" component={Detail}/>
                            <Route name="ReduxComponent" path="/redux" component={ReduxComponent}/>
                            <Route name="Parent" path='/parent/:child' component={Parent}/>
                            <Route name="ReduxTest" path='/counter' component={ReduxTest}/>
                            <Route name="highComponent" path='/highcomponent' component={HighComponent}/>
                            <Route name="NoMatch" component={NoMatch}/>
                        </Switch>
                    </App>
                }
            }}/>
            {/*   <App className="test">
                <Route path="/a" component={aComponent}/>
                <Route path="/b" component={bComponent}/>
                <Route path="/detail/:id" component={Detail}/>
                <Route path="/redux" component={ReduxComponent}/>
                <Route path='/parent/:child' component={Parent}/>
            </App>*/}
        </switch>
    </Router>
)
export default outRoute;
