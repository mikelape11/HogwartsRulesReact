import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EliminarUsuario = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const listaUsuarios = [] as any;

  const [usuario, setUsuario] = useState("");

  const [idSeleccionada, setIdSeleccionada] = useState<any>(0);

  const [datosMenu, setDatosMenu] = useState<any>([]);

  let menu = <Menu>{datosMenu}</Menu>;

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item
          key={index}
          id="dropdown"
          onClick={(dato) => {
            setIdSeleccionada(parametro["_id"]);
            escribirInputs(dato.key);
          }}
        >
          {parametro["usuario"]}
        </Menu.Item>
      );
    });
    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }

  function escribirInputs(numero) {
    var lista = listaUsuarios[0][numero];
    setUsuario(lista["usuario"]);
  }

  async function Eliminar() {
    console.log(idSeleccionada);
    if (usuario != "")
      await axios({
        method: "DELETE",
        url: "http://localhost:8080/eliminarUsuario",
        data: {
          _id: idSeleccionada,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    setUsuario("");
    conseguirPreguntas();
  }

  async function conseguirPreguntas() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/todos",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      listaUsuarios.push(response.data);
      lista.push(response.data);
    });
    hacerMenu(lista);
  }

  useEffect(() => {
    conseguirPreguntas();
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
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button>
          Usuarios <DownOutlined />
        </Button>
      </Dropdown>

      <Form.Item label="Usuario: ">
        <Input
          readOnly={true}
          value={usuario}
          onChange={(valor) => setUsuario(valor.target.value)}
        />
      </Form.Item>

      <div id="guardar">
        <Button
          onClick={() => {
            Eliminar();
          }}
        >
          Eliminar
        </Button>
      </div>
    </Form>
  );
};

export default EliminarUsuario;
