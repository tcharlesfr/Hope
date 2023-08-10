import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    //pegar todos os pets e setar na variavel
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
      console.log(pets);
    });
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor dele</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso: </span>{pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Não a pets disponiveis</p>}
      </div>
    </section>
  );
}

export default Home;
