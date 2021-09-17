import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../loginSlice";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const commenceLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password)).then(() => {
      props.onLogin();
      //onLogin coming from parent
    });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="test@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={commenceLogin}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
