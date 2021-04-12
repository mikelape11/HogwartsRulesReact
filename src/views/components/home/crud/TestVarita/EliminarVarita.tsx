import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EliminarVarita = () => {
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
        <Menu.Item
          key={index}
          onClick={(dato) => {
            setIdSeleccionada(parametro["_id"]);
            escribirInputs(dato.key);
          }}
        >
          {parametro["pregunta"]}
        </Menu.Item>
      );
    });
    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }

  function escribirInputs(numero) {
    var lista = listaPreguntas[0][numero];
    setPregunta(lista["pregunta"]);
  }

  async function Eliminar() {
    console.log(idSeleccionada);
    await axios({
      method: "DELETE",
      url: "http://localhost:8080/eliminarVarita",
      data: {
        _id: idSeleccionada,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    setPregunta("");
    conseguirPreguntas();
  }

  async function conseguirPreguntas() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/getPreguntasRespuestasVarita",
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
        <Button>
          Preguntas <DownOutlined />
        </Button>
      </Dropdown>

      <Form.Item label="Pregunta: ">
        <Input
          readOnly={true}
          value={pregunta}
          onChange={(valor) => setPregunta(valor.target.value)}
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

export default EliminarVarita;
