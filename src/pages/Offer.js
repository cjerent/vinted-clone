import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import avatarPlaceholder from "../assets/avatar_placeholder.png";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-charlene.herokuapp.com/offer/${id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <section className="offer-section">
          <div className="offer-container">
            <div>
              <img
                className="offer-image"
                src={data.product_image.secure_url}
                alt={data.product_name}
              />
            </div>

            <div className="offer-info">
              <div>{data.product_price} €</div>
              <div>
                {data.product_details.map((elem, index) => {
                  const keys = Object.keys(elem);
                  return (
                    <div key={index} className="offer-description">
                      <span>{keys[0]}</span>
                      <span>{elem[keys[0]]}</span>
                    </div>
                  );
                })}
              </div>

              <div className="offer-info-bottom">
                <div>{data.product_name}</div>
                <div>{data.product_description}</div>
                <div>
                  {data.owner.account.avatar ? (
                    <span>
                      <img
                        className="offer-avatar"
                        src={data.owner.account.avatar.secure_url}
                        alt={data.owner.account.username}
                      />
                    </span>
                  ) : (
                    <span>
                      <img
                        className="avatar"
                        src={avatarPlaceholder}
                        alt="no-avatar"
                      />
                    </span>
                  )}

                  <span>{data.owner.account.username}</span>
                </div>
              </div>
              <button>Acheter</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Offer;
