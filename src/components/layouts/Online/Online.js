import React, { useState, useContext,useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Url from '../../../config/Url';
import { getOnlineUsers } from '../../../api/UserApi';

function Online() {
	const { user, auth } = useContext(GlobalContext);
    const [loadingUser, setLoadingUser] = useState(false);
    useEffect(() => {
       onlineUsers();
    }, [])


    async function onlineUsers() {
		setLoadingUser((pre) => (pre = !pre));
		const response = await getOnlineUsers(auth.auth.token);

		if (response && response.status == 200 && response.data.status) {
			user.userDispatch({ type: 'ADD_USERS', users: response.data.users });
		} else {
			console.log(response.message);
		}

		setLoadingUser((pre) => (pre = !pre));
	}

	return (
		<ul className='list-group list-group-horizontal table-responsive pt-3'>
			{user.user.map((val) => (
				<li className='list-group-item' key={val.id}>
					<ul className='nav'>
						<li className='nav-item'>
							<img
								width='55'
								src={`${Url.client}/assets/images/avatar.png`}
								className='rounded-circle'
								alt='...'
							/>
						</li>
						<li className='nav-item pl-5' style={{ paddingLeft: '5px' }}>
							<span className='text-center'>{val.userName}</span>
							{val.isOnline && <p className='text-success'>online</p>}
						</li>
					</ul>
				</li>
			))}
		</ul>
	);
}

export default Online;
