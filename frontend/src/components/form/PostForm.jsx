import { useState } from "react";
import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PostForm({ handleSubmit, postData, btnText }) {
  const [post, setPost] = useState( postData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    //as imagens recebidas do filechange viram um array
    setPreview(Array.from(e.target.files));
    //pegar o post com imagens com spread por que são varias imagens
    setPost({ ...post, images: [...e.target.files] });
  }

  function handleChange(e) {
    // campo: [e.target.name] | valor: e.target.value
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function handleColor(e) {
    //acessar todas opeções do select: e.target.options | para selecinar a cor escolhida em forma de texto: [e.target.selectedIndex].text
    setPost({ ...post, color: e.target.options[e.target.selectedIndex].text });
  }

  function submit(e) {
    e.preventDefault();
    //passar evento/função por props, enviando o objeto para a função de adicionr e editar
    handleSubmit(post)
    // console.log(post);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_post_images}>
        {
          //ver se veio alguma coisa no preview, se vier imprime
          preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={post.name}
                  key={`${post.name}+${index}`}
                />
              ))
            : //se tiver imagens do post imprime se não entra na condição            
            post.images &&
              post.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/posts/${image}`}
                  alt={post.name}
                  key={`${post.name}+${index}`} //ex: dog1, dog2
                ></img>
              ))
        }
      </div>
      <Input
        text="Imagens do Post"
        type="file"
        name="imagens"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Título do Post"
        type="text"
        name="name"
        placeholder="Digite o título"
        handleOnChange={handleChange}
        value={post.name || ""}
      />
      <Input
        text="Descrição do Post"
        type="text"
        name="age"
        placeholder="Digite a descrição da"
        handleOnChange={handleChange}
        value={post.age || ""}
      />
      
      <Input
        text="Formas de ajudar"
        type="text"
        name="weight"
        placeholder="Digite as formas de ajuda"
        handleOnChange={handleChange}
        value={post.weight || ""}
      />
      {/* <Select
        name="color"
        text="teste"
        options={colors}
        handleOnChange={handleColor}
        value={post.color || ""}
      /> */}
      <input type="submit" value={btnText} />
    </form>
  );
}

export default PostForm;
