import { useState } from "react";
import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState( petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    //as imagens recebidas do filechange viram um array
    setPreview(Array.from(e.target.files));
    //pegar o pet com imagens com spread por que são varias imagens
    setPet({ ...pet, images: [...e.target.files] });
  }

  function handleChange(e) {
    // campo: [e.target.name] | valor: e.target.value
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleColor(e) {
    //acessar todas opeções do select: e.target.options | para selecinar a cor escolhida em forma de texto: [e.target.selectedIndex].text
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  }

  function submit(e) {
    e.preventDefault();
    //passar evento/função por props, enviando o objeto para a função de adicionr e editar
    handleSubmit(pet)
    // console.log(pet);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {
          //ver se veio alguma coisa no preview, se vier imprime
          preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={pet.name}
                  key={`${pet.name}+${index}`}
                />
              ))
            : //se tiver imagens do pet imprime se não entra na condição            
            pet.images &&
              pet.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                  key={`${pet.name}+${index}`} //ex: dog1, dog2
                ></img>
              ))
        }
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="imagens"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o pesp"
        handleOnChange={handleChange}
        value={pet.weight || ""}
      />
      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default PetForm;
