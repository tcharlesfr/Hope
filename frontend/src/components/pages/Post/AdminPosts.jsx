import api from "../../../utils/api";

import { useState, useEffect } from "react";

import { Link, Navigate } from "react-router-dom";

import RoundedImage from "../../layout/RoundedImage";

import styles from "./Dashboard.module.css";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";
import Navbar2 from "../../layout/Navbar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Message from "../../layout/Message";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //chamar a api, enviando o token de autorização
  useEffect(() => {
    api.get("/posts/admin").then((response) => {
      setPosts(response.data.posts);
    });
  }, [token]);

  async function removePost(id) {
    let msgType = "success";

    // eslint-disable-next-line no-restricted-globals
    var resultado = confirm("Deseja excluir o item ?");
    if (resultado === true) {
      alert("a postagem foi excluída!");
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
    } else {
      alert("Você desistiu de excluir a postagem");
    }
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
      <Message></Message>
      <Container className={styles.postlist_container}>
        <div className={styles.postlist_header}>
          <h1>Todas postagens</h1>
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
                {!post.available ? (
                  <>
                    {/* <button
                // className={styles.edit}
                  onClick={() => {
                    Navigate(`/post/edit/${post._id}`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Editar
                </button> */}
                    <button
                      className={styles.conclude_btn}
                      onClick={() => {
                        concludeAdoption(post._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Aceitar
                    </button>
                  </>
                ) : (
                  <span>Postagem aceita </span>
                )}
                <button
                  onClick={() => {
                    removePost(post._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        {posts.length === 0 && <p>não há posts</p>}
      </Container>
    </section>
  );
}

export default MyPosts;
