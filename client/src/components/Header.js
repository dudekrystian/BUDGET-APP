import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="header">
      <span>Budget App</span>
      <p>
        Hi <strong>{user.email}</strong>!
      </p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}
