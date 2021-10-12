const Initial = {
	auth: localStorage.getItem('auth')
		? JSON.parse(localStorage.getItem('auth'))
		: {
				userId: '',
				userName: '',
				token: '',
				isAuth: false,
		  },
	onlineUsers:[],
	messages:[]
};

export default Initial;
