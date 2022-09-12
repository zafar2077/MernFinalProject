import "./main.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { HiOutlineSearch } from "react-icons/hi";
import React from "react";
import { Link } from "react-router-dom";
import {
  useCreateProductsDispatchContext,
  useCreateProductsStateContext,
} from "../context/productContext";
import Products from "./Products";
import {
  useCreateUserDispatchContext,
  useCreateUserStateContext,
} from "../context/userContext";

export default function Main(props) {
  const [currentButton, setCurrentButton] = React.useState();
  const [productsState, setProductsState] = React.useState([]);
  const [reRender, setReRender] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const setProducts = useCreateProductsDispatchContext();

  let data;
  let tempProducts;
  const user = useCreateUserStateContext();
  const setUser = useCreateUserDispatchContext();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  let localUser;
  const rememberUser = window.localStorage.getItem("user");
  console.log(rememberUser);
  if (rememberUser != null) {
    localUser = JSON.parse(rememberUser);
  }
  console.log(localUser);
  if (!user.isSignedIn && isLoggedIn) {
    setUser.handleUserChange(localUser);
    setUser.handleSignedInChange(isLoggedIn);
  }

  console.log(props.category);
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
  let productArray;
  const getUpdatedUser = async () => {
    try {
      const response = fetch("http://localhost:3003/auth/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.user.email,
        }),
      });
      const data = await (await response).json();

      setUser.handleUserChange(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getAllProducts();
    getUpdatedUser();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("user");
    setUser.handleUserChange(null);
    setUser.handleSignedInChange(false);
  };
  props.category !== "All Products" &&
    (tempProducts = productsState.filter((value) => {
      if (value.Category === props.category) {
        return true;
      } else {
        return false;
      }
    }));
  console.log(productsState);
  props.category === "All Products"
    ? (productArray = productsState.filter((value) => {
        if (value.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }))
    : (productArray = tempProducts.filter((value) => {
        if (value.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }));

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <div className="profileIconContainer">
          {!user.isSignedIn ? (
            <Link to="/reglogin" className="links">
              {" "}
              <p className="topText">Register/Login</p>
            </Link>
          ) : (
            <div className="profileIconContainer">
              <Link to="/profile" className="links">
                <img
                  src={"http://localhost:3003/" + user.user.userImage}
                  className="profileAvatar"
                />
              </Link>
              <p
                className="topText"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
        <div className="searchFieldContainer">
          <span
            style={{
              position: "relative",
              padding: "0px 0px 0px 0px",
              margin: "0px 0px 0px 0px",
            }}
          >
            <HiOutlineSearch className="mainIcons" />
            <input
              className="searchInput"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </span>
        </div>
        <div className="carouselContainer">
          <Carousel
            infiniteLoop={true}
            showThumbs={false}
            dynamicHeight={true}
            width={700}
            autoPlay={true}
            interval={5000}
            centerSlidePercentage={90}
            autoFocus={true}
            ariaLabel={false}
            className="carousel"
          >
            <div>
              <img className="carouselImage" src=".././keyboard.jpg" />
            </div>

            <div>
              <img className="carouselImage" src=".././vr.jpg" />
            </div>

            <div>
              <img className="carouselImage" src=".././setup.webp" />
            </div>
          </Carousel>
        </div>
        <p className="productText">Products</p>
        {/* <div className="productBarContainer">
          <button
            className={
              currentButton === "Top"
                ? "selectedProductButtons"
                : "productButtons"
            }
            style={{ marginLeft: "0px" }}
            onClick={() => {
              setCurrentButton("Top");
            }}
          >
            Top
          </button>
          <button
            className={
              currentButton === "Popular"
                ? "selectedProductButtons"
                : "productButtons"
            }
            onClick={() => {
              setCurrentButton("Popular");
            }}
          >
            Popular
          </button>
          <button
            className={
              currentButton === "Recommended"
                ? "selectedProductButtons"
                : "productButtons"
            }
            onClick={() => {
              setCurrentButton("Recommended");
            }}
          >
            Recommended
          </button>
        </div> */}

        <div
          className={
            productArray.length > 0
              ? "productsContainer"
              : "smallProductsContainer"
          }
        >
          {productArray.map((value) => {
            return (
              <Products
                product={value}
                flag={"main"}
                getUser={getUpdatedUser}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
