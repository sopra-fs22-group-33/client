import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import { Login } from "components/views/Login";
import { RegisterGuard } from "components/routing/routeProtectors/RegisterGuard";
import { Register } from "components/views/Register";
import { MainGuard } from "components/routing/routeProtectors/MainGuard";
import { MainRouter } from "components/routing/routers/MainRouter"

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
        <Route path="/calendar">
          <MainGuard>
            <MainRouter base="/calendar" />
          </MainGuard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
