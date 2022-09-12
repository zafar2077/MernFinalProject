import React from "react";
import { useCreateUserStateContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const checkAuthentication = useCreateUserStateContext();
  if (checkAuthentication.user) {
    if (
      !(
        checkAuthentication.user.email === "admin@gmail.com" &&
        checkAuthentication.user.password === "1234"
      )
    ) {
      alert("You are not authorized to access this page");
      return <Navigate to="/" />;
    }
    return children;
  } else {
    alert("Login first");
    return <Navigate to="/reglogin" />;
  }
}
