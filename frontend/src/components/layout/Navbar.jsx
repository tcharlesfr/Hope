import api from "../../utils/api";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/logobranco.png";
// import LogoUser from "../../assets/img/pessoa.png";

import { useContext } from "react";
import { useState, useEffect } from "react";

// contexto do usuario
import { Context } from "../../context/UserContext";

function Navbar2() {
  //pega o contexto que tem o acesso
  const { authenticated, logout } = useContext(Context);

  // pegar o token para pegar os dados do usuario
  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});

  useEffect(() => {
    //checar o usuario
    token &&
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

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <div className={styles.navbar_logo}>
            <img src={Logo} alt="logo" />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            {authenticated ? (
              <>
                <div className={styles.navbar_logo_user}>
                  <img
                    src={`${process.env.REACT_APP_API}/images/users/${user.image}`}
                    alt={"logo"}
                  />
                </div>
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/post/myposts">
                    Minhas Postagen
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/post/myadoptions">
                    Meus contatos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/profile">
                    Editar Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Cadastrar</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
