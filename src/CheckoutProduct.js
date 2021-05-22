import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { db, auth } from "./firebase";

function CheckoutProduct({ id, image, title, rating, price, hideButton }) {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });

    // logged in user will save basket state into firestore
    // non-logged in user will save basket state into local storage
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const index = basket.findIndex((basketItem) => basketItem.id === id);
        let newBasket = [...basket];

        if (index >= 0) {
          newBasket.splice(index, 1);
        }
        db.collection("users").doc(user.uid).set({
          basket: newBasket,
        });
      } else {
        console.log("Non-logged in user!");
      }
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={title} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
