import React, { useContext } from 'react';
import useForm from './useForm';
import Validation from './Validation';
import { useLocation, Redirect,Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalContext';
function getPath() {
	const location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	return from;
}

function Signin() {
	const { value, error, loading, handleChange, handleSubmit,handleKeyDown } =
		useForm(Validation);

	const path = getPath();

	const { auth } = useContext(GlobalContext);

	if (auth.auth.isAuth) {
		return <Redirect to={path} />;
	}

	return (
		<div className='mt-5'>
			<h2 className='text-center text-uppercase text-success'>Sign In</h2>
			<form>
				<div className='form-floating mb-3'>
					<input
						type='userName'
						className='form-control'
						placeholder='User Name'
						id='userName'
						name='userName'
						onChange={handleChange}
						value={value.userName}
					/>
					<label htmlFor='userName'>User name</label>
					{error.userName && (
						<div className='text-danger'>{error.userName}</div>
					)}
				</div>
				<div className='form-floating mb-3'>
					<input
						type='password'
						className='form-control'
						placeholder='Password'
						id='password'
						name='password'
						onChange={handleChange}
						value={value.password}
						onKeyDown={handleKeyDown}
					/>
					<label htmlFor='password'>Password</label>
					{error.password && (
						<div className='text-danger'>{error.password}</div>
					)}
				</div>
				{error.unCompleted && (
					<div className='text-danger mb-2'>{error.unCompleted}</div>
				)}

				<div className='d-grid gap-2'>
					{loading ? (
						<button
							className='btn btn-dark btn-lg text-uppercase'
							type='button'
							disabled
						>
							<span
								className='spinner-border spinner-border-md'
								role='status'
								aria-hidden='true'
							></span>
							 Loading...
						</button>
					) : (
						<button
							onClick={handleSubmit}
							className='btn btn-dark btn-lg text-uppercase'
							type='button'
						>
							Sign in
						</button>
					)}
				</div>
			</form>
			<p>if you do not have an account <Link className='nav-link' to='/signup' style={{display:'inline'}}>Join Us</Link></p>
		</div>
	);
}

export default Signin;
