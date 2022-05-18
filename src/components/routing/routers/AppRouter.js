import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Welcome } from "components/views/Welcome";
import { AuthGuard } from "components/routing/routeProtectors/AuthGuard";
import { Login } from "components/views/Login";
import { Register } from "components/views/Register";
import { AppGuard } from "components/routing/routeProtectors/AppGuard";
import { UserRouter } from "components/routing/routers/UserRouter";
import { TeamRouter } from "./TeamRouter";
import { TeamGuard } from "../routeProtectors/TeamGuard";
import Header from "../../views/Header";
import { GameRouter } from "./GameRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header height={"100"} />
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
            <UserRouter base="/user" />
          </AppGuard>
        </Route>
        <Route path="/team">
          <AppGuard>
            <TeamGuard>
              <TeamRouter base="/team" />
            </TeamGuard>
          </AppGuard>
        </Route>
        <Route path="/game">
          <AppGuard>
            <GameRouter base="/game" />
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
