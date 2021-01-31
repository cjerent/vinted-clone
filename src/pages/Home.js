import React from "react";
import coverImage from "../assets/cover.jpeg";
import tear from "../assets/tear-effect.svg";
import OfferCard from "../components/OfferCard";
import HeaderNav from "../components/HeaderNav";
import IsLoading from "../components/IsLoading";

const Home = (props) => {
  const { data, isLoading } = props;
  return (
    <>
      {isLoading ? (
        <IsLoading />
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
            {data.offers &&
              data.offers.map((offer, index) => {
                return <OfferCard data={offer} key={index} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
