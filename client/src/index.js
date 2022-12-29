import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetsProvider } from "./context/budgetsContext";

import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BudgetsProvider>
        <App />
      </BudgetsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
