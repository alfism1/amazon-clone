import moment from "moment";
import React from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import "./Order.css";
import { Skeleton } from "@material-ui/lab";

function Order({ loading = false, order }) {
  return (
    <div className="order">
      <h2>{!loading ? <>Order</> : <Skeleton variant="text" width={90} />}</h2>

      <p className="order__id">
        <small>
          {!loading ? order.id : <Skeleton variant="text" width={190} />}
        </small>
      </p>
      <p className="order__date">
        <small>
          {!loading ? (
            moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")
          ) : (
            <Skeleton variant="text" width={170} />
          )}
        </small>
      </p>
      <div className="order__items">
        {!loading ? (
          order.data.basket?.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton={true}
            />
          ))
        ) : (
          <CheckoutProduct loading />
        )}
      </div>

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">
            {!loading ? (
              `Order Total: ${value}`
            ) : (
              <Skeleton variant="text" width={140} />
            )}
          </h3>
        )}
        decimalScale={2}
        value={order?.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
