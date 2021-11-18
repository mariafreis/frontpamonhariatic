import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Estoque } from "../pages/Estoque";
import { Financas } from "../pages/Financas";
import { Login } from "../pages/Login";
import { Pessoas } from "../pages/Pessoas";
import { Usuarios } from "../pages/Usuarios";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={Estoque} path="/estoque" />
      <Route component={Financas} path="/financas" />
      <Route component={Pessoas} path="/pessoas" />
      <Route component={Usuarios} path="/usuarios" />
    </Switch>
  );
};
