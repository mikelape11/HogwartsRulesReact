import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Menu, Dropdown, Select } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
type SizeType = Parameters<typeof Form>[0]["size"];

const EditarRules = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const listaPreguntas = [] as any;

  //   const [rol, setRol] = useState(0);

  const [fileList, setFileList] = useState<any>([]);

  const [rule, setRule] = useState("");

  const [id, setId] = useState("");

  const [nombreUsuario, setNombresUsuario]: any[] = useState([]);

  const [thumbUrl, setThumbUrl] = useState("");

  const [datosMenu, setDatosMenu] = useState<any>([]);
  let menu = <Menu>{datosMenu}</Menu>;

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  async function EditarRule() {
    await axios({
      method: "POST",
      url: "http://localhost:8080/editarRules",
      data: {
        _id: id,
        rule: rule,
        foto: fileList
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    setFileList([]);
    setRule("");
  }
  async function conseguirRules() {
    let lista = [] as any;
    await axios({
      method: "GET",
      url: "http://localhost:8080/todosRules",
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((response: any) => {
      listaPreguntas.push(response.data);
      lista.push(response.data);
    });
    hacerMenu(lista);
  }

  function hacerMenu(listaPre) {
    var menus: any[] = [];
    listaPre[0].map((parametro, index) => {
      menus.push(
        <Menu.Item key={index} onClick={(dato) => escribirInputs(dato.key)}>
          {parametro["rule"]}
        </Menu.Item>
      );
    });

    setDatosMenu(menus);
    menu = <Menu>{menus}</Menu>;
  }
  function escribirInputs(numero) {
    var lista = listaPreguntas[0][numero];
    setId(lista["_id"]);
    setFileList(lista["foto"]);
    setRule(lista["rule"]);
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
  useEffect(() => {
    conseguirRules();
  }, [])

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
          Rules <DownOutlined />
        </Button>
      </Dropdown>
      <Form.Item label="Foto: ">
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
      </Form.Item>
      <Form.Item label="Rule:">
        <Input onChange={(valor) => setRule(valor.target.value)} value={rule} />
      </Form.Item>

      {/* <Form.Item label="Respuesta 1:">
        <Input onChange={(valor) => setRespuesta1(valor.target.value)} />
      </Form.Item> */}

      <div id="guardar">
        <Button
          onClick={() => {
            EditarRule();
          }}
        >
          Editar
        </Button>
      </div>
    </Form>
  );
};

export default EditarRules;

