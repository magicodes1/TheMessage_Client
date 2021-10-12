import React, { useReducer } from 'react';
import { GlobalContext } from './GlobalContext';
import Initial from '../resources/Initial';
import AuthReducer from '../reducers/AuthReducer';
import UserReducer from '../reducers/UserReducer';
import MessageReducer from '../reducers/MessageReducer';

function ChatContext({ children }) {
	const [auth, authDispatch] = useReducer(AuthReducer, Initial.auth);
	const [user, userDispatch] = useReducer(UserReducer, Initial.onlineUsers);
	const [message, messageDispatch] = useReducer(MessageReducer, Initial.messages);
	const val = { auth: { auth, authDispatch }, user: { user, userDispatch },message:{message,messageDispatch} };
	return (
		<GlobalContext.Provider value={val}>{children}</GlobalContext.Provider>
	);
}

export default ChatContext;
