import './App.scss';
import Front from './page/frontpage/Front';
import FrontPage from './page/frontpage/FrontPage';
import DevTools from './page/frontpage/DevTools';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/devtools" exact component={DevTools} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
