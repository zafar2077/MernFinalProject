import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateUserStateContext } from "../context/userContext";
import "./products.css";
import Modal from "react-modal";

export default function Products(props) {
  const currentUser = useCreateUserStateContext();
  console.log(currentUser.user);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
      color: "white",
    },
  };

  const navigate = useNavigate();
  const handleAddToCart = async (product) => {
    if (!currentUser.user) {
      navigate("/reglogin");
      return;
    }
    try {
      const response = await fetch("http://localhost:3003/auth/addtoCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.user.email,
          id: product.id,
          name: product.name,
        }),
      });

      if (response.ok === true) {
        openModal();
        setTimeout(closeModal, 500);
      }
    } catch (error) {
      alert("error");
    }
  };

  const handleAddToFavorites = async (product) => {
    if (!currentUser.user) {
      navigate("/reglogin");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3003/auth/addToFavorites",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUser.user.email,
            id: product.id,
            name: product.name,
          }),
        }
      );

      if (response.ok === true) {
        openModal();
        setTimeout(closeModal, 500);
      }
    } catch (error) {
      alert("error");
    }
  };

  const handleRemoveFromCart = async (product) => {
    try {
      const response = await fetch(
        "http://localhost:3003/auth/removeFromCart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUser.user.email,
            id: product.id,
          }),
        }
      );

      if (props.flag === "cart" || props.flag === "favorite") {
        props.reRender ? props.setReRender(false) : props.setReRender(true);
      }

      if (response.ok === true) {
        openModal();
        setTimeout(closeModal, 500);
      }
    } catch (error) {
      alert("error");
    }
  };

  const handleRemoveFromFavorites = async (product) => {
    try {
      const response = await fetch(
        "http://localhost:3003/auth/removeFromFavorites",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUser.user.email,
            id: product.id,
          }),
        }
      );

      if (props.flag === "cart" || props.flag === "favorite") {
        props.reRender ? props.setReRender(false) : props.setReRender(true);
      }

      if (response.ok === true) {
        openModal();
        setTimeout(closeModal, 500);
      }
    } catch (error) {
      alert("error");
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:3003/deleteProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
        }),
      });

      if (
        props.flag === "cart" ||
        props.flag === "favorite" ||
        props.flag === "admin"
      ) {
        props.reRender ? props.setReRender(false) : props.setReRender(true);
      }

      if (response.ok === true) {
        openModal();
        setTimeout(closeModal, 500);
      }
    } catch (error) {
      alert("error");
    }
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="productCard">
      <img
        src={"http://localhost:3003/" + props.product.productImage}
        className="productImage"
      />
      <div className="descriptionContainer">
        Name:
        <p style={{ color: "white" }} className="cardText">
          {props.product.name}
        </p>
      </div>
      <div className="descriptionContainer">
        Stock:
        <p style={{ color: "white" }} className="cardText">
          {props.product.stock}
        </p>
      </div>
      <div className="descriptionContainer">
        Price:
        <p style={{ color: "white" }} className="cardText">
          {props.product.price}
        </p>
      </div>

      {props.flag === "cart" && (
        <div className="descriptionContainer">
          Quantity:
          <p style={{ color: "white" }} className="cardText">
            {props.quantity}
          </p>
        </div>
      )}

      {props.flag === "main" && (
        <div className="buttonPairContainer">
          <button
            className="cartButton"
            onClick={() => {
              handleAddToCart(props.product);
            }}
          >
            Add to Cart
          </button>
          <button
            className="cartButton"
            onClick={() => {
              handleAddToFavorites(props.product);
            }}
          >
            Add to Favorites
          </button>
        </div>
      )}

      {props.flag === "cart" && (
        <button
          className="cartButton"
          onClick={() => {
            handleRemoveFromCart(props.product);
          }}
        >
          Remove From Cart
        </button>
      )}

      {props.flag === "favorite" && (
        <button
          className="cartButton"
          onClick={() => {
            handleRemoveFromFavorites(props.product);
          }}
        >
          Remove From Favorites
        </button>
      )}

      {props.flag === "admin" && (
        <button
          className="cartButton"
          onClick={() => {
            handleDeleteProduct(props.product);
          }}
        >
          Delete
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="Overlay"
      >
        <div className="popup">
          <p>Request Successful</p>
          {/* <button onClick={closeModal}>close</button> */}
        </div>
      </Modal>
    </div>
  );
}
