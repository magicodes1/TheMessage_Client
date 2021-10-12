import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
const PrivateRoute = ({ children, ...rest }) => {
	const {auth} = useContext(GlobalContext);
	const isAuth = auth.auth.isAuth;
	
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					children
				) : (
					<Redirect to={{ pathname: '/signin', state: { from: location } }} />
				)
			}
		/>
	);
};

export default PrivateRoute;
