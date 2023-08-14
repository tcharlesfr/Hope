import api from "../../../utils/api";

import styles from "./AddPost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";
import PostForm from "../../form/PostForm";

import Navbar from '../../layout/Navbar'
import Message from '../../layout/Message'

function AddPost() {
  const navigate = useNavigate();
  //pegar o token do local storage para fazer a adição
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  async function registerPost(post) {
    let msgType = "success";

    const formData = new FormData();

    //pegar cada item do post e jogar no formData, para ter a possibilidade de fazer upload de imagem, pre requesito passar pelo formdata e nao pelo body
    await Object.keys(post).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < post[key].length; i++) {
          //vai jogando as imagens em 'images', formando um array, com isso construindo o objeto para er enviado para o backend
          formData.append("images", post[key][i]);
        }
      } else {
        //caso n tenha imagem, fazer apenas o append, passando o nome da chave(key) e o valor(post[key]), com este metodo ele acha o objeto dinamicamente
        formData.append(key, post[key]);
      }
    });

    const data = await api
      .post("posts/create", formData, {
        //passando a autorização pelo cabeçalho
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    //enviando o usuario para area de seus posts caso n tenha erros
    if (msgType !== "error") {
      navigate("/post/myposts");
    }
  }

  return (
    <section className={styles.addpost_header}>
      <Navbar></Navbar>
      <Message></Message>
      <div>
        <h1>Cadastre uma ação social</h1>
        <p>Despois ela ficara disponivel para todos participarem</p>
      </div>
      {/* passando metodo registerPost para o filho e ele pode acessar por lá */}
      <PostForm handleSubmit={registerPost} btnText="Cadastrar Post" />
    </section>
  );
}

export default AddPost;
