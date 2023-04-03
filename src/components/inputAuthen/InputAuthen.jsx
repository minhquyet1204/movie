import React, { useState } from "react";
import "./inputAuthen.scss";
import { Link, useNavigate } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import GoogleButton from "react-google-button";
import { UserContext } from "../../context/UserAuth";
const InputAuthen = (props) => {
  const { googleSignIn } = UserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {}
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      props.onSubmit({ email, password });
    } catch (error) {}
  };
  return (
    <>
      <div className="form-bg" style={{ backgroundImage: `url(${bg})` }}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">{props.title}</div>

          <div className="google-btn">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>

          <div className="input-container ic2">
            <input
              id="email"
              className="input"
              type="email"
              placeholder=" "
              onChange={(event) => setEmail(event.target.value.trim())}
            />
            <div className="cut cut-short"></div>
            <label htmlFor="email" className="placeholder">
              Email
            </label>
          </div>
          <div className="input-container ic2">
            <input
              id="password"
              className="input"
              type="password"
              placeholder=" "
              onChange={(event) => setPassword(event.target.value.trim())}
            />
            <div className="cut"></div>
            <label htmlFor="password" className="placeholder">
              Password
            </label>
          </div>

          <p className="input__error">{props.error}</p>
          <button type="text" className="submit">
            {props.title}
          </button>

          <span className="input__end">
            {props.para} ? <Link to={props.path}> {props.subtitle}</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default InputAuthen;
