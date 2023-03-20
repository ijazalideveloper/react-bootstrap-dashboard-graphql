import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Login from "../src/views/Login/login";
import { useSelector } from "react-redux";
function Component() {
  const auth = useSelector((state) => state.auth);

  return (
    <Switch>
      {/* <Route path='/admin' render={(props) => <AdminLayout {...props} />} /> */}

      <Route
        path="/"
        exact={true}
        render={(props) => {
          return !auth.isLoggedIn ? (
            <Redirect from="/" to="/login" />
          ) : (
            <Redirect from="/" to="/admin/users" />
          );
        }}
      ></Route>
      <Route
        path="/login"
        exact={true}
        render={(props) => {
          return !auth.isLoggedIn ? (
            <Login {...props} />
          ) : (
            <Redirect from="/login" to="/admin/users" />
          );
        }}
      ></Route>
      <Route
        path="/admin"
        render={(props) => {
          return !auth.isLoggedIn ? (
            <Redirect from="/admin" to="/login" />
          ) : (
            <AdminLayout {...props} />
          );
        }}
      ></Route>
    </Switch>
  );
}

Component.defaultProps = {};
Component.displayName = "App";
export const App = Component;
export default App;
