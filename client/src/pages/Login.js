import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="login">
      <div className="login-information">
        <h1>Welcome to Budget App!</h1>
        <p>Control your money!</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Log in app</h3>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        ></input>
        <button type="submit">Sing in</button>
        <div className="error">{error}</div>

        <span>
          You dont have an account yet? Click{" "}
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
