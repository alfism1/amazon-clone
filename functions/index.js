/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_qtUcpp5YMY2ErTIBMp0zdhUY0088GAG8Nf");
const fs = require("fs");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// API
// - App Config
const app = express();

// - Middlewares
app.use(cors());
app.use(express.json());

// - API routes
app.get("/", (_request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.get("/generateitems", async (_request, response) => {
  // remove previous items
  await deleteCollection(db, "items", 50);
  // read items.json
  const rawdata = fs.readFileSync("items.json");
  const items = JSON.parse(rawdata);
  // insert to firestore
  await items.forEach(async (item) => {
    // Get the `FieldValue` object
    const FieldValue = admin.firestore.FieldValue;
    item.timestamp = FieldValue.serverTimestamp();
    const res = await db.collection("items").doc().set(item);
  });

  response.status(200).send(items);
});
app.get("/items", async (_request, response) => {
  let items;
  const snapshot = db.collection("items").onSnapshot((snapshot) => {
    items = snapshot.docs.map((doc) => (doc.id));
    // items = 444;
    items.forEach((i) => {
      console.log(i);
    });
    response.status(200).send(items);
  });

  // response.status(200).send(321);
});

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/challenge-c05bd/us-central1/api

// Run locally ==> firebase emulators:start
// Deploy to firebase ==> firebase deploy --only functions
