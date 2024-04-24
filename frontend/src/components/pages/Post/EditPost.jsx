import api from '../../../utils/api'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './AddPost.module.css'

import PostForm from '../../form/PostForm';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';
import Navbar2 from '../../layout/Navbar';
import Message from '../../layout/Message';

function EditPost() {
    const [post, setPost] = useState({})
    //pegando o token no storage
    const [token] = useState(localStorage.getItem('token') || '')
    //pegar o id dos parametros da rota "/post/edit/:id"
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        //rota get dinamica que busca o post pelo id, enviando a autorização
        //e depois colocando o post na variavel
        api.get(`/posts/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPost(response.data.post)
        })
    }, [token, id])

    async function updatePost(post){
        let msgType = 'sucess'

        const formData = new FormData()

        //preencher o formdata com as chaves do objeto, com as modificações ou os dados que ja estão
        await Object.keys(post).forEach((key) => {
            if(key === 'images'){
                //loop para preencher o array de imagens do post
                for( let i = 0; i < post[key].length; i++){
                    //destino das imagens e as imagens
                    formData.append('images', post[key][i])
                }
            } else {
                formData.append(key, post[key])
            }
        })

        //requisição patch, passando os dados e a autorização
        const data = await api.patch(`posts/${post._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
      <section>
        <Navbar2></Navbar2>
        <Message></Message>
        <div className={styles.addpost_header}> 
            <h1>Editar Postagem: {post.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
        </div>
        {//
        post.name && (
            <PostForm postData={post} handleSubmit={updatePost} btnText="Atualizar"  ></PostForm>
        )}
      </section>
    );
  }
  
  export default EditPost;
  