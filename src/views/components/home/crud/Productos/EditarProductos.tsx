import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown, InputNumber } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EditarProductos = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const listaPreguntas = [] as any;

  const [datosMenu, setDatosMenu] = useState<any>([]);

  const [nombre,setNombre] = useState("");

  const [cantidad,setCantidad] = useState(0);

  const [precio,setPrecio] = useState(0);

  const [casa,setCasa] = useState("");

  const [tipo,setTipo] = useState("");

  const [fileList, setFileList] = useState<any>([]); 

  const [descripcion,setDescripcion] = useState("");

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  let menu = <Menu>{datosMenu}</Menu>;

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item key={index} onClick={(dato) => escribirInputs(dato.key)}>
          {parametro["nombre"]}
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
    await axios({
      method: "POST",
      url: "http://localhost:8080/editProducts",
      data: {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        casa: casa,
        tipo: tipo,
        foto: fileList
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    setCantidad(0);
    setCasa("");
    setFileList([]);
    setNombre("");
    setPrecio(0);
    setTipo("");
    setDescripcion("");
  }

  async function conseguirProductos() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/todosProductos",
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
    setNombre(lista["nombre"]);
    setCantidad(lista["cantidad"])
    setPrecio(lista["precio"]);
    setCasa(lista["casa"])
    setTipo(lista["tipo"])
    setDescripcion(lista["descripcion"])
    setFileList(lista["foto"])
  }
  function onChangeCantidad(value) {
    setCantidad(value);
  }
  function onChangePrecio(value) {
    setPrecio(value);
  }  
  useEffect(() => {
    conseguirProductos();
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
          Productos <DownOutlined />
        </Button>
      </Dropdown>
      <Form.Item label="Nombre: ">
        <Input onChange={(valor) => setNombre(valor.target.value)} value={nombre}/>
      </Form.Item>
      <Form.Item label="Cantidad: ">
        <InputNumber min={1} max={100000} onChange={onChangeCantidad} value={cantidad}/>
      </Form.Item>
      <Form.Item label="Precio: ">
        <InputNumber min={1} max={100000} onChange={onChangePrecio} value={precio}/>
      </Form.Item>
      <Form.Item label="Casa: ">
        <Input onChange={(valor) => setCasa(valor.target.value)} value={casa}/>
      </Form.Item>
      <Form.Item label="Tipo: ">
        <Input onChange={(valor) => setTipo(valor.target.value)} value={tipo}/>
      </Form.Item>
      <Form.Item label="Decripcion: ">
        <Input onChange={(valor) => setDescripcion(valor.target.value)} value={descripcion}/>
      </Form.Item>
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
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

export default EditarProductos;
