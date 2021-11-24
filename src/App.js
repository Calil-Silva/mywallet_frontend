import { GlobalStyle } from "../src/styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UpsertUser from "./routes/UpsertUser";
import Balances from "./routes/Balances";
import AddEntry from "./routes/AddEntry";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={UpsertUser} exact />
        <Route path="/:userStatus" component={UpsertUser} exact />
        <Route path="/:userStatus/:user" component={Balances} exact />
        <Route
          path="/:userStatus/:user/:entryType"
          component={AddEntry}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}
