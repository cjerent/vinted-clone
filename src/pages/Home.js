import React from "react";
import { useState, useEffect } from "react";
import coverImage from "../assets/cover.jpeg";
import tear from "../assets/tear-effect.svg";
import axios from "axios";
import OfferCard from "../components/OfferCard";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data.offers);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <>
          <div className="cover-section">
            <img className="cover" src={coverImage} alt="vinted" />
            <img className="cover-effect" src={tear} alt="effect" />
            <div className="promo-container">
              <div className="promo-box">
                <h1>Prêt à faire du tri dans vos placards ?</h1>
                <button>Commencer à vendre</button>
                <div>Découvrez comment ça marche</div>
              </div>
            </div>
          </div>
          <div className="offers-container">
            {data.map((offer) => (
              <OfferCard offer={offer} key={offer._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
