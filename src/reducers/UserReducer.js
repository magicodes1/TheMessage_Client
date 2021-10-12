function UserReducer(state, action) {
	switch (action.type) {
        case 'ADD_USERS':{
            const users = action.users;
            return [...users];
        }
        case 'USERS':{
            return [...state];
        }
		case 'ADD_USER': {
			const user = action.user;
			return [...state, user];
		}
        case 'REMOVE_USER': {
			const userId = action.userId;
			return [...state.filter(p=>p.id!=userId)];
		}
		default: {
			return state;
		}
	}
}

export default UserReducer;
