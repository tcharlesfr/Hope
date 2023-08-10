import styles from "./Container.module.css";

function Container({children}) { //children para exibir o conteudo dentro da tag
  return <main className={styles.container}>{children}</main>;
}

export default Container;
