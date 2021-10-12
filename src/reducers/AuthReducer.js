function AuthReducer(state,action) {
    switch (action.type) {
		case 'AUTHENTICATION': {
			const data = action.data;
			const auth = {
				...state,
				userId: data.userId,
				userName: data.userName,
				isAuth: !state.isAuth,
				token: data.token,
			};
			localStorage.setItem('auth', JSON.stringify(auth));

			return auth;
		}
		case 'REMOVE_AUTHENTICATION': {
			localStorage.setItem('auth', JSON.stringify({}));
			return {};
		}
		default: {
			return state;
		}
	}
}

export default AuthReducer
