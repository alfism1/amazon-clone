import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Checkout from "./Checkout";
import { db, auth } from "./firebase";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import Payment from "./Payment";
import { useStateValue } from "./StateProvider";
import Test from "./Test";

const promise = loadStripe("pk_test_VPI52mjgWHlw7wAQQrhbSaJ5007Mty52g4");

function App() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });

        // load user's basket from firestore and set to basket state
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              doc.data().basket.forEach((basket) => {
                dispatch({
                  type: "ADD_TO_BASKET",
                  item: basket,
                });
              });
            }
          });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });

        const localBasket = window.localStorage.getItem("basket");
        if (localBasket !== null) {
          JSON.parse(localBasket).forEach((basket) => {
            dispatch({
              type: "ADD_TO_BASKET",
              item: basket,
            });
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/test">
            <Header />
            <Test />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
