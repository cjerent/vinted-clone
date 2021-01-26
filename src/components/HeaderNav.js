import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const HeaderNav = () => {
  return (
    <Router>
      <div className="nav-container">
        <nav className="header-nav">
          <ul>
            <li>
              <Link className="grey" to="/female">
                Femmes
              </Link>
            </li>
            <li>
              <Link className="grey" to="/male">
                Hommes
              </Link>
            </li>
            <li>
              <Link className="grey" to="/child">
                Enfants
              </Link>
            </li>
            <li>
              <Link className="grey" to="/house">
                Maison
              </Link>
            </li>
            <li>
              <Link className="grey" to="/aboutus">
                A propos
              </Link>
            </li>
            <li>
              <Link className="grey" to="/platform">
                Notre plateforme
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default HeaderNav;
