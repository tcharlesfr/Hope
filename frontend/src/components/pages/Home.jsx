import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //pegar todos os posts e setar na variavel
    api.get("/posts").then((response) => {
      setPosts(response.data.posts);
      console.log(posts);
    });
  }, []);

  return (
    <section>
      <div className={styles.post_home_header}>
        <h1>Conheça as ações solidarias</h1>
        <p>Veja os detalhes de cada uma e participe</p>
      </div>
     
      <div className={styles.post_container}>
        {posts.length > 0 &&
          posts.map((post) => (
            <Card style={{ width: "18rem" }}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/posts/${post.images[0]})`,
                }}
                className={styles.post_card_image}
              ></div>
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">
                  {post.available ? (
                    <Link to={`post/${post._id}`}>mais detalhes</Link>
                  ) : (
                    <p>Indisponivel</p>
                  )}
                </Button>
              </Card.Body>
            </Card>
            // <div className={styles.post_card}>
            //   <div
            //     style={{
            //       backgroundImage: `url(${process.env.REACT_APP_API}/images/posts/${post.images[0]})`,
            //     }}
            //     className={styles.post_card_image}
            //   ></div>
            //   <h3>{post.name}</h3>
            //   <p>
            //     <span className="bold">Peso: </span>{post.weight}kg
            //   </p>
            //   {post.available ? (
            //     <Link to={`post/${post._id}`}>mais detalhes</Link>
            //   ) : (
            //     <p className={styles.adopted_text}>Indisponivel</p>
            //   )}

            // </div>
          ))}
        {posts.length === 0 && <p>Não a postagens disponiveis</p>}
      </div>
    </section>
  );
}

export default Home;
