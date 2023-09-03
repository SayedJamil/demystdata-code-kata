import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../StoreContext.tsx";
import EnterLoan from "../components/EnterLoan.tsx";
import GetBalance from "../components/GetBalance.tsx";

export const Balance: React.FC = () => {
  const { state } = useContext(StoreContext);
  if (!state.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  if (state.balances.length == 0) {
    return <GetBalance />;
  }
  return <EnterLoan />;
};
