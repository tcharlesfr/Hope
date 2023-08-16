//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Carrossel from "../layout/Carrossel";
import Navbar from "../layout/Navbar";
import Message from "../layout/Message";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //pegar todos os posts e setar na variavel
    api.get("/posts").then((response) => {
      setPosts(response.data.posts);
    });
  }, []); //apagar aqui caso teha erro

  return (
    <>
      <Navbar></Navbar>
      <Message></Message>
      <section>
        <Carrossel className={styles.carrossel}></Carrossel>
        <Container>
          <div className={styles.header}>
            <h3>Conheça as ações solidarias</h3>
            <p>Veja os detalhes de cada uma e participe</p>
          </div>
          <Row>
            <Col>
              <div className={styles.post_container}>
                {posts.length > 0 &&
                  posts.map((post) => (
                    <Card
                      key={post._id}
                      style={{ width: "19rem", margin: "0.5em" }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${process.env.REACT_APP_API}/images/posts/${post.images[0]})`,
                        }}
                        className={styles.post_card_image}
                      ></div>
                      <Card.Body>
                        <Card.Title>{post.name}</Card.Title>
                        <Card.Text className={styles.description}>
                          {post.age}
                        </Card.Text>
                        <Button variant="primary" style={{ color: "white" }}>
                          {post.available ? (
                            <Link to={`post/${post._id}`}>mais detalhes</Link>
                          ) : (
                            <p>Indisponivel</p>
                          )}
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                {posts.length === 0 && <p>Não a postagens disponiveis</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
