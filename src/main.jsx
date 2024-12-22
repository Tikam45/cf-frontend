import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {configureStore} from "@reduxjs/toolkit"
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducer/reducer.js'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <Toaster/>
    <App />
  </BrowserRouter>
  </Provider>
);
