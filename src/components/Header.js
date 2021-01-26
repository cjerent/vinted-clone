import React from "react";
import logo from "../assets/vinted_logo.png";
import HeaderNav from "./HeaderNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

const Header = () => {
  return (
    <>
      <Router>
        <header>
          <div className="header-container">
            <Link to="/">
              <img className="logo" src={logo} alt="vinted" />
            </Link>

            <div className="search-bar">
              <FontAwesomeIcon className="search-icon" icon="search" />
              <input
                className="search-bar"
                type="text"
                placeholder="Recherche des article"
              ></input>
            </div>

            <div className="header-button">
              <div>S'inscrire</div>
              <div>Se connecter</div>
              <div>Vends tes articles</div>
            </div>
          </div>
        </header>
        <div>
          <HeaderNav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Header;
