import React from "react";
import { useState, useEffect } from "react";
import coverImage from "../assets/cover.jpeg";
import tear from "../assets/tear-effect.svg";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import HeaderNav from "../components/HeaderNav";

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
          <HeaderNav />
          <div className="cover-section">
            <img className="cover-img" src={coverImage} alt="vinted" />
            <img className="cover-effect" src={tear} alt="effect" />
            <div className="promo-container">
              <div className="promo-box">
                <p>Prêt à faire du tri dans vos placards ?</p>
                <button>Commencer à vendre</button>
                <div>Découvrez comment ça marche</div>
              </div>
            </div>
          </div>

          <div className="cards-container">
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
