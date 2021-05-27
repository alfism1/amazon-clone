import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import { Skeleton } from "@material-ui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Product({
  loading = false,
  id,
  title,
  price,
  image,
  rating,
  callback,
}) {
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
    if (user !== null) {
      db.collection("users")
        .doc(user?.uid)
        .set({
          basket: [...basket, { id, title, image, price, rating }],
        });
    }

    if (typeof callback === "function") callback();
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>
          {loading ? (
            <>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
            </>
          ) : (
            title
          )}
        </p>
        <p className="product__price">
          {loading ? (
            <Skeleton variant="text" width="15%" />
          ) : (
            <>
              <small>$</small>
              <strong>{price}</strong>
            </>
          )}
        </p>
        <div className="product__rating">
          {loading ? (
            <Skeleton variant="text" width="25%" />
          ) : (
            Array(rating)
              .fill()
              .map((_, i) => <p key={i}>🌟</p>)
          )}
        </div>
      </div>

      {loading ? (
        <Skeleton variant="rect" width="100%" height={200} />
      ) : (
        <img src={image} alt={`${title}`} />
      )}

      {loading ? (
        <Skeleton
          style={{ marginTop: "auto" }}
          variant="rect"
          width={100}
          height={20}
        />
      ) : (
        <>
          <button onClick={addToBasket}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ marginRight: "3px" }}
            />{" "}
            Add to Basket
          </button>
        </>
      )}
    </div>
  );
}

export default Product;
