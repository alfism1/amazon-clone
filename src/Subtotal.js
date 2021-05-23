import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router";
import { Skeleton } from "@material-ui/lab";

function Subtotal({ loading = false }) {
  const history = useHistory();
  const [{ basket }] = useStateValue();

  const handleSubmit = (e) => {
    history.push("/payment");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {!loading ? (
                <>
                  Subtotal ({basket.length} items): <strong>{value}</strong>{" "}
                </>
              ) : (
                <Skeleton variant="text" width="100%" height={25} />
              )}
            </p>
            <small className="subtotal__gift">
              {!loading ? (
                <>
                  <input type="checkbox" /> This order contains a gift
                </>
              ) : (
                <Skeleton variant="text" width="55%" height={25} />
              )}
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {!loading ? (
        <button onClick={handleSubmit}>Proceed to Checkout</button>
      ) : (
        <Skeleton variant="rect" width="100%" height={30} />
      )}
    </div>
  );
}

export default Subtotal;
