import bus from "../utils/bus";

//funçao que dispara um evento, utilizada em diversos locais,
//recebendo apenas dois argumentos, a msg e o tipo, podendo também passar erros
export default function useFlashMessage() {

  //capta o evento chado flash e emit a mensagem
  function setFlashMessage(msg, type) {
    bus.emit("flash", {
      message: msg,
      type: type,
    });
  }
  return { setFlashMessage };
}

//sempre que utilizado gera um evento, tento um componente
//que vai fazer a captação do sinal, quando o evento for emitido
//o componente aparece
