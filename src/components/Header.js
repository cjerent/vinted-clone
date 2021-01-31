import React from "react";
import logo from "../assets/vinted_logo.png";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PriceRange from "./PriceRange";

const Header = (props) => {
  const {
    handleLogout,
    authToken,
    setFetchRangeValues,
    sortPrice,
    setSortPrice,
    setSearch,
  } = props;

  let history = useHistory();

  return (
    <>
      <header>
        <div className="header-container">
          <div onClick={() => history.push("/")}>
            <img className="logo" src={logo} alt="vinted" />
          </div>
          <div className="search-bar">
            <FontAwesomeIcon className="search-icon" icon="search" />
            <input
              className="search-bar"
              type="text"
              placeholder="Recherche des articles"
              onChange={(event) => setSearch(event.target.value)}
            ></input>
          </div>
          <div>
            <div
              style={{
                marginTop: 25,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 10 }}>Trier par prix : </span>
              <span>
                <input type="checkbox" checked={sortPrice} name="price" />
                <div
                  className="wrapper"
                  onClick={() => {
                    setSortPrice(!sortPrice);
                  }}
                >
                  <div>
                    <span>{sortPrice ? "⇣" : "⇡"}</span>
                  </div>
                </div>
              </span>
              <span style={{ marginRight: 10 }}>Prix entre : </span>
              <PriceRange setFetchRangeValues={setFetchRangeValues} />
            </div>
          </div>

          <div className="header-button">
            {authToken ? (
              <>
                <div
                  onClick={() => {
                    handleLogout();
                  }}
                  className="logout-button"
                >
                  Se déconnecter
                </div>
              </>
            ) : (
              <>
                <div onClick={() => history.push("/signup")}>S'inscrire</div>

                <div onClick={() => history.push("/login")}>Se connecter</div>
              </>
            )}
            <div
              className="blue-button"
              onClick={() => history.push("/publish")}
            >
              Vends tes articles
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
