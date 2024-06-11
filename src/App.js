import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/video/:id" component={VideoItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
