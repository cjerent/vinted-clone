import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <div>
          <img src={data.product_image.secure_url} alt={data.product_name} />
          <div>
            <div>{data.product_price}</div>
            <div>{data.product_details[0]["MARQUE"]}</div>
            <div>{data.product_name}</div>
            <div>{data.product_description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offer;
