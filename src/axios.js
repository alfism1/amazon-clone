import axios from "axios";

const instance = axios.create({
  // baseURL : "http://localhost:5001/challenge-c05bd/us-central1/api"
  baseURL : "https://us-central1-challenge-c05bd.cloudfunctions.net/api"
});

export default instance;