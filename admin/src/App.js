import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";
import classes from "./App.module.css";
import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import EditUser from "./pages/EditUser/EditUser";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import Login from "./pages/Login/Login";
import { AuthContext } from "./store/auth/auth-context";
import ListMovies from "./pages/ListMovies/ListMovies";
import List from "./pages/List/List";
import NewList from "./pages/NewList/NewList";

function App() {
  const { token } = useContext(AuthContext);
  let routes;
  if (token) {
    routes = (
      <>
        <Topbar />
        <div className={classes.container}>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/users" exact>
              <UserList />
            </Route>
            <Route path="/users/:id">
              <EditUser />
            </Route>
            <Route path="/new-user">
              <NewUser />
            </Route>
            <Route path="/movies" exact>
              <ProductList />
            </Route>
            <Route path="/movies/:id">
              <Product />
            </Route>
            <Route path="/new-product">
              <NewProduct />
            </Route>
            <Route path="/lists" exact>
              <ListMovies />
            </Route>
            <Route path="/lists/:listId">
              <List />
            </Route>
            <Route path="/new-list">
              <NewList />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <>{routes}</>;
}

export default App;
