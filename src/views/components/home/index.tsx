import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Layout, Menu } from "antd";
import IconButton from "@material-ui/core/IconButton";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import {
  RollbackOutlined,
  SettingOutlined,
  CaretLeftOutlined,
  HomeOutlined,
  FileSyncOutlined,
  UserOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  EuroOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./style/style.css";
import Icon from "./media/Logo1.png";
import Avatar from "./media/Avatar.png";
import InsertarPregunta from "./crud/Test/InsertarPregunta";
import EditarPregunta from "./crud/Test/EditarPregunta";

//funcion que conecte con la api

const Home = () => {
  const [valorMenu, setValorMenu] = useState(1);
  const { SubMenu } = Menu;
  const { Content, Sider, Header, Footer } = Layout;
  let history = useHistory();
  return (
    <Layout>
      <Header className="header">
        <div id="icono">
          <img width={350} src={Icon}></img>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<FileSyncOutlined />} title="Noticias">
              <Menu.Item
                key="1"
                onClick={() => setValorMenu(1)}
                icon={<FileAddOutlined />}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => setValorMenu(2)}
                icon={<FileSyncOutlined />}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => setValorMenu(3)}
                icon={<FileExcelOutlined />}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Usuarios">
              <Menu.Item
                key="4"
                onClick={() => setValorMenu(4)}
                icon={<UserAddOutlined />}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => setValorMenu(5)}
                icon={<UserSwitchOutlined />}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => setValorMenu(6)}
                icon={<UserDeleteOutlined />}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<EuroOutlined />} title="Productos">
              <Menu.Item
                key="7"
                onClick={() => setValorMenu(7)}
                icon={<PlusSquareOutlined />}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="8"
                onClick={() => setValorMenu(8)}
                icon={<QuestionCircleOutlined />}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="9"
                onClick={() => setValorMenu(9)}
                icon={<MinusSquareOutlined />}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<EuroOutlined />} title="Test">
              <Menu.Item
                key="10"
                onClick={() => setValorMenu(10)}
                icon={<PlusSquareOutlined />}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="11"
                onClick={() => setValorMenu(11)}
                icon={<QuestionCircleOutlined />}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="12"
                onClick={() => setValorMenu(12)}
                icon={<MinusSquareOutlined />}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }} className="content">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height: "90vh",
            }}
          >
            {valorMenu == 10 ? <InsertarPregunta></InsertarPregunta> : ""}
            {valorMenu == 11 ? <EditarPregunta></EditarPregunta> : ""}
          </Content>
        </Layout>
        <Footer className="footer">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="image"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <IconButton component="span" id="h1nombre">
              <img src={Avatar} id="logo"></img>
            </IconButton>
          </label>
          <h1 id="h1nombre">BelakoOMG</h1>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<HomeOutlined />}
            className="botones"
          >
            Inicio
          </Button>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<RollbackOutlined />}
            className="botones"
          >
            Cambio de cuenta
          </Button>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<SettingOutlined />}
            className="botones"
          >
            Configuración
          </Button>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<CaretLeftOutlined />}
            className="botones"
          >
            Log Out
          </Button>
          <br></br>
          <br></br>
          <div id="darklight">
            <h1>Modo Oscuro</h1>
            <ToggleOffIcon></ToggleOffIcon>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
