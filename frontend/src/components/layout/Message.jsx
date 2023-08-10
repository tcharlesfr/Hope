import { useState, useEffect } from "react";
import bus from "../../utils/bus";

import styles from "./Message.module.css";

function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState(""); //mensagem dinamica
  const [type, setType] = useState("");

  //monitora as mudanças da aplicação e carrega quando for nessario
  //com este metodo a pagina não fica carregando infinitamente
  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      //seta true para aparecer e passa o nome e tipo da mensagem
      setVisibility(true);
      setMessage(message);
      setType(type);

      //função do javascript para desaparecer a mensagem,
      //depois do tempo determinado ela troca de true para false
      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  //div onde mostra a mensagem, com classe de stilos,
  //com tipo de mensagem também, onde muda com o css
  //variavel dinamica
  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
}

export default Message;
