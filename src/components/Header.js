import React from "react";
import logo from "../assets/vinted_logo.png";
import HeaderNav from "./HeaderNav";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  return (
    <>
      <header>
        <div className="header-container">
          <div onClick={() => history.push("/")}>
            <img className="logo" src={logo} alt="vinted" />
          </div>

          <div className="search-bar">
            <input
              className="search-bar"
              type="text"
              placeholder="Recherche des articles"
            ></input>
          </div>

          <div className="header-button">
            <div onClick={() => history.push("/signup")}>S'inscrire</div>

            <div>Se connecter</div>
            <div>Vends tes articles</div>
          </div>
        </div>
      </header>
      <HeaderNav />
    </>
  );
};

export default Header;
