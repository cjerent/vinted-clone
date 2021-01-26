import React from "react";
import { Link } from "react-router-dom";
const OfferCard = (props) => {
  const { offer } = props;

  const username = offer.owner.account.username;
  const price = offer.product_price;
  const size = offer.product_details[1]["TAILLE"];
  const brand = offer.product_details[0]["MARQUE"];
  const offerImage = offer.product_image.secure_url;
  const avatar = offer.owner.account.avatar.secure_url;
  return (
    <div>
      <div className="offerCard">
        <div className="offer-username">
          <img className="avatar" src={avatar} alt={username} />
          <span>{username}</span>
        </div>
        <Link to={`/offer/${offer._id}`}>
          <img
            className="product-image"
            src={offerImage}
            alt={offer.product_name}
          />
        </Link>
        <div className="offer-info">
          <div> {price} €</div>
          <div>{size}</div>
          <div>{brand}</div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
