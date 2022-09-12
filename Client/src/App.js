import "./App.css";
import Leftbar from "./Components/Leftbar";
import Main from "./Components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile";
import Favorite from "./Components/Favorite";
import Cart from "./Components/Cart";
import RegLogin from "./Components/RegLogin";
import Admin from "./Components/Admin";
import AuthRoute from "./routes/AuthRoute";
import AdminRoute from "./routes/AdminRoute";
import React from "react";
function App() {
  const [sideCategory, setSideCategory] = React.useState("All Products");
  return (
    <div className="App">
      <Leftbar category={sideCategory} setCategory={setSideCategory} />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Main category={sideCategory} />} />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <AuthRoute>
                <Favorite />
              </AuthRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />
          <Route path="/reglogin" element={<RegLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
