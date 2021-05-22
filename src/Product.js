import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { db, auth } from "./firebase";

function Product({ id, title, price, image, rating }) {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });

    // logged in user will save basket state into firestore
    // non-logged in user will save basket state into local storage
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users")
          .doc(user.uid)
          .set({
            basket: [...basket, { id, title, image, price, rating }],
          });
      } else {
        console.log("Non-logged in user!");
      }
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt={`${title}`} />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
