import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const ProductComponent = () => {
  const [category, setCategory] = useState("");
  const [prodbtn, setProdbtn] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [flag, setflag] = useState("flase");
  const [price, Setprice] = useState(0);
  useEffect(() => {
    fetchData();
  }, [category]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
      );
      const data = response.data;
      const categoryIndex = getCategoryIndex(category);
      setProducts(
        data.categories.flatMap((category) => category.category_products)
      );
      if (categoryIndex !== -1) {
        setProdbtn(data.categories[categoryIndex].category_products);
      } else {
        console.error("Invalid category selected");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCategoryIndex = (cat) => {
    switch (cat.toLowerCase()) {
      case "men":
        return 0;
      case "women":
        return 1;
      case "kids":
        return 2;
      default:
        return -1;
    }
  };
  const addToCart = (product) => {
    // cartbtn.innerText="Added to cart"
    setCart([...cart, product]);
    // console.log(cart);
  };
  const handleButtonClick = (cat) => {
    setflag((flag) => "true");
    setCategory(cat);
  };
  const handleSearch = (e) => {
    setflag((flag) => "flase");
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((item) => {
    const { category_name, vendor, title } = item;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (category_name &&
        category_name.toLowerCase().includes(searchTermLower)) ||
      (vendor && vendor.toLowerCase().includes(searchTermLower)) ||
      (title && title.toLowerCase().includes(searchTermLower))
    );
  });
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseInt(item.price), 0);
  };

  // const totprice=(itemprice)={
  //   Setprice(price=> price+itemprice)
  // }
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  const somefunction = (flag) => {
    if (flag === "true") {
      return (
        <div>
          <div className="products">
            {prodbtn.map((item, index) => (
              <div key={index} className="productItems">
                <img src={item.image} alt={item.title} />
                <h6>{item.vendor}</h6>
                <hr />
                <h6>{item.badge_text || ""}</h6>
                <h6>
                  Price Rs. {item.price} | <span>{item.compare_at_price}</span>
                </h6>
                <h5>{item.title}</h5>
                <button className="cartbtn" onClick={() => addToCart(item)}>
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (flag === "flase") {
      return (
        <div className="products">
          {filteredProducts.map((item, index) => (
            <div key={index} className="productItems">
              <img src={item.image} alt={item.title} />
              <h6>{item.vendor}</h6>
              <hr />
              <h6>{item.badge_text || ""}</h6>
              <h6>
                Price Rs. {item.price} | <span>{item.compare_at_price}</span>
              </h6>
              <h5>{item.title}</h5>
              <button className="cartbtn" onClick={() => addToCart(item)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      );
    } else if (flag === "cart") {
      return (
        <div>
          <div className="cartprod">
            {cart.map((item, index) => (
              <div key={index} className="productItems">
                <img src={item.image} alt={item.title} />
                <h6>{item.vendor}</h6>
                <hr />
                <h6>{item.badge_text || ""}</h6>
                <h6>
                  Price Rs. {item.price} | <span>{item.compare_at_price}</span>
                </h6>
                <h5>{item.title}</h5>
                <button className="btn" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart">
            <h2>Shopping Cart</h2>
            <br></br>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.title} --- {item.price}
                </li>
              ))}
            </ul>
            <h3>Total Price: Rs. {calculateTotalPrice()}</h3>
            <br></br>
          </div>
        </div>
      );
    }
  };
  const cartpage = (flag) => {
    setflag((flag) => "cart");
  };
  return (
    <div>
      <h1>Welcome To Our Website</h1>
      <input
        id="search"
        type="text"
        placeholder="Search by category, brand, or product name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div id="buttons">
        <button className="btn" onClick={() => handleButtonClick("men")}>
          Men
        </button>
        <button className="btn" onClick={() => handleButtonClick("women")}>
          Women
        </button>
        <button className="btn" onClick={() => handleButtonClick("kids")}>
          Kids
        </button>
        <button
          style={{ backgroundColor: "yellowgreen" }}
          className="btn"
          onClick={() => cartpage(cart)}
        >
          GoTo Cart
        </button>
      </div>
      {somefunction(flag)}
    </div>
  );
};

export default ProductComponent;