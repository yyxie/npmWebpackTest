import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link, withRouter, Switch, Route} from 'react-router-dom';
import './style.css';

import MenuData from './menu.config.js';

const {SubMenu} = Menu;
const {Header, Footer, Sider, Content} = Layout;
const breadcrumbNameMap = {
    '/a': 'a',
    '/b': 'b',
    '/redux': 'redux',
    '/parent': 'parent',
    '/parent/child': 'child',
    '/detail': 'detail',
    '/detail/id': 'id',
};

export default withRouter(class OutApp extends React.Component {
    /*const OutApp = withRouter((props) => {*/
    constructor(props) {
        super(props);
        this.state = {
            defaultOpenKeys: ['reflux test'],
            defaultSelectedKeys: ['a']
        }
    }

    componentWillMount() {
        //Util.requireAuth(this.props.history, this.props.location);
    }

    renderMenu = (data) => {
        const result = [];

        data.forEach((item, index) => {

            if (!item.children) {
                result.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>
                            {item.icon ? <Icon type={item.icon}/> : null}
                            <span className="nav-text">{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                result.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                  {item.icon ? <Icon type={item.icon}/> : null}
                                <span className="nav-text">{item.name}</span>
                </span>
                        }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )

            }
        });

        return result
    }
    handleOpenChange = (key) => {
        debugger;
        console.log(key);
    }

    render() {
        const {location} = this.props;
        const {defaultSelectedKeys, defaultOpenKeys} = this.state;
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
            <Layout style={{height: '100%'}}>
                <Sider style={{width: 240}}>
                    <div className="logo"/>
                    <Menu
                        onClick={this.handleClick}
                        onOpenChange={this.handleOpenChange}
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        mode="inline"

                        theme="dark"
                    >
                        {this.renderMenu(MenuData)}
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{background: '#ececec', padding: 0}}>
                        <Breadcrumb style={{marginLeft: 20}}>
                            {breadcrumbItems}
                        </Breadcrumb>
                    </Header>

                    <Content className="main-content">
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        by 解园园
                    </Footer>
                </Layout>
            </Layout>
        )
    }
});
