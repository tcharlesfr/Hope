import api from "../../../utils/api";

import styles from "./AddPet.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";
import PetForm from "../../form/PetForm";

function AddPet() {
  const navigate = useNavigate();
  //pegar o token do local storage para fazer a adição
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  async function registerPet(pet) {
    let msgType = "success";

    const formData = new FormData();

    //pegar cada item do pet e jogar no formData, para ter a possibilidade de fazer upload de imagem, pre requesito passar pelo formdata e nao pelo body
    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          //vai jogando as imagens em 'images', formando um array, com isso construindo o objeto para er enviado para o backend
          formData.append("images", pet[key][i]);
        }
      } else {
        //caso n tenha imagem, fazer apenas o append, passando o nome da chave(key) e o valor(pet[key]), com este metodo ele acha o objeto dinamicamente
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post("pets/create", formData, {
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
    //enviando o usuario para area de seus pets caso n tenha erros
    if (msgType !== "error") {
      navigate("/pet/mypets");
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadestre o pet</h1>
        <p>Despois ele ficara disponivel para adoção</p>
      </div>
      {/* passando metodo registerPet para o filho e ele pode acessar por lá */}
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
}

export default AddPet;
