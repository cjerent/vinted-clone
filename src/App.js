import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

library.add(faSearch);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("auth_token") || null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleLogin = (token) => {
    Cookies.set("auth_token", token, { expires: 7 });
    setAuthToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setAuthToken(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-charlene.herokuapp.com/offers`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  });

  return (
    <>
      <Router>
        <Header
          authToken={authToken}
          handleLogout={handleLogout}
          setSearch={setSearch}
        />
        <Switch>
          <Route exact path="/signup">
            <SignUp handleLogin={handleLogin} />
          </Route>
          <Route exact path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/offer/:id">
            <Offer />
          </Route>
          <Route exact path="/publish">
            <Publish authToken={authToken} />
          </Route>
          <Route exact path="/">
            <Home data={data} isLoading={isLoading} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
