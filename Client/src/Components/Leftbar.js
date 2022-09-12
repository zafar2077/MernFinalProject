import React from "react";
import {
  FaRegUserCircle,
  FaHeart,
  FaWallet,
  FaRegArrowAltCircleRight,
  FaHeadphones,
  FaRegArrowAltCircleDown,
  FaShoppingCart,
} from "react-icons/fa";

import { GiPc, GiVrHeadset, GiKeyboard, GiMouse } from "react-icons/gi";
import { Link } from "react-router-dom";

import "./leftbar.css";
export default function Leftbar(props) {
  const [sidebarTrigger, setSidebarStrigger] = React.useState(true);

  const toggle = () => {
    sidebarTrigger ? setSidebarStrigger(false) : setSidebarStrigger(true);
  };

  return (
    <div className={sidebarTrigger ? "leftbar" : "extendedLeftbar"}>
      <Link to="/" className="links">
        {" "}
        <div className="logoContainer">
          {" "}
          <p className="logoText">Game Store</p>{" "}
          <img className="logoImage" src=".././logo.png"></img>
        </div>
      </Link>
      <div className="optionContainer">
        <FaRegUserCircle className="icon" />
        <Link className="links" to="/profile">
          {" "}
          <p className="leftBarText">Profile</p>
        </Link>
      </div>

      <div className="optionContainer">
        <FaHeart className="icon" />
        <Link to="/favorite" className="links">
          <p className="leftBarText">Favorite</p>
        </Link>
      </div>

      <div className="optionContainer">
        <FaShoppingCart className="icon" />
        <Link to="/cart" className="links">
          <p className="leftBarText">Cart</p>
        </Link>
      </div>
      {sidebarTrigger ? (
        <div className="LowerOptionContainer" style={{ marginTop: "12%" }}>
          <p className="LowerLeftBarText" style={{ marginLeft: "0px" }}>
            Category
          </p>
          <FaRegArrowAltCircleDown
            className="icon"
            style={{ marginLeft: "auto", marginRight: "20px" }}
            onClick={toggle}
          />
        </div>
      ) : (
        <>
          <div className="LowerOptionContainer" style={{ marginTop: "12%" }}>
            <p className="LowerLeftBarText" style={{ marginLeft: "0px" }}>
              Category
            </p>
            <FaRegArrowAltCircleRight
              className="icon"
              style={{ marginLeft: "auto", marginRight: "20px" }}
              onClick={toggle}
            />
          </div>

          <div
            className={"LowerOptionContainer"}
            onClick={() => {
              props.setCategory("All Products");
            }}
            style={{
              backgroundColor:
                props.category === "All Products" ? "Purple" : "",
            }}
          >
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "All Products" ? "White" : "",
              }}
            >
              All Products
            </p>
          </div>

          <div
            className="LowerOptionContainer"
            onClick={() => {
              props.setCategory("Computer");
            }}
            style={{
              backgroundColor: props.category === "Computer" ? "Purple" : "",
            }}
          >
            <GiPc className="icon" />
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "Computer" ? "White" : "",
              }}
            >
              Computer
            </p>
          </div>

          <div
            className="LowerOptionContainer"
            onClick={() => {
              props.setCategory("Headphones");
            }}
            style={{
              backgroundColor: props.category === "Headphones" ? "Purple" : "",
            }}
          >
            <FaHeadphones className="icon" />
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "Headphones" ? "White" : "",
              }}
            >
              Gaming Headphones
            </p>
          </div>

          <div
            className="LowerOptionContainer"
            onClick={() => {
              props.setCategory("VR");
            }}
            style={{
              backgroundColor: props.category === "VR" ? "Purple" : "",
            }}
          >
            <GiVrHeadset className="icon" />
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "VR" ? "White" : "",
              }}
            >
              VR Glasses
            </p>
          </div>

          <div
            className="LowerOptionContainer"
            onClick={() => {
              props.setCategory("Keyboard");
            }}
            style={{
              backgroundColor: props.category === "Keyboard" ? "Purple" : "",
            }}
          >
            <GiKeyboard className="icon" />
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "Keyboard" ? "White" : "",
              }}
            >
              Keyboard
            </p>
          </div>

          <div
            className="LowerOptionContainer"
            onClick={() => {
              props.setCategory("Mouse");
            }}
            style={{
              backgroundColor: props.category === "Mouse" ? "Purple" : "",
            }}
          >
            <GiMouse className="icon" />
            <p
              className="LowerLeftBarText"
              style={{
                color: props.category === "Mouse" ? "White" : "",
              }}
            >
              Mouse
            </p>
          </div>
        </>
      )}
    </div>
  );
}
