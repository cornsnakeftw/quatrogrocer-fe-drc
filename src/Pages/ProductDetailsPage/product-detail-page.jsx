import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import {
  ArrowForwardIos,
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
  AddShoppingCart,
} from "@mui/icons-material";
import { FetchProduct } from "../../function";

import "../ProductDetailsPage/product-detail-page.css";

function ProductDetailsPage() {
  const location = useLocation();
  var product_name = location.state.product_name;
  var product_description = location.state.product_description;
  var product_category = location.state.product_category;
  var product_price = location.state.product_price;
  var product_quantity = location.state.product_quantity;
  var product_image = location.state.product_image;
  var product_id = location.state.product_id;
  var i = 0;

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [productDetails, setProductDetails] = useState([]);
  const { products } = useParams();

  useEffect(() => {
    setProductDetails([]);
    FetchProduct(products).then(setProductDetails);
  }, [products]);

  var parentDirectory = "Marketplace";
  var childDirectory = product_category;

  const [counter, setCounter] = useState(1);
  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSub = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  };
  const HorCardContainer = () => (
    <div className="horizontal-cards-container">
      {/* mapping api products */}
      {productDetails
        ?.slice((i = randomInteger(1, 93)), i + 6)
        .map(function (key, index) {
          return (
            <div className="card-container">
              <div className="horizontal-card" key={index}>
                <div className="product-image">
                  <img src={key.product_image} alt={key.product_name} />
                </div>
                <p className="product-name">{key.product_name}</p>
                <p className="product-price">
                  <text className="RM">RM</text> {key.product_price.toFixed(2)}
                </p>
                <div className="button-container">
                  <button className="add-to-cart-btn">
                    <AddShoppingCart className="cart-icon" key={index} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="item-details-page-container">
      <div className="product-directory">
        <p>{parentDirectory}</p>
        <ArrowForwardIos sx={{ fontSize: "14px" }} /> <p>{childDirectory}</p>
      </div>
      <div className="above-container">
        <div className="image-container">
          <div className="discount-percentage">
            <text>50% OFF</text>
          </div>
          <img src={product_image} alt={product_name}></img>
        </div>
        <div className="item-info-container">
          <div className="item-info">
            <p className="item-name">{product_name}</p>
            <p className="description-header">Description</p>
            <p className="description">{product_description}</p>
          </div>
          <hr></hr>
          <div className="actions">
            <div className="price-quantity">
              <div className="only-price">
                <p className="new-price">
                  Price:<p className="RM">RM</p>
                  <p className="price-value">{product_price.toFixed(2)}</p>
                </p>
                <p className="old-price">
                  <strike>RM16</strike>
                </p>
              </div>

              <div className="quantity-adjust">
                <p className="quantity-header">Quantity:</p>
                <div className="quantity-container">
                  <IndeterminateCheckBoxOutlined
                    onClick={handleSub}
                    className="minus-btn"
                  />
                  <div className="quantity-value">{counter}</div>
                  <AddBoxOutlined onClick={handleAdd} className="plus-btn" />
                </div>
              </div>
            </div>
            <button className="add-to-cart">ADD TO CART</button>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="suggestions">
        <p className="suggestion-header">Customer Also Bought</p>
        <hr></hr>
        <div className="product-list-container">
          <HorCardContainer />
        </div>
      </div>
    </div>
  );
}
export default ProductDetailsPage;
