import React, { useState } from "react";
import { Form, Input, Button, Upload, message, InputNumber } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
import { PetsOutlined } from "@material-ui/icons";
type SizeType = Parameters<typeof Form>[0]["size"];

const InsertarProductos = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [casa, setCasa] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  function onChangeCantidad(value) {
    setCantidad(value);
  }
  function onChangePrecio(value) {
    setPrecio(value);
  }
  async function GuardarPregunta() {
    await axios({
      method: "POST",
      url: "http://localhost:8080/addProduct",
      data: {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        casa: casa,
        tipo: tipo,
        descripcion: descripcion,
        foto: fileList,
      },
    });
    setNombre("");
    setCantidad(0);
    setPrecio(0);
    setCasa("");
    setTipo("");
    setDescripcion("");
    setFileList([]);
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
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
    >
      <Form.Item label="Nombre: ">
        <Input
          onChange={(valor) => setNombre(valor.target.value)}
          value={nombre}
        />
      </Form.Item>
      <Form.Item label="Cantidad: ">
        <InputNumber
          min={1}
          max={100000}
          onChange={onChangeCantidad}
          value={cantidad}
        />
      </Form.Item>
      <Form.Item label="Precio: ">
        <InputNumber
          min={1}
          max={100000}
          onChange={onChangePrecio}
          value={precio}
        />
      </Form.Item>
      <Form.Item label="Casa: ">
        <Input onChange={(valor) => setCasa(valor.target.value)} value={casa} />
      </Form.Item>
      <Form.Item label="Tipo: ">
        <Input onChange={(valor) => setTipo(valor.target.value)} value={tipo} />
      </Form.Item>
      <Form.Item label="Descripcion: ">
        <Input
          onChange={(valor) => setDescripcion(valor.target.value)}
          value={descripcion}
        />
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={(imagen) => onChange(imagen)}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {fileList.length < 1 && "+ Upload"}
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

export default InsertarProductos;
