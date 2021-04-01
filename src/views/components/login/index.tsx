import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "./style/style.css";
import "antd/dist/antd.css";
import Logo3 from "./media/Logo3.png";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import ruta from "./style/logoInicio";
import useAuth from "../../hooks/useAuth";

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
  //const opacity2 = useRef(new Animated.value(0.1)).current;
  const [setAuth] = useAuth();
  const [opacity, setOpacidad] = useState<number>(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
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
      url: "http://localhost:8080/login",
      data: {
        usuario: username,
        password: password,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      setAuth(response.data);
      if (response.data == true) {
        history.push("/home");
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
    /*<div className="logo"><img src={Logo3} alt="Girl in a jacket"></img></div>*/
    // <div onClick={() => {if(!logueado){toggle(!open)}}} id="divClick"></div>
    <div>
      {/* //opacity */}
      {!logueado ? (
        <animated.svg
          style={{ transform }}
          viewBox="0 0 1278 446"
          id="logo"
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
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          id="formulario"
          style={{ opacity: opacity }}
          //className={opacity}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={(text) => setUsername(text.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(text) => setPassword(text.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => comprobarLogin()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default Demo;
