import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store/AuthProvider";
import { AuthProvider } from "./store/auth/AuthProvider";
import { MovieContextProvider } from "./store/movie/MovieContext";
import { ListContextProvider } from "./store/lists/ListContext";

ReactDOM.render(
  <AuthProvider>
    <MovieContextProvider>
      <ListContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ListContextProvider>
    </MovieContextProvider>
  </AuthProvider>,
  document.getElementById("root")
);
