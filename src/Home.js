import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Layout.css";
import Product from "./Product";
import { db } from "./firebase";

function Home() {
  const [items, setItems] = useState([]);

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
          {items.map((item, i) => {
            console.log(item.data.category);
            return (
              <div key={i} className="__col3">
                <Product
                  id={item.id}
                  title={item.data.title}
                  price={item.data.price}
                  rating={item.data.rating}
                  image={item.data.image}
                />
              </div>
            );
          })}
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

export default Home;
