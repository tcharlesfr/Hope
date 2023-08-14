import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

import RoundedImage from "../../layout/RoundedImage";
import Navbar2 from "../../layout/Navbar";
import Message from "../../layout/Message";
import Container from "react-bootstrap/esm/Container";

function MyAdoptions() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/posts/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
      });
  }, [token]);

  return (
    <section>
      <Navbar2></Navbar2>
      <Message></Message>
      <Container className={styles.postlist_container}>
        {posts.length > 0 &&
          posts.map((post) => (
            <div className={styles.postlist_row} key={post._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/posts/${post.images[0]}`}
                alt={post.name}
                width="px75"
              />
              <div>
                <h5 className="Bold">{post.name}</h5>
                <p className="bold">Fale com: {post.user.name} <br></br>Ligue para: {post.user.phone}</p>
                <p className="bold"></p>
              </div>
              {/* <div className={styles.actions}>
                {post.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div> */}
            </div>
          ))}
        {posts.length === 0 && <p>Ainda não há ações</p>}
      </Container>
    </section>
  );
}

export default MyAdoptions;
