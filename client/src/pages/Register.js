import { useState } from "react";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password);
  };

  return (
    <div className="login">
      <div className="login-information">
        <h1>Create an accountant</h1>
        <p>Control your money!</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Sing Up</h3>
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
        <button type="submit">Register</button>
        <div className="error">{error}</div>
      </form>
    </div>
  );
}
