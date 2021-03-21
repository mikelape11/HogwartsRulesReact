import React, { useState } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "./style/style.css";
import "antd/dist/antd.css";
import Logo3 from "./media/Logo3.png";
import axios from "axios";
//funcion que conecte con la api
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  function comprobarLogin() {
    axios({
      method: "POST",
      url: "http://localhost:8081/login",
      data: {
        usuario: username,
        password: password,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      console.log(response.data);
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

  return (
    /*<div className="logo"><img src={Logo3} alt="Girl in a jacket"></img></div>*/
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        <Input.Password onChange={(text) => setPassword(text.target.value)} />
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
  );
};
export default Demo;
