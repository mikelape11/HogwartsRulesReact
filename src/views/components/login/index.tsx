import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";

import "antd/dist/antd.css";
import "./style/style.css";
import Logo3 from "./media/Logo3.png";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import ruta from "./style/logoInicio";
import useAuth from "../../hooks/useAuth";
import { colors } from "@material-ui/core";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo2 from "./img/Logo2.png";

const delay = require("delay");
//funcion que conecte con la api
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

const Demo = () => {
  const [opacity, setOpacidad] = useState<number>(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [open, toggle] = useState(false);
  const { freq, scale, transform } = useSpring({
    reverse: open,
    from: { scale: 150, opacity: 1, transform: "scale(1)", freq: "0.0, 0.0" },
    to: {
      scale: 10,
      opacity: 0,
      transform: "scale(0.9)",
      freq: "0.0175, 0.0",
    },
    config: { duration: 3000 },
  });

  let history = useHistory();
  function comprobarLogin() {
    axios({
      method: "POST",
      url: "http://localhost:8080/loginWeb",
      data: {
        usuario: username,
        password: password,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      // setAuth(response.data);
      if (response.data == true) {
        setErrorLogin(false);
        history.push("/home");
      } else {
        setErrorLogin(true);
      }
    });
  }
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function animacionLogin() {
    setLogueado(true);
    opacidadFomu();
  }

  async function opacidadFomu() {
    var cols = document.querySelectorAll("form div div label");
    for (let i = 0; i < cols.length; i++) {
      cols[i].setAttribute("style", "color:white");
    }
    for (let i = 0; i < 11; i++) {
      setOpacidad(i / 10);
      await delay(100);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      animacionLogin();
    }, 3000);
  }, []);

  return (
    <div>
      {/* //opacity */}
      {!logueado ? (
        <animated.svg
          style={{ transform }}
          viewBox="0 0 1278 446"
          className="logo"
        >
          <defs>
            <filter id="water">
              <AnimFeTurbulence
                type="fractalNoise"
                baseFrequency={freq}
                numOctaves="1.5"
                result="TURB"
                seed="8"
              />
              <AnimFeDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="TURB"
                result="DISP"
                scale={scale}
              />
            </filter>
          </defs>
          <g filter="url(#water)">
            <animated.path d={ruta} fill="#F4C51D" />
          </g>
        </animated.svg>
      ) : (
        <div id="contenedorForm" >
          <img src={Logo2} alt="" id="imagen"></img>
          <div className="formulario">
            <UserOutlined style={{ fontSize: "25px", display: "inline", marginLeft: "13%", marginTop: "6.7%", padding: 0, position: "absolute", color: "#B46B1F" }}></UserOutlined>
            <input onChange={(text) => setUsername(text.target.value)} className="inputLogin" placeholder="Usuario" type="text">
            </input>
            <br></br>
            <LockOutlined style={{ fontSize: "25px", display: "inline", marginLeft: "13%", marginTop: "6.7%", padding: 0, position: "absolute", color: "#B46B1F" }}></LockOutlined>
            <input onChange={(text) => setPassword(text.target.value)} className="inputLogin" placeholder="Contraseña" type="password">
            </input>
            {errorLogin ? <p className="error">El usuario y la contraseña no coinciden</p> : ""}
            <button onClick={() => comprobarLogin()} className="inputButton" >
              LOGIN
            </button>
          </div>
        </div>

      )}
    </div>
  );
};
export default Demo;
