import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Adverts from './components/Adverts';
import Register from './components/Register';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Adverts} />
        <Route exact path='/register' component={Register} />
        <Route component={Adverts}/>
      </Switch>
      
    </Router>    
    
  );
}

export default App;
