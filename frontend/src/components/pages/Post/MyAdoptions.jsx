import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

import RoundedImage from "../../layout/RoundedImage";

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
      <div className={styles.postlist_container}>
        {posts.length > 0 &&
          posts.map((post) => (
            <div className={styles.postlist_row} key={post._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/posts/${post.images[0]}`}
                alt={post.name}
                width="px75"
              />
              <span className="Bold">{post.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para: </span>
                  {post.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com: </span>
                  {post.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {post.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}
        {posts.length === 0 && <p>Ainda não há adoções de Posts</p>}
      </div>
    </section>
  );
}

export default MyAdoptions;
