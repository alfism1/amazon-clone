import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ user, basket_length, handleAuthentication }) {
  const closeSidebar = () => {
    var x = document.getElementById("sidebar__wrapper");
    x.style.display = "none";
  };
  return (
    <div className="sidebar">
      <Link to={!user ? "/login" : "/"}>
        <div onClick={handleAuthentication} className="header__option">
          <span className="header__optionLineOne">
            Hello, {!user ? "Guest" : user.email}
          </span>
          <span className="header__optionLineTwo">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </div>
      </Link>

      <Link to="/orders">
        <div onClick={closeSidebar} className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
      </Link>

      <div onClick={closeSidebar} className="header__option">
        <span className="header__optionLineOne">Your</span>
        <span className="header__optionLineTwo">Prime</span>
      </div>

      <Link to="/checkout">
        <div onClick={closeSidebar} className="header__option">
        <span className="header__optionLineOne">Items</span>
        <span className="header__optionLineTwo">Shopping Chart ({basket_length})</span>
        </div>
      </Link>
    </div>
  );
}

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleMobileMenu = () => {
    var x = document.getElementById("sidebar__wrapper");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  return (
    <div style={{ marginBottom: "60px" }}>
      <div className="header__wrapper">
        <div className="header">
          <Link to="/">
            <img
              className="header__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </Link>

          <div className="header__search">
            <input className="header__searchInput" type="text" />
            <SearchIcon className="header__searchIcon" />
          </div>

          <div id="header__main__menu" className="header__nav">
            {/* <Link to={!user && "/login"}> */}
            <Link to={!user ? "/login" : "/"}>
              <div onClick={handleAuthentication} className="header__option">
                <span className="header__optionLineOne">
                  Hello, {!user ? "Guest" : user.email}
                </span>
                <span className="header__optionLineTwo">
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </div>
            </Link>

            <Link to="/orders">
              <div className="header__option">
                <span className="header__optionLineOne">Returns</span>
                <span className="header__optionLineTwo">& Orders</span>
              </div>
            </Link>

            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>

            <Link to="/checkout">
              <div className="header__optionBasket">
                <ShoppingBasketIcon />
                <span className="header__optionLineTwo header__basketCount">
                  {basket?.length}
                </span>
              </div>
            </Link>
          </div>

          {/* for mobile */}
          <div className="header__nav__wrapper">
            <div className="header__nav__basket">
              <Link to="/checkout">
                <div className="header__optionBasket">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="header__optionLineTwo header__basketCount">
                    {basket?.length}
                  </span>
                </div>
              </Link>
            </div>
            <div>
              <button className="header__menu" onClick={handleMobileMenu}>
                <FontAwesomeIcon className="header__nav__bars" icon={faBars} />
              </button>
            </div>
            {/* end of for mobile */}
          </div>
        </div>
      </div>

      <div id="sidebar__wrapper" className="sidebar__wrapper">
        <Sidebar
          user={user}
          basket_length={basket.length}
          handleAuthentication={handleAuthentication}
        />
      </div>
    </div>
  );
}

export default Header;
