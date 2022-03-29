import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import { Login } from "components/views/Login";
import { RegisterGuard } from "components/routing/routeProtectors/RegisterGuard";
import { Register } from "components/views/Register";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <RegisterGuard>
            <Register />
          </RegisterGuard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
