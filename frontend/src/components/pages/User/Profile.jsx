//importar api para utilizar as conexoes
import api from "../../../utils/api";
import { useState, useEffect } from "react";

import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";

import useFlashMessage from "../../../hooks/useFlashMessage";
import RoundedImage from "../../layout/RoundedImage";


function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState()
  //pegar o token com informações do storage
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    //checar o usuario
    api
      .get("/users/checkuser", {
        headers: {
          //garantindo que o token vai ser enviado da forma correta
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function onFileChange(e) {
    //mudar o preview, quando o usuario adiciona a primeira imagem
    //ou quando o usuario muda de imagem
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] }); //pegar o objeto atual e adicionar
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value }); //pegar o objeto atual e adicionar
  }

  //função gerada depois de o usuario preencher o formulario
  async function handleSubmit(e) {
    //previnir que o formulario seja submetido quando submeter o envio
    e.preventDefault();

    let msgType = 'success'

    const formData = new FormData();
    //pegar as chaves de acesso do usuario, preechidos no state
    //fazer um transferencia para cada key que tiver preenchida, com isso dando um append
    await Object.keys(user).forEach((key) =>
      formData.append(key, user[key])
    );
    //chamada da api com o id do usuario, enviando o formdata, como se fosse o body
    //passando tmb os heareds om token,
    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        //informando ao express que este forulario pode conter imagens
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    //resposta
    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {/* se tiver alguma imagem ou preview imprime 
            criar um url baseado no objeto da imagem, se o usuario trocou a imagem se tem um preview
            se não acessa a api
        */}
        
        {(user.image || preview) && (          
          <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className={formStyles.form_container}
      >
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}

export default Profile;
