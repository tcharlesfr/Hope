import api from '../../../utils/api'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

function EditPet() {
    const [pet, setPet] = useState({})
    //pegando o token no storage
    const [token] = useState(localStorage.getItem('token') || '')
    //pegar o id dos parametros da rota "/pet/edit/:id"
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        //rota get dinamica que busca o pet pelo id, enviando a autorização
        //e depois colocando o pet na variavel
        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPet(response.data.pet)
        })
    }, [token, id])

    async function updatePet(pet){
        let msgType = 'sucess'

        const formData = new FormData()

        //preencher o formdata com as chaves do objeto, com as modificações ou os dados que ja estão
        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                //loop para preencher o array de imagens do pet
                for( let i = 0; i < pet[key].length; i++){
                    //destino das imagens e as imagens
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        //requisição patch, passando os dados e a autorização
        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.dataz
        })

        setFlashMessage(data.message, msgType)
    }

    return (
      <section>
        <div className={styles.addpet_header}> 
            <h1>Eitando o Pet: {pet.name}</h1>
            <p>Depois da adição os dados serão atualizados no sistema</p>
        </div>
        {//
        pet.name && (
            <PetForm petData={pet} handleSubmit={updatePet} btnText="Atualizar"  ></PetForm>
        )}
      </section>
    );
  }
  
  export default EditPet;
  