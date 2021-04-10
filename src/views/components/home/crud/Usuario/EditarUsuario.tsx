import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
import Password from "antd/lib/input/Password";
type SizeType = Parameters<typeof Form>[0]["size"];

const EditarUsuario = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const listaUsuarios = [] as any;

  const [idActualizar, setIdActualizar] = useState("");

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [casaHogwarts, setCasaHowgarts] = useState("");

  const [avatar, setAvatar] = useState("");

  const [rol, setRol] = useState(0);

  const [datosMenu, setDatosMenu] = useState<any>([]);

  let menu = <Menu>{datosMenu}</Menu>;

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item key={index} onClick={(dato) => escribirInputs(dato.key)}>
          {parametro["usuario"]}
        </Menu.Item>
      );
    });
    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }

  async function GuardarUsuario() {
    await axios({
      method: "PUT",
      url: "http://localhost:8080/actualizarUsuario",
      data: {
        _id: idActualizar,
        usuario: usuario,
        password: password,
        email: email,
        casaHogwarts: casaHogwarts,
        avatar: avatar,
        rol: rol,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    setUsuario("");
    setAvatar("");
    setCasaHowgarts("");
    setRol(0);
    setEmail("");
    setPassword("");
  }

  async function conseguirUsuarios() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/todos",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      listaUsuarios.push(response.data);
      lista.push(response.data);
      console.log(listaUsuarios);
    });
    hacerMenu(lista);
  }

  function escribirInputs(numero) {
    var lista = listaUsuarios[0][numero];
    setIdActualizar(lista["_id"]);
    setUsuario(lista["usuario"]);
    setPassword(lista["password"]);
    setEmail(lista["email"]);
    setCasaHowgarts(lista["casaHogwarts"]);
    setAvatar(lista["avatar"]);
    setRol(lista["rol"]);
  }

  useEffect(() => {
    conseguirUsuarios();
  }, []);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      {/* <Dropdown overlay={menu} trigger={["click"]}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Preguntas
        </a>
      </Dropdown> */}

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Usuarios <DownOutlined />
        </Button>
      </Dropdown>

      <Form.Item label="Usuario: ">
        <Input
          value={usuario}
          onChange={(valor) => setUsuario(valor.target.value)}
        />
      </Form.Item>
      <Form.Item label="Password:">
        <Input
          value={password}
          id="password"
          onChange={(valor) => setPassword(valor.target.value)}
        />
      </Form.Item>

      <Form.Item label="Email:">
        <Input
          value={email}
          id="email"
          onChange={(valor) => setEmail(valor.target.value)}
        />
      </Form.Item>

      <Form.Item label="Casa Hogwarts:">
        <Input
          value={casaHogwarts}
          id="casaHogwarts"
          onChange={(valor) => setCasaHowgarts(valor.target.value)}
        />
      </Form.Item>

      <Form.Item label="Avatar:">
        <Input
          value={avatar}
          id="respuesta4"
          onChange={(valor) => setAvatar(valor.target.value)}
        />
      </Form.Item>

      <Form.Item label="Rol:">
        <Input
          value={rol}
          id="respuesta4"
          onChange={(valor) => setRol(parseInt(valor.target.value))}
        />
      </Form.Item>

      <div id="guardar">
        <Button
          onClick={() => {
            GuardarUsuario();
          }}
        >
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export default EditarUsuario;
