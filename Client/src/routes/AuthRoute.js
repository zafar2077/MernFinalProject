import React from "react";
import { useCreateUserStateContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const checkAuthentication = useCreateUserStateContext();
  if (checkAuthentication.isSignedIn === false) {
    alert("Login first");
    return <Navigate to="/reglogin" />;
  }
  return children;
}
