import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";

library.add(faSearch);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("auth_token") || null);

  const handleLogin = (token) => {
    Cookies.set("auth_token", token, { expires: 7 });
    setAuthToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setAuthToken(null);
  };
  return (
    <>
      <Router>
        <Header authToken={authToken} handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/signup">
            <SignUp handleLogin={handleLogin} />
          </Route>
          <Route exact path="/offer/:id">
            <Offer />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
