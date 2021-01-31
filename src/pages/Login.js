import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import IsLoading from "../components/IsLoading";

const Login = (props) => {
  const { handleLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      console.log(email, password);
      const response = await axios.post(
        "https://vinted-charlene.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        handleLogin(response.data.token);
        history.push("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Mot de passe / adresse e-mail invalides 😰");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="main-title">Se connecter</div>
      <div className="signin-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="signup-error-message">{errorMessage}</div>
          <button type="submit">Se connecter</button>
          <p onClick={() => history.push("/signup")}>
            Pas encore de compte ? Inscris-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
