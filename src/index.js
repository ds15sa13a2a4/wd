import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { setAuthorizationToken } from "./helpers/setAuthorizationToken";
//redux config 
import { Provider } from "react-redux";
import store from './helpers/store';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

if (token) {
  setAuthorizationToken(token);

}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Provider store={store}><App /></Provider>)
