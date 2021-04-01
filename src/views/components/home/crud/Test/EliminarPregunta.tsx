import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EliminarPregunta = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const listaPreguntas = [] as any;

  const [pregunta, setPregunta] = useState("");

  const [idSeleccionada, setIdSeleccionada] = useState<any>(0);

  const [datosMenu, setDatosMenu] = useState<any>([]);

  let menu = <Menu>{datosMenu}</Menu>;

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item key={index} onClick={(dato) => setIdSeleccionada(dato.key)}>
          {parametro["pregunta"]}
        </Menu.Item>
      );
    });
    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }

  function Eliminar() {}

  async function conseguirPreguntas() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/getPreguntasRespuestas",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      listaPreguntas.push(response.data);
      lista.push(response.data);
      console.log(listaPreguntas);
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
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Preguntas
        </a>
      </Dropdown>

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

export default EliminarPregunta;
