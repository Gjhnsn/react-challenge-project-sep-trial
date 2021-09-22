import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Main, Login, OrderFormHook, ViewOrdersHook } from "../components";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { useSelector } from "react-redux";

// import { PrivateRoute } from "./PrivateRoute";

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (to.meta?.token === '12345luggage') {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};

const AppRouter = (props) => {

  const token = useSelector((state) => state.login.token);

  return (
    <BrowserRouter>
      <GuardProvider guards={[requireLogin]}>
          <GuardedRoute path="/" exact component={Main} />
          <GuardedRoute path="/login" exact component={Login} />
          <GuardedRoute
            path="/order"
            exact
            component={OrderFormHook}
            meta={{ auth: true, token }}
          />
          <GuardedRoute
            path="/view-orders"
            exact
            component={ViewOrdersHook}
            meta={{ auth: true, token }}
          />
      </GuardProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
