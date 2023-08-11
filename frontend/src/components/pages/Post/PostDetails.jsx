import api from "../../../utils/api";

import styles from "./PostDetails.module.css";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

function PostDetails() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/posts/${id}`).then((response) => {
      setPost(response.data.post);
    });
  }, [id]);

  async function schedule() {
    let msgType = "sucess";

    const data = await api({
        method:'patch',
        url:`/posts/schedule/${post._id}`,
        headers:{
            Authorization:`Bearer ${JSON.parse(token)}`
        }
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        msgType='error'
        return err.response.data
    })

    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {post.name && (
        <section className={styles.post_details_container}>
          <div className={styles.post_details_header}>
            <h1>{post.name}</h1>
            <p>Se tiver interesse, entre em contato para ajudar</p>
          </div>
          <div className={styles.post_images}>
            {post.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/posts/${image}`}
                alt={post.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso: </span>
            {post.weight}kg
          </p>
          <p>
            <span className="bold">Idade: </span>
            {post.age} anos
          </p>
          {token ? (
            <button onClick={schedule}>Entrar em contato</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              entrar em contato
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default PostDetails;
