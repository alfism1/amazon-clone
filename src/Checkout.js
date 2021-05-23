import "./Checkout.css";
import "./Layout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";

function Checkout() {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, basketLoaded }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          {/* <h3>Hello, {user?.email}</h3> */}
          <h2 className="checkout__title">Your shopping Basket</h2>
          <div className="checkout__items">
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
      </div>
      <div className="checkout__right">
        <Subtotal loading={!basketLoaded} />
      </div>
    </div>
  );
}

export default Checkout;
