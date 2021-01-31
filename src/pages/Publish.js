import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

const Publish = (props) => {
  const { authToken } = props;
  let history = useHistory();
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productColour, setProductColour] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productImage, setProductImage] = useState({});
  const [preview, setPreview] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setProductTitle(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setProductDescription(value);
  };
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setProductPrice(value);
  };
  const handleBrandChange = (event) => {
    const value = event.target.value;
    setProductBrand(value);
  };
  const handleSizeChange = (event) => {
    const value = event.target.value;
    setProductSize(value);
  };
  const handleColourChange = (event) => {
    const value = event.target.value;
    setProductColour(value);
  };
  const handleConditionChange = (event) => {
    const value = event.target.value;
    setProductCondition(value);
  };
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setProductLocation(value);
  };
  const handleImageUpload = (event) => {
    setProductImage(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", productTitle);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("brand", productBrand);
      formData.append("size", productSize);
      formData.append("color", productColour);
      formData.append("condition", productCondition);
      formData.append("city", productLocation);
      formData.append("picture", productImage);

      const response = await axios.post(
        "https://vinted-charlene.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return authToken ? (
    <>
      <div>Vends ton article</div>
      <form onSubmit={handleSubmit}>
        {preview && <img src={preview} alt="preview" />}
        <div>
          <input type="file" onChange={handleImageUpload}></input>
        </div>
        <div>
          <div>Titre</div>
          <input
            type="text"
            placeholder="ex:Chemise verte"
            value={productTitle}
            onChange={handleTitleChange}
          ></input>
          <div>Décris ton article</div>
          <input
            type="text"
            placeholder="ex:Portée quelquefois, taille correctement"
            value={productDescription}
            onChange={handleDescriptionChange}
          ></input>
        </div>
        <div>
          <div>Marque</div>
          <input
            type="text"
            placeholder="ex: Nike"
            value={productBrand}
            onChange={handleBrandChange}
          ></input>
          <div>Taille</div>
          <input
            type="text"
            placeholder="ex: S / 36 / 12 ans"
            value={productSize}
            onChange={handleSizeChange}
          ></input>
          <div>Couleur</div>
          <input
            type="text"
            placeholder="ex: Vert turquoise"
            value={productColour}
            onChange={handleColourChange}
          ></input>
          <div>Etat</div>
          <input
            type="text"
            placeholder="ex: Neuf jamais porté"
            value={productCondition}
            onChange={handleConditionChange}
          ></input>
          <div>Lieu</div>
          <input
            type="text"
            placeholder="ex: Pointe-Noire"
            value={productLocation}
            onChange={handleLocationChange}
          ></input>
        </div>
        <div>
          <div>Prix</div>
          <input
            type="text"
            placeholder="ex: 0,00 €"
            value={productPrice}
            onChange={handlePriceChange}
          ></input>
          <div>
            <input type="checkbox"></input>
            <span>Je suis intéréssée par les échanges</span>
          </div>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
