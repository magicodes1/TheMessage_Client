import React from 'react';
import useForm from './useForm';
import Validation from './Validation';
function Signup() {
	const { value, handleChange, handleSubmit, error, loading,handleKeyDown } =
		useForm(Validation);
	return (
		<div className='mt-5'>
			<h2 className='text-center text-uppercase text-success'>Sign Up</h2>
			<form>
				<div className='form-floating mb-3'>
					<input
						name='userName'
						type='text'
						className='form-control'
						placeholder='User Name'
						id='userName'
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
						name='password'
						type='password'
						className='form-control'
						placeholder='Password'
						id='password'
						onChange={handleChange}
						value={value.password}
					/>
					<label htmlFor='password'>Password</label>
					{error.password && (
						<div className='text-danger'>{error.password}</div>
					)}
				</div>

				<div className='form-floating mb-3'>
					<input
						name='confirmPassword'
						type='password'
						className='form-control'
						placeholder='Confirm password'
						id='confirmPassword'
						onChange={handleChange}
						value={value.confirmPassword}
						onKeyDown={handleKeyDown}
					/>
					<label htmlFor='confirmPassword'>Confirm password</label>
					{error.confirmPassword && (
						<div className='text-danger'>{error.confirmPassword}</div>
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
								className='spinner-border spinner-border-lg'
								role='status'
								aria-hidden='true'
							></span>
							Loading...
						</button>
					) : (
						<button
							className='btn btn-dark btn-lg text-uppercase'
							type='button'
							onClick={handleSubmit}
						>
							Sign up
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default Signup;
