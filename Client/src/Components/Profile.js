import React from "react";
import { useCreateProductsStateContext } from "../context/productContext";
import { useCreateUserStateContext } from "../context/userContext";
import "./profile.css";
export default function Profile() {
  const currentUser = useCreateUserStateContext();
  let sum = 0;
  let cart = [];

  const products = useCreateProductsStateContext();
  currentUser.user.Cart.forEach((CartItem) => {
    products.products.forEach((product) => {
      if (CartItem.id === product.id && CartItem.quantity > 0) {
        sum += product.price * CartItem.quantity;
      }
    });
  });

  return (
    <div className="profileContainer">
      <img
        src={"http://localhost:3003/" + currentUser.user.userImage}
        className="profilePic"
      />
      <table>
        <tr>
          <td>
            <p className="profileTextRow">Name</p>
          </td>
          <td>
            <p className="profileText">{currentUser.user.fullName}</p>
          </td>
        </tr>

        <tr>
          <td className="profileTextRow">Total Cart Worth</td>
          <td>
            <p className="profileText">{sum}</p>
          </td>
        </tr>
      </table>
    </div>
  );
}
