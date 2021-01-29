import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import IsLoading from "../components/IsLoading";

const SignUp = (props) => {
  const { handleLogin } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
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
        "https://vinted-charlene.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: username,
        }
      );
      if (response.data.token) {
        handleLogin(response.data.token);

        history.push("/");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Hum 🤔 ton adresse e-mail existe déjà chez nous...");
      }
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="signin-container">
          <div>S'inscrire</div>
          <div className="signin-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="signup-error-message">{errorMessage}</div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="checkbox">
                <input type="checkbox" />
                <span>S'inscrire à notre newsletter</span>
              </div>

              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
              <button type="submit">S'inscrire</button>
              <p onClick={() => history.push("/login")}>
                Tu as déjà un compte ? Connecte-toi !
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
