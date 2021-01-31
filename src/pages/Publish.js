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

  const removeImageUploaded = (event) => {
    setPreview("");
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
        history.push("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return authToken ? (
    <>
      <div className="publish-grey">
        <div className="publish-container">
          <div className="main-title">Vends ton article</div>
          <form onSubmit={handleSubmit}>
            <div className="section-container">
              <div className="file-upload-section">
                {preview ? (
                  <div className="image-preview">
                    {preview && <img src={preview} alt="preview" />}
                    <div
                      className="remove-image-cross"
                      onClick={removeImageUploaded}
                    >
                      X
                    </div>
                  </div>
                ) : (
                  <div>
                    <label for="file-upload" className="upload-button">
                      <span>+ Ajoute une photo</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleImageUpload}
                    ></input>
                  </div>
                )}
              </div>
            </div>
            <div className="section-container">
              <div className="text-input">
                <div>Titre</div>
                <input
                  type="text"
                  placeholder="ex: Chemise verte"
                  value={productTitle}
                  onChange={handleTitleChange}
                ></input>
              </div>
              <div className="text-input">
                <div>Décris ton article</div>
                <input
                  type="textarea"
                  placeholder="ex: Portée quelquefois, taille correctement"
                  value={productDescription}
                  onChange={handleDescriptionChange}
                ></input>
              </div>
            </div>
            <div className="section-container">
              <div className="text-input">
                <div>Marque</div>
                <input
                  type="text"
                  placeholder="ex: Nike"
                  value={productBrand}
                  onChange={handleBrandChange}
                ></input>
              </div>

              <div className="text-input">
                <div>Taille</div>
                <input
                  type="text"
                  placeholder="ex: S / 36 / 12 ans"
                  value={productSize}
                  onChange={handleSizeChange}
                ></input>
              </div>

              <div className="text-input">
                <div>Couleur</div>
                <input
                  type="text"
                  placeholder="ex: Vert turquoise"
                  value={productColour}
                  onChange={handleColourChange}
                ></input>
              </div>

              <div className="text-input">
                <div>Etat</div>
                <input
                  type="text"
                  placeholder="ex: Neuf jamais porté"
                  value={productCondition}
                  onChange={handleConditionChange}
                ></input>
              </div>

              <div className="text-input">
                <div>Lieu</div>
                <input
                  type="text"
                  placeholder="ex: Pointe-Noire"
                  value={productLocation}
                  onChange={handleLocationChange}
                ></input>
              </div>
            </div>
            <div className="section-container">
              <div className="last-text-input">
                <div>Prix</div>
                <div>
                  <input
                    className="price-input"
                    type="text"
                    placeholder="ex: 0,00 €"
                    value={productPrice}
                    onChange={handlePriceChange}
                  ></input>
                  <div className="publish-checkbox">
                    <input type="checkbox"></input>
                    <span>Je suis intéréssée par les échanges</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="publish-button">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
