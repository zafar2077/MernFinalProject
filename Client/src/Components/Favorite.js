import { useCreateProductsStateContext } from "../context/productContext";
import {
  useCreateUserDispatchContext,
  useCreateUserStateContext,
} from "../context/userContext";
import "./favorite.css";
import React from "react";
import Products from "./Products";

export default function Favorite() {
  const data = useCreateUserStateContext();
  const products = useCreateProductsStateContext();
  const [reRender, setReRender] = React.useState(true);
  const setUser = useCreateUserDispatchContext();

  const getUpdatedUser = async () => {
    try {
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

  let favorites = [];

  data.user.favorites.forEach((favoriteItem) => {
    products.products.forEach((product) => {
      if (favoriteItem.favoritesId === product.id) {
        favorites.push(product);
      }
    });
  });

  return (
    <div
      className={
        favorites.length > 4 ? "favoritesContainer" : "smallFavoritesContainer"
      }
    >
      <h1>Favorites</h1>

      <div className="favoritesProductContainer">
        {favorites.map((value) => {
          return (
            <Products
              product={value}
              flag={"favorite"}
              reRender={reRender}
              setReRender={setReRender}
            />
          );
        })}
      </div>
    </div>
  );
}
