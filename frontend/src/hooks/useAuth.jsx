//api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  //disparador de mensagem
  const { setFlashMessage } = useFlashMessage();
  //autenticado ou não, começa com false
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  //pegar o item do local storage
  //verificar se o token veio
  useEffect(() => {
    const token = localStorage.getItem("token");

    //sempre que tiver um requisição com a api já manda o token
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    //mensagens de sucesso e tipo
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "sucess";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data; //response(data)
      });
      await authUser(data);
    } catch (error) {
      //mensagens de sucesso e tipo
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }
  //recebe dados do registro ou de login com sucesso
  
  async function login(user) {
    //mandar mensagem de logout
    let msgText = "Login realizado com sucesso";
    let msgType = "success";
    //tratanto erro de login
    try {
      //pegar o dados e logar pelo token, enviar o usuaro(senha e email)
      const data = await api.post('users/login', user).then((response) => {
        return response.data
      })
      //se deu certo recebe o token, 
      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }
    setFlashMessage(msgText, msgType);

  }

  async function authUser(data) {
    setAuthenticated(true);
    //quardar as informações do storage
    localStorage.setItem("token", JSON.stringify(data.token));

    //mudar a pagina do usuario para home
    navigate("/");
  }

  function logout() {
    //mandar mensagem de logout
    const msgText = "Logout realizado com sucesso";
    const msgType = "sucess";

    //colocar como desautenticado
    setAuthenticated(false);
    //remover autenticação do storage
    localStorage.removeItem("token");
    //tirar da api o token
    api.defaults.headers.Authorization = undefined;
    //direcionar par a home
    navigate("/");

    setFlashMessage(msgText, msgType);
  }

  return { authenticated, register, logout, login };
}
