import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import './style.css';
import Util from './util.jsx';
import Detail from '../detail.jsx';
import aComponent from '../aComponent.jsx';
import bComponent from '../bComponent.jsx';
import ReduxComponent from '../ReduxTest.jsx';
import Parent from '../Parent.jsx';


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const breadcrumbNameMap = {
    '/a': 'a',
    '/b': 'b',
    '/redux': 'redux',
    '/parent': 'parent',
    '/parent/child': 'child',
    '/detail/id': 'id',
};

export default withRouter(class OutApp extends React.Component {
    /*const OutApp = withRouter((props) => {*/
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        debugger;
        Util.requireAuth(this.props.history, this.props.location);
    }

    render() {
        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return (
            <Layout>

                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">1</Menu.Item>
                        <Menu.Item key="2">2</Menu.Item>
                        <Menu.Item key="3">3</Menu.Item>
                        <Menu.Item key="4d">4</Menu.Item>
                        <Menu.Item key="5f">5</Menu.Item>
                        <Menu.Item key="6f">6</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                                <Menu.Item key="1"><Link to="/detail/1234" replace>nav 1</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/a" replace>nav 2</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/b" replace>nav 3</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/redux" replace>redux</Link></Menu.Item>
                                <Menu.Item key="5f"><Link to="/parent" replace>parent</Link></Menu.Item>
                                <Menu.Item key="6f"><Link to="/parent/child" replace>parent/child</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                          {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
});
