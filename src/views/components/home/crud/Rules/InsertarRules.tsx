import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message ,Select} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./style.css";
import axios from "axios";
import {FileListin} from "../../../interface/interfarceFileList";
type SizeType = Parameters<typeof Form>[0]["size"];

const InsertarRules = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [usuario, setUsuario] = useState("");

//   const [rol, setRol] = useState(0);

  const [foto, setFoto] =useState([]);

  const [rule, setRule] = useState("");

  const [nombreUsuario, setNombresUsuario] : any[]= useState([]);

  const [comentario,setComentario] = useState("");
  const onChange = ({ fileList: newFileList }) => {
    var imagen = newFileList[0];
    console.log(imagen);
    // var imagen2 = imagen.replace("{}","");
    // var imagen2= JSON.stringify(imagen);
    // console.log(imagen2)

    
    //  var imageJson = JSON.parse(imagen);
    // console.log(imageJson);
    // Object.keys(subjects).map((item,i)=>{
    //     console.log(subjects[i].thumbUrl);
    // })
//    imagen.map((e:any)=>{
//         console.log(e);
//    })
    // var arrayList : any[]=[];
    // arrayList.push(imagen);
    //   console.log(arrayList[0]);
    setFoto(newFileList);
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
    imgWindow?.document.write(image.outerHTML);
  };
  const { Option } = Select;
  useEffect(()=>{
       var arrayPrueba :any[]= [];
    axios({
        method: "GET",
        url : "http://localhost:8080/todos"
    }).then((e:any)=>{
        e.data.map((y:any)=>{
            var usuario = y.usuario;
            var option = <Option value={usuario}>{usuario}</Option>;
            arrayPrueba.push(option)
        })
        setNombresUsuario(arrayPrueba);
    })
  },[])
  function GuardarRule() {
    axios({
      method: "POST",
      url: "http://localhost:8080/registrarRules",
      data: {
        usuario:usuario,
        // avatar: avatar,
        // rol: rol,
        rule: rule,
        foto: foto,
        comentarios:comentario
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    });

    setUsuario("");
    setFoto([]);
    setRule("");
    setComentario(""); 
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
      <Form.Item label="Usuario: ">
      <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    onChange={(e:any)=>{
        setUsuario(e.value)}}
    >
        {nombreUsuario}
  </Select>
      </Form.Item>
      <Form.Item label="Avatar: ">
      <div className="imageUplo">
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={foto}
            onChange={onChange}
            onPreview={onPreview}
            id="imagenUplo"
          >
            {foto.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
      </Form.Item>
      <Form.Item label="Rule:">
        <Input onChange={(valor) => setRule(valor.target.value)} />
      </Form.Item>
      <Form.Item label="Comentario:">
        <Input onChange={(valor) => setComentario(valor.target.value)} />
      </Form.Item>
      {/* <Form.Item label="Respuesta 1:">
        <Input onChange={(valor) => setRespuesta1(valor.target.value)} />
      </Form.Item> */}
    
      <div id="guardar">
        <Button
          onClick={() => {
            GuardarRule();
          }}
        >
          Crear
        </Button>
      </div>
    </Form>
  );
};

export default InsertarRules;
function subjects(subjects: any) {
    throw new Error("Function not implemented.");
}

