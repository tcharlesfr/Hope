// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/logohope.png";

import { useContext } from "react";

// contexto do usuario
import { Context } from "../../context/UserContext";

function Navbar2() {
  //pega o contexto que tem o acesso
  const { authenticated, logout } = useContext(Context);

  return (
    <Navbar  bg="primary" data-bs-theme="dark" >
      
      <Container>
        
        
        <Navbar.Brand href="/">
          <div className={styles.navbar_logo}>
            <img src={Logo} alt="logo" />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {authenticated ? (
              <>
                <NavDropdown className={styles.navbar} title="Perfil" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/post/myposts">
                    Minhas Postagen
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
