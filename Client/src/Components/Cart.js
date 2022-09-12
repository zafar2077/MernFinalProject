import { useCreateProductsStateContext } from "../context/productContext";
import {
  useCreateUserDispatchContext,
  useCreateUserStateContext,
} from "../context/userContext";
import "./cart.css";
import React from "react";
import Products from "./Products";
export default function Cart() {
  const data = useCreateUserStateContext();
  const products = useCreateProductsStateContext();
  const [cartProducts, setCartProducts] = React.useState([]);
  const [reRender, setReRender] = React.useState(true);
  const setUser = useCreateUserDispatchContext();
  let count = -1;
  const getUpdatedUser = async () => {
    try {
      console.log(data.user);
      const response = await fetch("http://localhost:3003/auth/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.user.email,
        }),
      });
      const newData = await (await response).json();

      setUser.handleUserChange(newData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUpdatedUser();
  }, [reRender]);

  let cart = [];
  let quantity = [];
  data.user.Cart.forEach((CartItem) => {
    products.products.forEach((product) => {
      if (CartItem.id === product.id && CartItem.quantity > 0) {
        cart.push(product);
        quantity.push(CartItem.quantity);
      }
    });
  });

  return (
    <div className={cart.length > 3 ? "cartContainer" : "smallCartContainer"}>
      <h1>Cart</h1>

      <div className="cartProductContainer">
        {cart.map((value) => {
          count++;
          return (
            <Products
              product={value}
              flag={"cart"}
              reRender={reRender}
              setReRender={setReRender}
              quantity={quantity[count]}
            />
          );
        })}
      </div>
    </div>
  );
}
