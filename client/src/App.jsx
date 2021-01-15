import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';


function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route path='/'>
        <Home />
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
