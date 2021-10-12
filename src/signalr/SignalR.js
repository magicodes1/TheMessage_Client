import { HubConnectionBuilder,HubConnectionState } from '@microsoft/signalr';
import Url from '../config/Url';

const connect = new HubConnectionBuilder()
	.withUrl(`${Url.server}/chathub`)
	.withAutomaticReconnect()
	.build();

export async function start() {
	try {
		if(connect.state!=HubConnectionState.Disconnected){
			return;
		}
		await connect.start();
		console.log('signalR connected');
	} catch (error) {
		console.log(error);
		setTimeout(start, 5000);
	}
}

export function getOnlineUser(user) {
	connect.on('online', (data) => {
		user.userDispatch({ type: 'ADD_USER', user: data });
	});
}

export function logout(user) {
	connect.on('offline', (data) => {
		user.userDispatch({ type: 'REMOVE_USER', userId: data });
	});
}

export function receiveMessage(message) {
	connect.on('message', (data) => {
		message.messageDispatch({ type: 'ADD_MESSAGE', message: data });
	});
}
