import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EditarPatronus = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const listaPreguntas = [] as any;

  const [idActualizar, setIdActualizar] = useState("");

  const [numPreg, setNumPreg] = useState(0);
  // const [listaPreguntas, setListaPreguntas] = useState<any>([]);

  const [respuesta1, setRespuesta1] = useState("");

  const [respuesta2, setRespuesta2] = useState("");

  const [respuesta3, setRespuesta3] = useState("");

  const [respuesta4, setRespuesta4] = useState("");

  const [pregunta, setPregunta] = useState("");

  const [fileList, setFileList] = useState<any>([]);

  const [fileList2, setFileList2] = useState<any>([]);

  const [fileList3, setFileList3] = useState<any>([]);

  const [fileList4, setFileList4] = useState<any>([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange2 = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
  };
  const onChange3 = ({ fileList: newFileList }) => {
    setFileList3(newFileList);
  };
  const onChange4 = ({ fileList: newFileList }) => {
    setFileList4(newFileList);
  };

  const [datosMenu, setDatosMenu] = useState<any>([]);

  let menu = <Menu>{datosMenu}</Menu>;

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item key={index} onClick={(dato) => escribirInputs(dato.key)}>
          {parametro["pregunta"]}
        </Menu.Item>
      );
    });
    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    //imgWindow.document.write(image.outerHTML);
  };

  async function GuardarPregunta() {
    console.log(fileList);
    await axios({
      method: "POST",
      url: "http://localhost:8080/editarPatronus",
      data: {
        _id: idActualizar,
        pregunta: pregunta,
        numPregunta: numPreg,
        respuestas: [
          {
            numRespuesta: 1,
            respuesta: respuesta1,
            imagen: fileList,
            puntos: "paco",
          },
          {
            numRespuesta: 2,
            respuesta: respuesta2,
            imagen: fileList2,
            puntos: "paco",
          },
          {
            numRespuesta: 3,
            respuesta: respuesta3,
            imagen: fileList3,
            puntos: "paco",
          },
          {
            numRespuesta: 4,
            respuesta: respuesta4,
            imagen: fileList4,
            puntos: "paco",
          },
        ],
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    conseguirPreguntas();
  }

  async function conseguirPreguntas() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/getPreguntasRespuestasPatronus",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      listaPreguntas.push(response.data);
      lista.push(response.data);
      console.log(listaPreguntas);
    });
    hacerMenu(lista);
  }

  function escribirInputs(numero) {
    var lista = listaPreguntas[0][numero];
    setIdActualizar(lista["_id"]);
    setNumPreg(lista["numPregunta"]);
    setPregunta(lista["pregunta"]);

    setRespuesta1(lista["respuestas"][0]["respuesta"]);
    setFileList(lista["respuestas"][0]["imagen"]);

    setRespuesta2(lista["respuestas"][1]["respuesta"]);
    setFileList2(lista["respuestas"][1]["imagen"]);

    setRespuesta3(lista["respuestas"][2]["respuesta"]);
    setFileList3(lista["respuestas"][2]["imagen"]);

    setRespuesta4(lista["respuestas"][3]["respuesta"]);
    setFileList4(lista["respuestas"][3]["imagen"]);
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
          Preguntas <DownOutlined />
        </Button>
      </Dropdown>

      <Form.Item label="Pregunta: ">
        <Input
          value={pregunta}
          onChange={(valor) => setPregunta(valor.target.value)}
        />
      </Form.Item>
      <Form.Item label="Respuesta 1:">
        <Input
          value={respuesta1}
          id="respuesta"
          onChange={(valor) => setRespuesta1(valor.target.value)}
        />
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      <Form.Item label="Respuesta 2:">
        <Input
          value={respuesta2}
          id="respuesta2"
          onChange={(valor) => setRespuesta2(valor.target.value)}
        />
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList2}
            onChange={(imagen) => onChange2(imagen)}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {fileList2.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      <Form.Item label="Respuesta 3:">
        <Input
          value={respuesta3}
          id="respuesta3"
          onChange={(valor) => setRespuesta3(valor.target.value)}
        />
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList3}
            onChange={(imagen) => onChange3(imagen)}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {fileList3.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      <Form.Item label="Respuesta 4:">
        <Input
          value={respuesta4}
          id="respuesta4"
          onChange={(valor) => setRespuesta4(valor.target.value)}
        />
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList4}
            onChange={(imagen) => onChange4(imagen)}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {fileList4.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      <div id="guardar">
        <Button
          onClick={() => {
            GuardarPregunta();
          }}
        >
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export default EditarPatronus;
