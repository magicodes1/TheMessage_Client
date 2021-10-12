import React from 'react';
import ChatContext from './context/ChatContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/Users/User';
import HomeWrapper from './components/HomeWrapper';
import PrivateRoute from './Routes/PrivateRoute'
function App() {
	return (
		<ChatContext>
			<Router>
				<Switch>
					<Route path='/signin' component={User}/>
					<Route path='/signup' component={User}/>
					
					<PrivateRoute path='/'>
						<HomeWrapper/>
					</PrivateRoute>
				</Switch>
			</Router>
		</ChatContext>
	);
}

export default App;
