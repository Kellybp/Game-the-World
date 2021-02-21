import React, {useEffect, useState} from 'react';
import {authMethods} from '../firebase/auth';
import firebase from 'firebase';
import brick from '../styling/brick.png';
import logo from '../styling/earth-11015_1920.png';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Login from "../pages/login";
import '../styling/homeStyle.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const imageStyle = {
    height:"4em",
    width:"4em",
}

class HomepageWrapper extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            collapsed: false,
            loggedUser: ''
        }
    }

    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };

    componentDidMount() {
        const userEmail = firebase.auth().currentUser.email;

        this.setState({
            loggedUser: userEmail
        });
    }

    handleLogout() {
        authMethods.signOut();
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        <img src={logo} alt="Game the World" style={imageStyle}/>
                        Game the World
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>{this.state.loggedUser}</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a onClick={this.handleLogout} style={{color: 'blue'}}>Logout</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Created at the 2021 BrickHack using Ant Design ©2018  <br/> <img src={brick} alt="Game the World" style={imageStyle} /></Footer>
                </Layout>
            </Layout>
        );
    }
}

export default HomepageWrapper;