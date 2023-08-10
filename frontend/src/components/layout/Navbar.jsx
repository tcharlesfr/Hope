import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/pata2.png";

import { useContext } from "react";

// contexto do usuario
import { Context } from "../../context/UserContext";

function Navbar() {
  //pega o contexto que tem o acesso
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="logo" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {/* se o usuario estiver logado e autenticadp aparece x opção e se não estiver aparece para logar ou registrar, o que faz o usuario estar logado ou não é o token,  com a função useAuth ele verifica e muda para true, assim provendo o contexto dos demais componentes, token fica armazenado no storage do navegaro, f12/aplicativo/armazenamentolocal*/}
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
