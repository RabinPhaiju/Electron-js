import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import AddLogItem from "./components/AddLogItem";
import LogItems from "./components/LogItems";
import Header from "./components/header/Header";
import Home from "./components/Home";

import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Container>
          <Home />

          <Switch>
            <Route path='/list' exact component={LogItems} />
            <Route path='/add' exact component={AddLogItem} />
          </Switch>
        </Container>
      </Router>
    </GlobalProvider>
  );
};

export default App;
