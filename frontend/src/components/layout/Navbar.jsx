import api from "../../utils/api";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand href="/">
          <div className={styles.navbar_logo}>
            <img src={Logo} alt="logo" />
          </div>
        </Navbar.Brand>

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            {authenticated ? (
              <>
                <DropdownButton
                  drop="start"
                  id="dropdown-basic-button"
                  title={user.name || "perfil"}
                >
                  <Dropdown.Item href="/post/myposts">
                    <div className={styles.navbar_logo_user}>
                      <img
                        src={`${process.env.REACT_APP_API}/images/users/${user.image}`}
                        alt={"logo"}
                      />
                    </div>
                  </Dropdown.Item>
                  {user.role === "admin" && (
                    <Dropdown.Item href="/admin/posts">Gerência</Dropdown.Item>
                  )}

                  <Dropdown.Item href="/post/myposts">
                    Minhas Postagen
                  </Dropdown.Item>
                  <Dropdown.Item href="/post/myadoptions">
                    Meus contatos
                  </Dropdown.Item>
                  <Dropdown.Item href="/user/profile">
                    Editar Perfil
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                </DropdownButton>
              </>
            ) : (
              <>
                <Nav.Link style={{color: 'white'}} href="/login">Login</Nav.Link>
                <Nav.Link style={{color: 'white'}} href="/register">Cadastrar</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
