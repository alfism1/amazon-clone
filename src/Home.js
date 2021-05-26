import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Layout.css";
import Product from "./Product";
import { db, auth } from "./firebase";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useStateValue } from "./StateProvider";

function Home() {
  const [items, setItems] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickWithAction = (data) => () => {
    enqueueSnackbar(`${data.category} product added to basket.`, {
      variant: "success",
      action: (key) => (
        <React.Fragment>
          <Button
            color="default"
            size="small"
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_BASKET",
                id: data.id,
              });

              // logged in user will save basket state into firestore
              // non-logged in user will save basket state into local storage
              auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                  const index = basket.findIndex(
                    (basketItem) => basketItem.id === data.id
                  );
                  let newBasket = [...basket];

                  if (index >= 0) {
                    newBasket.splice(index, 1);
                  }
                  db.collection("users").doc(user.uid).set({
                    basket: newBasket,
                  });
                }
              });
              enqueueSnackbar(`${data.category} removed from basket.`, { variant: "warning" });
              closeSnackbar(key);
            }}
          >
            Remove
          </Button>
          <Button
            color="default"
            size="small"
            onClick={() => closeSnackbar(key)}
          >
            Dismiss
          </Button>
        </React.Fragment>
      ),
    });
  };

  useEffect(() => {
    db.collection("items")
      .orderBy("category", "asc")
      .onSnapshot((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="__row home__row">
          {items.length > 0 ? (
            items.map((item, i) => {
              return (
                <div key={i} className="__col3">
                  <Product
                    id={item.id}
                    title={item.data.title}
                    price={item.data.price}
                    rating={item.data.rating}
                    image={item.data.image}
                    callback={handleClickWithAction({
                      id: item.id,
                      title: item.data.title,
                      category: item.data.category
                    })}
                  />
                </div>
              );
            })
          ) : (
            <>
              <div className="__col3">
                <Product loading />
              </div>
              <div className="__col3">
                <Product loading />
              </div>
              <div className="__col3">
                <Product loading />
              </div>
            </>
          )}
          {/* <div className="__col2">
            <Product
              id="12321341"
              title="The Lean Okays Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
              price={11.96}
              rating={5}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

// export default Home;

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={3}
      style={{ marginTop: "50px" }}
    >
      <Home />
    </SnackbarProvider>
  );
}
