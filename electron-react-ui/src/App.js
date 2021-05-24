import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import AddLogItem from './components/AddLogItem'
import LogItems from './components/LogItems'
import Sidebar from './components/sidebar/Sidebar'
import ContextArea from './components/contextArea/ContextArea'
import Home from './components/Home'

import { GlobalProvider } from './context/GlobalState'

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <ContextArea>
          <Sidebar />
          <Container>
            <Home />
            <Switch>
              <Route path="/list" exact component={LogItems} />
              <Route path="/add" exact component={AddLogItem} />
            </Switch>
          </Container>
        </ContextArea>
      </Router>
    </GlobalProvider>
  )
}

export default App
