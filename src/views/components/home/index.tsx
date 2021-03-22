import React, { useState } from "react";
import { useHistory } from "react-router";
import { Layout, Menu } from 'antd';
import { FileSyncOutlined, UserOutlined, FileAddOutlined,FileExcelOutlined,UserAddOutlined,UserDeleteOutlined,UserSwitchOutlined,EuroOutlined,PlusSquareOutlined,MinusSquareOutlined,QuestionCircleOutlined} from '@ant-design/icons';
import "./style/style.css";
import Icon from "./media/Logo1.png";
import Avatar from "./media/Avatar.png";

//funcion que conecte con la api


const Home = () => {
    const { SubMenu } = Menu;
    const { Content, Sider,Header,Footer } = Layout;
    let history = useHistory();
    return (
        <Layout>
            <Header className="header">
                <div id="icono">
                    <img src={Icon}></img>
                </div>
            </Header>
        <Layout>
        <Sider width={200} className="site-layout-background">
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            >
            <SubMenu key="sub1" icon={<FileSyncOutlined />} title="Noticias">
                <Menu.Item key="1" icon={<FileAddOutlined />}>Crear</Menu.Item>
                <Menu.Item key="2" icon={<FileSyncOutlined />}>Editar</Menu.Item>
                <Menu.Item key="3" icon={<FileExcelOutlined />}>Eliminar</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Usuarios">
                <Menu.Item key="4" icon={<UserAddOutlined />}>Crear</Menu.Item>
                <Menu.Item key="5" icon={<UserSwitchOutlined />}>Editar</Menu.Item>
                <Menu.Item key="6" icon={<UserDeleteOutlined />}>Eliminar</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<EuroOutlined />} title="Productos">
            <Menu.Item key="7" icon={<PlusSquareOutlined />}>Crear</Menu.Item>
                <Menu.Item key="8" icon={<QuestionCircleOutlined />}>Editar</Menu.Item>
                <Menu.Item key="9" icon={<MinusSquareOutlined />}>Eliminar</Menu.Item>
            </SubMenu>
            </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }} className="content">
            <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
            >
            Content
            </Content>
            
        </Layout>
        <Footer>
        <img src={Avatar} height={100}></img>
        <h1>BelakoOMG</h1>
        </Footer>
        </Layout>
    </Layout>
  );
};
export default Home;
