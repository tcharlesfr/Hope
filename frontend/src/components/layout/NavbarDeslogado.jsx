import api from "../../utils/api";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

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
  // const { authenticated, logout } = useContext(Context);

  //pegar o token para pegar os dados do usuario
  const [token] = useState(localStorage.getItem("token") || "");
  // const [user, setUser] = useState({});

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href='/'>
          <div className={styles.navbar_logo}>
            <img src={Logo} alt="logo" />
            {/* <span>Hope</span> */}
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto" >
            <>
              <Nav.Link style={{color: 'white'}} href="/login">Login</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/register">Cadastrar</Nav.Link>
            </>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
