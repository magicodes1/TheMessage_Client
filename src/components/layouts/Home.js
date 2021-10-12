import React, { useEffect, useContext, useState, useRef } from 'react';
import './css/styles.css';
import {
	start,
	getOnlineUser,
	logout,
	receiveMessage,
} from '../../signalr/SignalR';

import { GlobalContext } from '../../context/GlobalContext';

import Online from './Online/Online'
import Chat from './Chat/Chat'


function Home() {
	const { user, message} = useContext(GlobalContext);
	
	useEffect(() => {
		start();
		getOnlineUser(user);
		logout(user);
		receiveMessage(message);
	}, []);

	return (
		<div className='container-fluid pt-2'>
			<div className='row'>
				<div className='col-12 col-lg-4'>
					<Online/>
				</div>
				<div className='col-12 col-lg-8'>
					<Chat/>
				</div>
			</div>
		</div>
	);
}

export default Home;
