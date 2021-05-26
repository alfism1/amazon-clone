import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import { Skeleton } from "@material-ui/lab";

function Payment() {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, basketLoaded, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100} `,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  useEffect(() => {
    if(user === null)
      history.replace("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (event) => {
    // stripe process
    event.preventDefault();

    setProcessing(true);

    // eslint-disable-next-line no-unused-vars
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        const userRef = db.collection("users").doc(user?.uid);

        userRef.collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // empty basket on firestore
        db.collection("users").doc(user.uid).update({
          basket: [],
        });

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {basketLoaded ? (
            <>
              Checkout (<Link to="/checkout">{basket.length} items</Link>)
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton style={{}} variant="text" width={270} height={50} />
            </div>
          )}
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            {user ? (
              <>
                <p>{user.email}</p>
                <p>Wijaya Kusuma 15</p>
                <p>Malang, Jawa Timur</p>
              </>
            ) : (
              <>
                <Skeleton variant="text" width={140} />
                <Skeleton variant="text" width={140} />
                <Skeleton variant="text" width={140} />
              </>
            )}
          </div>
        </div>

        {/* Payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basketLoaded ? (
              basket.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))
            ) : (
              <CheckoutProduct loading />
            )}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* Stripe */}
            <form onSubmit={handleSubmit}>
              <CardElement
                className="payment__card"
                onChange={handleChange}
                options={{
                  style: {
                    base: {
                      lineHeight: "40px",
                      padding: "20px",
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>
                        {basketLoaded ? (
                          `Order Total: ${value}`
                        ) : (
                          <Skeleton variant="text" width={140} />
                        )}
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
