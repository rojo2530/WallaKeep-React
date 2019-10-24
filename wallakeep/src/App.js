import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from './contexts/user';
import Adverts from './components/Adverts';
import Register from './components/Register';
import NewAdvert from './components/NewAdvert';
import DetailAdvert from './components/DetailAdvert';
import ErrorBoundary from './components/ErrorBoundary';
import Error404 from './components/Error404';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: {},
      updateUser: this.updateUser
    };
    
	}

	updateUser(user) {
    this.setState({ user })
	}
	
  render () {
    return (
			<ErrorBoundary >
				<UserProvider value={this.state}>
					<Router>
						<Switch>
							<Route exact path='/' component={Adverts} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/advert/detail/:id' component={DetailAdvert} />
							<Route key='add-advert' exact path='/advert/create' component={NewAdvert} />
							<Route key='edit-advert' exact path='/advert/edit/:id' component={NewAdvert} />
							<Route component={Error404}/>
						</Switch>
						
					</Router>
				</UserProvider>  
			</ErrorBoundary>  
    );
  }
}

