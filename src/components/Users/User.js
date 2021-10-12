import React from 'react';
import Signin from './signin/Signin';
import Signup from './signup/Signup';
import { Switch, Route } from 'react-router-dom';
function User() {
	return (
		<div className='container-fluid'>
			<div className='row justify-content-center'>
				<div className='col-12 col-sm-8 col-md-5 col-lg-4 col-xl-3'>
					<Switch>
						<Route path='/signin' component={Signin} />
						<Route path='/signup' component={Signup} />
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default User;
