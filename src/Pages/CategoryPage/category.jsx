import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import {
  AddShoppingCart,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import "./category.css";
import { FetchProduct } from "../../function";
import SideNav from "../../Components/SideNav/sidenav.jsx";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";

function CategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state.category;

  // Pagination
  const [perPage, setPerPage] = useState(6);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [productDetails, setProductDetails] = useState([]);
  const { products } = useParams();

  useEffect(() => {
    setProductDetails([]);
    FetchProduct(products).then(setProductDetails);
  }, [products]);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(
      productDetails.filter((obj) => obj.product_category === category).length /
        value
    );
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return productDetails
      .filter((obj) => obj.product_category === category)
      .slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <i className="fa fa-angle-double-left">
            <ArrowBackIos />
          </i>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <i className="fa fa-angle-double-right">
            <ArrowForwardIos />
          </i>
        </button>
      );
    }
    return originalElement;
  };

  //mapping product
  const MediumHorCard = () => (
    <div className="medium-horizontal-cards-container">
      {getData(current, size).map((data, index) => {
        return (
          <div className="card-container">
            <div className="medium-horizontal-card" key={index}>
              <div className="product-image">
                <img src={data.product_image} />
              </div>
              <p className="product-name">{data.product_name}</p>
              <p className="product-price">
                <p className="RM">RM</p> {data.product_price.toFixed(2)}
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
    <div>
      <div className="product-page">
        <SideNav />
        <div className="product-section">
          <div className="product-section-title">
            <h5>{category}</h5>
          </div>
          <hr></hr>
          <div className="filter-info">
            <Pagination
              className="pagination-data"
              showTotal={(total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total}`
              }
              onChange={PaginationChange}
              total={
                productDetails.filter(
                  (obj) => obj.product_category === category
                ).length
              }
              current={current}
              pageSize={size}
              showSizeChanger={false}
              itemRender={PrevNextArrow}
              onShowSizeChange={PerPageChange}
              showTitle={false}
            />
          </div>
          <div className="product-cards">
            <MediumHorCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;