import "./App.scss";
import FullScreen from "./pages/FullScreenMovie/FullScreen";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies">
          <Home type="movie" />
        </Route>
        <Route path="/series">
          <Home type="series" />
        </Route>
        <Route path="/watch">
          <FullScreen />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Redirect to="/register" />
      </Switch>
    );
  }

  return <>{routes}</>;
}

export default App;
