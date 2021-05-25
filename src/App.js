import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Checkout from "./Checkout";
import { db, auth } from "./firebase";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./Login";
import Orders from "./Orders";
import Payment from "./Payment";
import { useStateValue } from "./StateProvider";
import Test from "./Test";

const promise = loadStripe("pk_test_VPI52mjgWHlw7wAQQrhbSaJ5007Mty52g4");

function App() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingBasket, setIsLoadingBasket] = useState(true);

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
              dispatch({
                type: "BASKET_LOADED",
              });
              setIsLoadingBasket(false);
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
        dispatch({
          type: "BASKET_LOADED",
        });
        setIsLoadingBasket(false);
      }
      setIsLoadingUser(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/test">
            <Header
              loadingUser={isLoadingUser}
              loadingBasket={isLoadingBasket}
            />
            <Test />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header
              loadingUser={isLoadingUser}
              loadingBasket={isLoadingBasket}
            />
            <Orders />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header
              loadingUser={isLoadingUser}
              loadingBasket={isLoadingBasket}
            />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header
              loadingUser={isLoadingUser}
              loadingBasket={isLoadingBasket}
            />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/">
            <Header
              loadingUser={isLoadingUser}
              loadingBasket={isLoadingBasket}
            />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
