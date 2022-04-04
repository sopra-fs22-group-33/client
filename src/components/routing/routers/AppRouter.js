import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Welcome } from "components/views/Welcome";
import { AuthGuard } from "components/routing/routeProtectors/AuthGuard";
import { Login } from "components/views/Login";
import { Register } from "components/views/Register";
import { AppGuard } from "components/routing/routeProtectors/AppGuard";
import { UserRouter } from "components/routing/routers/UserRouter";
import { TeamRouter } from "./TeamRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route exact path="/login">
          <AuthGuard>
            <Login />
          </AuthGuard>
        </Route>
        <Route exact path="/register">
          <AuthGuard>
            <Register />
          </AuthGuard>
        </Route>
        <Route path="/user">
          <AppGuard>
            <UserRouter base="/user"/>
          </AppGuard>
        </Route>
        <Route path="/team">
          <AppGuard>
            <TeamRouter base="/team"/>
          </AppGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;