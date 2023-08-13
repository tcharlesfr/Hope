// bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Image from "react-bootstrap/Image";

import api from "../../../utils/api";

import styles from "./PostDetails.module.css";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//hooks
import useFlashMessage from "../../../hooks/useFlashMessage";
import Navbar2 from "../../layout/Navbar";

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
      method: "patch",
      url: `/posts/schedule/${post._id}`,
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
    <>
      <Navbar2></Navbar2>
      <Container className={styles.container}>
        {post.name && (
          <Card >
            <div>
              {post.images.map((image, index) => (
                <Image
                  className={styles.post_images}
                  rounded
                  src={`${process.env.REACT_APP_API}/images/posts/${image}`}
                  alt={post.name}
                  key={index}
                />
              ))}
            </div>
            <Card.Body>
              <Card.Title>{post.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                {post.weight}kg
              </Card.Text>
              {token ? (
                <Button variant="primary" onClick={schedule}>
                  Entrar em contato
                </Button>
              ) : (
                <p>
                  Você precisa<Link to="/register" style={{ color: 'blue'}}>criar uma conta</Link>para
                  entrar em contato
                </p>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

export default PostDetails;
