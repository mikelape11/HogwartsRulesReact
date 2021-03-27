import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const InsertarPregunta = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

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

  function GuardarPregunta() {
    console.log(fileList);
    axios({
      method: "POST",
      url: "http://localhost:8080/añadirTest",
      data: {
        pregunta: pregunta,
        numPregunta: 9,
        respuestas: [
          {
            numRespuesta: 1,
            respuesta: respuesta1,
            imagen: fileList,
            puntos: 0,
          },
          {
            numRespuesta: 2,
            respuesta: respuesta2,
            imagen: fileList2,
            puntos: 0,
          },
          {
            numRespuesta: 3,
            respuesta: respuesta3,
            imagen: fileList3,
            puntos: 0,
          },
          {
            numRespuesta: 4,
            respuesta: respuesta4,
            imagen: fileList4,
            puntos: 0,
          },
        ],
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      <Form.Item label="Pregunta: ">
        <Input onChange={(valor) => setPregunta(valor.target.value)} />
      </Form.Item>
      <Form.Item label="Respuesta 1:">
        <Input onChange={(valor) => setRespuesta1(valor.target.value)} />
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
        <Input onChange={(valor) => setRespuesta2(valor.target.value)} />
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
        <Input onChange={(valor) => setRespuesta3(valor.target.value)} />
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
        <Input onChange={(valor) => setRespuesta4(valor.target.value)} />
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

export default InsertarPregunta;
