import api from "../../../utils/api";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import RoundedImage from "../../layout/RoundedImage";

import styles from "./Dashboard.module.css";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";
import Navbar2 from "../../layout/Navbar";
import Container from "react-bootstrap/esm/Container";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  //chamar a api, enviando o token de autorização
  useEffect(() => {
    api
      .get("/posts/myposts", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
      });
  }, [token]);

  async function removePost(id) {
    let msgType = "success";

    const data = await api
      .delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        //excluir do front
        //filtrando o post excluido dos demais
        //desta forma poupa recurso do backend
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeAdoption(id) {
    let msgType = "success";

    const data = await api
      .patch(`/posts/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <Navbar2></Navbar2>
      <Container className={styles.postlist_container}>
        <div className={styles.postlist_header}>
          <h1>Minhas postagens</h1>
          <Link to="/post/add">Criar postagem</Link>
        </div>
        {posts.length > 0 &&
          posts.map((post) => (
            <div className={styles.postlist_row} key={post._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/posts/${post.images[0]}`}
                alt={post.name}
                width="px75"
              />
              <span className="Bold">{post.name}</span>
              <div className={styles.actions}>
                {post.available ? (
                  <>
                    {/* {post.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(post._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )} */}
                    <Link to={`/post/edit/${post._id}`}>Editar</Link>
                    <button
                      className={styles.actions_red}
                      onClick={() => {
                        removePost(post._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Post já adotado</p>
                )}
              </div>
            </div>
          ))}
        {posts.length === 0 && <p>não há posts</p>}
      </Container>
    </section>
  );
}

export default MyPosts;
