import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import { Skeleton } from "@material-ui/lab";

function CheckoutProduct({
  loading = false,
  id,
  image,
  title,
  rating,
  price,
  hideButton,
}) {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });

    // logged in user will save basket state into firestore
    // non-logged in user will save basket state into local storage

    if (user) {
      const index = basket.findIndex((basketItem) => basketItem.id === id);
      let newBasket = [...basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      db.collection("users").doc(user.uid).set({
        basket: newBasket,
      });
    }
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__image__wrapper">
        {!loading ? (
          <img className="checkoutProduct__image" src={image} alt={title} />
        ) : (
          <Skeleton
            className="checkoutProduct__image_skeleton"
            variant="rect"
            height={80}
          />
        )}
      </div>

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">
          {!loading ? title : <Skeleton variant="text" width="100%" />}
        </p>
        <div className="checkoutProduct__rating">
          {!loading ? (
            Array(rating)
              .fill()
              .map((_, i) => <p key={i}>🌟</p>)
          ) : (
            <Skeleton variant="text" width={90} />
          )}
        </div>
        <p className="checkoutProduct__price">
          {!loading ? (
            <>
              <small>$</small>
              <strong>{price}</strong>
            </>
          ) : (
            <Skeleton variant="text" width={50} />
          )}
        </p>
        {!hideButton &&
          (!loading ? (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          ) : (
            <Skeleton variant="text" width={110} />
          ))}
      </div>
    </div>
  );
}

export default CheckoutProduct;
