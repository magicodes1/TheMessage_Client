import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { logout } from '../../api/UserApi';

function Header() {
	const { auth, user } = useContext(GlobalContext);

	async function logoutUser() {
		const response = await logout(auth.auth.userId);

		if (response && response.status == 200 && response.data.status) {
			auth.authDispatch({ type: 'REMOVE_AUTHENTICATION' });
			user.userDispatch({ type: 'REMOVE_USER', userId: auth.auth.userId });
		} else {
			console.log(response.message);
		}
	}
	return (
		<nav className='navbar navbar-expand-md navbar-light bg-light'>
			<div className='container-fluid'>
				<a className='navbar-brand'>the message</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='offcanvas'
					data-bs-target='#offcanvasNavbar'
					aria-controls='offcanvasNavbar'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='offcanvas offcanvas-end'
					tabIndex='-1'
					id='offcanvasNavbar'
					aria-labelledby='offcanvasNavbarLabel'
				>
					<div className='offcanvas-header'>
						<button
							type='button'
							className='btn-close text-reset float-right'
							data-bs-dismiss='offcanvas'
							aria-label='Close'
						></button>
					</div>
					<div className='offcanvas-body'>
						<ul className='navbar-nav justify-content-end flex-grow-1 pe-3'></ul>
						<div className='d-flex'>
							{auth.auth.isAuth && (
								<h4
									className='text-uppercase pt-2 pr-2'
									style={{ paddingRight: '5px' }}
								>
									{auth.auth.userName}
								</h4>
							)}
							<button
								className='btn btn-success ml-2'
								type='submit'
								onClick={() => logoutUser()}
							>
								logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Header;
