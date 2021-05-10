import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Layout, Menu } from "antd";
import IconButton from "@material-ui/core/IconButton";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import {
  RollbackOutlined,
  SettingOutlined,
  CaretLeftOutlined,
  HomeOutlined,
  FileSyncOutlined,
  UserOutlined,
  FileAddOutlined,
  FileExcelOutlined,
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
import EliminarPregunta from "./crud/Test/EliminarPregunta";
import EditarUsuario from "./crud/Usuario/EditarUsuario";
import EliminarUsuario from "./crud/Usuario/EliminarUsuario";
import EliminarVarita from "./crud/TestVarita/EliminarVarita";
import EditarVarita from "./crud/TestVarita/EditarVarita";
import InsertarVarita from "./crud/TestVarita/InsertarVarita";
import EliminarPatronus from "./crud/TestPatronus/EliminarPatronus";
import EditarPatronus from "./crud/TestPatronus/EditarPatronus";
import InsertarPatronus from "./crud/TestPatronus/InsertarPatronus";
import InsertarProductos from "./crud/Productos/InsertarProductos";
import EditarProductos from "./crud/Productos/EditarProductos";
import EliminarProductos from "./crud/Productos/EliminarProductos";
import { Style } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import InsertarRules from "./crud/Rules/InsertarRules";
import EditarRules from "./crud/Rules/EditarRules";
import EliminarRules from "./crud/Rules/EliminarRules";
//funcion que conecte con la api

const Home = () => {
  const [valorMenu, setValorMenu] = useState(1);
  const { SubMenu } = Menu;
  const { Content, Sider, Header, Footer } = Layout;
  const [modo, setModo] = useState("Blanco");
  let history = useHistory();
  const [imagenSrc, setImagenSrc] = useState(Avatar);
  // const style = Style({
  //   .ant-form-item-label > label {
  //     color: white;
  //     font-size: larger;
  //   }
  // });
  useLayoutEffect(() => {
    if (modo == "Blanco") {
      var cols = document.querySelectorAll("form div div label");
      for (let i = 0; i < cols.length; i++) {
        cols[i].setAttribute("style", "color:black");
      }
      var cols2 = document.querySelectorAll("section");
      cols2[1].setAttribute("style", "background:#f0f2f5");
      cols2[2].setAttribute(
        "style",
        "background:#f0f2f5;padding-left:20px;padding-right:20px;padding-bottom:20px;"
      );
      var cols3 = document.querySelectorAll("div div input");
      for (let i = 0; i < cols3.length; i++) {
        if (cols3[i].id != "imagenUplo") {
          cols3[i].setAttribute("style", "background:white;color:black");
        }
      }
      var cols4 = document.querySelectorAll("ul li");
      for (let i = 0; i < cols4.length; i++) {
        if (cols4[i].id != "dropdown" && cols4[i].id == "subMenu")
          cols4[i].setAttribute("style", "background:white;padding-left:48px");
        else if (cols4[i].id != " dropdown")
          cols4[i].setAttribute("style", "background:white;padding-left:25px");
      }
      var cols5 = document.querySelectorAll("ul li ul");
      for (let i = 0; i < cols5.length; i++) {
        cols5[i].setAttribute("style", "background:white;");
      }
    } else {
      var cols = document.querySelectorAll("form div div label");
      for (let i = 0; i < cols.length; i++) {
        cols[i].setAttribute("style", "color:white");
      }
      //ant-layout ant-layout-has-sider
      var cols2 = document.querySelectorAll("section");
      cols2[1].setAttribute("style", "background:#686868");
      cols2[2].setAttribute(
        "style",
        "background:#686868;padding-left:20px;padding-right:20px;padding-bottom:20px;"
      );
      var cols3 = document.querySelectorAll("div div input");
      for (let i = 0; i < cols3.length; i++) {
        if (cols3[i].id != "imagenUplo") {
          cols3[i].setAttribute("style", "background:#686868;color:white");
        }
      }
      var cols4 = document.querySelectorAll("ul li");
      for (let i = 0; i < cols4.length; i++) {
        if (cols4[i].id != "dropdown" && cols4[i].id == "subMenu")
          cols4[i].setAttribute(
            "style",
            "background:#4a4747;padding-left:48px"
          );
        else if (cols4[i].id != "dropdown") {
          cols4[i].setAttribute(
            "style",
            "background:#4a4747;padding-left:25px"
          );
        }
      }
      var cols5 = document.querySelectorAll("ul li ul");
      for (let i = 0; i < cols5.length; i++) {
        console.log(cols5[i]);
        cols5[i].setAttribute("style", "background:#4a4747;");
      }
    }
  }, [valorMenu]);

  return (
    <Layout>
      <Header className={modo == "Blanco" ? "header" : "header-dark"}>
        <div id="icono">
          <img width={350} src={Icon}></img>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className={
            modo == "Blanco"
              ? "site-layout-background"
              : "site-dark-layout-background"
          }
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            className={modo == "Blanco" ? "menuLight" : "menuDark"}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub2" icon={<UserOutlined />} title="Usuarios">
              <Menu.Item
                key="5"
                id="subMenu"
                onClick={() => setValorMenu(5)}
                icon={<UserSwitchOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="6"
                id="subMenu"
                onClick={() => setValorMenu(6)}
                icon={<UserDeleteOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<EuroOutlined />} title="Productos">
              <Menu.Item
                key="7"
                id="subMenu"
                onClick={() => setValorMenu(7)}
                icon={<PlusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="8"
                id="subMenu"
                onClick={() => setValorMenu(8)}
                icon={<QuestionCircleOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="9"
                id="subMenu"
                onClick={() => setValorMenu(9)}
                icon={<MinusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<EuroOutlined />} title="Test">
              <Menu.Item
                key="10"
                id="subMenu"
                onClick={() => setValorMenu(10)}
                icon={<PlusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="11"
                id="subMenu"
                onClick={() => setValorMenu(11)}
                icon={<QuestionCircleOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="12"
                id="subMenu"
                onClick={() => setValorMenu(12)}
                icon={<MinusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<EuroOutlined />} title="TestVarita">
              <Menu.Item
                key="13"
                id="subMenu"
                onClick={() => setValorMenu(13)}
                icon={<PlusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="14"
                id="subMenu"
                onClick={() => setValorMenu(14)}
                icon={<QuestionCircleOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="15"
                id="subMenu"
                onClick={() => setValorMenu(15)}
                icon={<MinusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<EuroOutlined />} title="TestPatronus">
              <Menu.Item
                key="16"
                id="subMenu"
                onClick={() => setValorMenu(16)}
                icon={<PlusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="17"
                id="subMenu"
                onClick={() => setValorMenu(17)}
                icon={<QuestionCircleOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="18"
                id="subMenu"
                onClick={() => setValorMenu(18)}
                icon={<MinusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<EuroOutlined />} title="Rules">
              <Menu.Item
                key="19"
                id="subMenu"
                onClick={() => setValorMenu(19)}
                icon={<PlusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Crear
              </Menu.Item>
              <Menu.Item
                key="20"
                id="subMenu"
                onClick={() => setValorMenu(20)}
                icon={<QuestionCircleOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                key="21"
                id="subMenu"
                onClick={() => setValorMenu(21)}
                icon={<MinusSquareOutlined />}
                className={modo == "Blanco" ? "subMenuLight" : "subMenuDark"}
              >
                Eliminar
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }} className="content">
          <Content
            className={
              modo == "Blanco"
                ? "site-layout-background"
                : "site-dark-layout-background"
            }
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              height: "90vh",
            }}
          >
            {valorMenu == 5 ? <EditarUsuario></EditarUsuario> : ""}
            {valorMenu == 6 ? <EliminarUsuario></EliminarUsuario> : ""}
            {valorMenu === 7 ? <InsertarProductos></InsertarProductos> : ""}
            {valorMenu === 8 ? <EditarProductos></EditarProductos> : ""}
            {valorMenu === 9 ? <EliminarProductos></EliminarProductos> : ""}
            {valorMenu == 10 ? <InsertarPregunta></InsertarPregunta> : ""}
            {valorMenu == 11 ? <EditarPregunta></EditarPregunta> : ""}
            {valorMenu == 12 ? <EliminarPregunta></EliminarPregunta> : ""}
            {valorMenu == 13 ? <InsertarVarita></InsertarVarita> : ""}
            {valorMenu == 14 ? <EditarVarita></EditarVarita> : ""}
            {valorMenu == 15 ? <EliminarVarita></EliminarVarita> : ""}
            {valorMenu == 16 ? <InsertarPatronus></InsertarPatronus> : ""}
            {valorMenu == 17 ? <EditarPatronus></EditarPatronus> : ""}
            {valorMenu == 18 ? <EliminarPatronus></EliminarPatronus> : ""}
            {valorMenu == 19 ? <InsertarRules></InsertarRules> : ""}
            {valorMenu == 20 ? <EditarRules></EditarRules> : ""}
            {valorMenu == 21 ? <EliminarRules></EliminarRules> : ""}
          </Content>
        </Layout>
        <Footer className={modo == "Blanco" ? "footer" : "footer-dark"}>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="image"
            type="file"
            onChange={(valor) => {
              console.log(valor.target.value);
              setImagenSrc(valor.target.value);
            }}
          />
          <label htmlFor="contained-button-file">
            <IconButton component="span" id="h1nombre">
              <img src={imagenSrc} id="logo"></img>
            </IconButton>
          </label>
          <h1 id="h1nombre">ChorizoOMG</h1>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<HomeOutlined />}
            className="botones"
            onClick={() => {
              history.push("/home");
            }}
          >
            Inicio
          </Button>
          <br></br>
          <Button
            type="primary"
            shape="round"
            icon={<RollbackOutlined />}
            className="botones"
            onClick={() => {
              history.push("/login");
            }}
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
            onClick={() => {
              history.push("/login");
            }}
          >
            Log Out
          </Button>
          <br></br>
          <br></br>
          <div
            id="darklight"
            onClick={() => {
              if (modo == "Blanco") {
                setModo("Oscuro");
                var cols = document.querySelectorAll("form div div label");
                for (let i = 0; i < cols.length; i++) {
                  cols[i].setAttribute("style", "color:white");
                }
                //ant-layout ant-layout-has-sider
                var cols2 = document.querySelectorAll("section");
                cols2[1].setAttribute("style", "background:#686868");
                cols2[2].setAttribute(
                  "style",
                  "background:#686868;padding-left:20px;padding-right:20px;padding-bottom:20px;"
                );
                var cols3 = document.querySelectorAll("div div input");
                for (let i = 0; i < cols3.length; i++) {
                  if (cols3[i].id != "imagenUplo") {
                    cols3[i].setAttribute(
                      "style",
                      "background:#686868;color:white"
                    );
                  }
                }
                var cols4 = document.querySelectorAll("ul li");
                for (let i = 0; i < cols4.length; i++) {
                  if (cols4[i].id != "dropdown" && cols4[i].id == "subMenu")
                    cols4[i].setAttribute(
                      "style",
                      "background:#4a4747;padding-left:48px"
                    );
                  else if (cols4[i].id != "dropdown") {
                    cols4[i].setAttribute(
                      "style",
                      "background:#4a4747;padding-left:25px"
                    );
                  }
                }
                var cols5 = document.querySelectorAll("ul li ul");
                for (let i = 0; i < cols5.length; i++) {
                  console.log(cols5[i]);
                  cols5[i].setAttribute("style", "background:#4a4747;");
                }
              } else {
                setModo("Blanco");
                var cols = document.querySelectorAll("form div div label");
                for (let i = 0; i < cols.length; i++) {
                  cols[i].setAttribute("style", "color:black");
                }
                var cols2 = document.querySelectorAll("section");
                cols2[1].setAttribute("style", "background:#f0f2f5");
                cols2[2].setAttribute(
                  "style",
                  "background:#f0f2f5;padding-left:20px;padding-right:20px;padding-bottom:20px;"
                );
                var cols3 = document.querySelectorAll("div div input");
                for (let i = 0; i < cols3.length; i++) {
                  if (cols3[i].id != "imagenUplo") {
                    cols3[i].setAttribute(
                      "style",
                      "background:white;color:black"
                    );
                  }
                }
                var cols4 = document.querySelectorAll("ul li");
                for (let i = 0; i < cols4.length; i++) {
                  if (cols4[i].id != "dropdown" && cols4[i].id == "subMenu")
                    cols4[i].setAttribute(
                      "style",
                      "background:white;padding-left:48px"
                    );
                  else if (cols4[i].id != " dropdown")
                    cols4[i].setAttribute(
                      "style",
                      "background:white;padding-left:25px"
                    );
                }
                var cols5 = document.querySelectorAll("ul li ul");
                for (let i = 0; i < cols5.length; i++) {
                  cols5[i].setAttribute("style", "background:white;");
                }
              }
            }}
          >
            <h1>Modo Oscuro</h1>
            {modo == "Blanco" ? (
              <ToggleOffIcon></ToggleOffIcon>
            ) : (
              <ToggleOnIcon></ToggleOnIcon>
            )}
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
