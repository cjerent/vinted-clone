import React from "react";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
const OfferCard = (props) => {
  const { data } = props;

  const username = data.owner.account.username;
  const price = data.product_price;
  const offerImage = data.product_image.secure_url;
  const avatar = data.owner.account.avatar;

  return (
    <div className="cards">
      <div className="card-username">
        {avatar ? (
          <img
            className="avatar"
            src={data.owner.account.avatar.secure_url}
            alt={username}
          />
        ) : (
          <img className="avatar" src={avatarPlaceholder} alt="no-avatar" />
        )}

        <span>{username}</span>
      </div>
      <Link to={`/offer/${data._id}`}>
        <img className="card-image" src={offerImage} alt={data.product_name} />
      </Link>
      <div className="card-info">
        <div> {price} €</div>
        <div>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <div key={index}>
                <div>{elem[keys[1]].toUpperCase()}</div>
              </div>
            );
          })}
        </div>
        <div>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <div key={index} className="offer-description">
                <div>{elem[keys[0]].toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
