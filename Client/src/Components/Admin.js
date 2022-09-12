import "./admin.css";
import Modal from "react-modal";
import React from "react";
import { useCreateProductsDispatchContext } from "../context/productContext";
import Products from "./Products";
import { useCreateUserDispatchContext } from "../context/userContext";
import { useCreateUserStateContext } from "../context/userContext";
export default function Admin() {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [productsState, setProductsState] = React.useState([]);
  const [reRender, setReRender] = React.useState();
  const [category, setCategory] = React.useState();
  const setProducts = useCreateProductsDispatchContext();
  const user = useCreateUserStateContext();
  const setUser = useCreateUserDispatchContext();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  let localUser;
  const rememberUser = window.localStorage.getItem("user");
  console.log(rememberUser);
  if (rememberUser != null) {
    localUser = JSON.parse(rememberUser);
  }

  if (!user.isSignedIn && isLoggedIn) {
    setUser.handleUserChange(localUser);
    setUser.handleSignedInChange(isLoggedIn);
  }
  let data;

  const getAllProducts = async () => {
    const response = fetch("http://localhost:3003/getAllProducts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    data = await (await response).json();
    setProductsState(data);
    console.log(data);
    setProducts(data);
    console.log(productsState);
  };

  React.useEffect(() => {
    getAllProducts();
  }, [reRender]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleAddProduct = async (
    propsName,
    propId,
    propStock,
    propPrice,
    propCategory,
    propImage
  ) => {
    try {
      const formData = new FormData();
      console.log(propImage);
      formData.append("productImage", propImage);
      formData.append("name", propsName);
      formData.append("id", propId);
      formData.append("stock", propStock);
      formData.append("price", propPrice);
      formData.append("Category", propCategory);

      const response = await fetch("http://localhost:3003/addProduct", {
        method: "POST",
        body: formData,
      });

      console.log(response);
      if (response.ok === true) {
        alert("Product successfully  added");

        reRender ? setReRender(false) : setReRender(true);

        setId("");
        setImage("");
        setName("");
        setStock("");
        setPrice("");
      }
      if (response.status >= 400) {
        alert(response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="adminContainer">
      <h1>Admin Panel</h1>

      <button
        className="adminButton"
        onClick={() => {
          openModal();
        }}
      >
        Add Product
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="addContainer">
          <h3>Add A Product</h3>

          <div className="fieldContainer">
            Product Name
            <input
              className="input3"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Product Id
            <input
              className="input3"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Stock
            <input
              className="input3"
              value={stock}
              onChange={(event) => {
                setStock(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Price
            <input
              className="input3"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Category
            <input
              className="input3"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            ></input>
          </div>
          <div className="fieldContainer">
            Product Image
            <input
              type="file"
              name="productImage"
              style={{ marginLeft: "25%" }}
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            ></input>
          </div>
          <div style={{ marginTop: "5%" }}>
            <button onClick={closeModal}>Cancel</button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => {
                handleAddProduct(name, id, stock, price, category, image);
                closeModal();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      <div className="productsContainer">
        {productsState.map((value) => {
          return (
            <Products
              product={value}
              flag={"admin"}
              reRender={reRender}
              setReRender={setReRender}
            />
          );
        })}
      </div>
    </div>
  );
}
