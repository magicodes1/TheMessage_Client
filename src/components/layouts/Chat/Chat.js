import React, { useContext, useEffect, useState, useRef } from 'react';
import Url from '../../../config/Url';
import { GlobalContext } from '../../../context/GlobalContext';

import { send, messages } from '../../../api/MessageApi';

import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/twitter.json';
import { Emoji, NimblePicker } from 'emoji-mart';

function Chat() {
	const { user, message, auth } = useContext(GlobalContext);

	const [loadingMessage, setLoadingMessage] = useState(false);
	const [loadingSendMessage, setLoadingSendMessage] = useState(false);

	const [messageContent, setMessageContent] = useState('');

	const [images, setImages] = useState([]);
	const [previewImg, setPreviewImg] = useState([]);

	const [emoji, setEmoji] = useState(false);

	const ref = useRef();

	useEffect(() => {
		getMessages();
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [message.message, loadingMessage]);

	async function getMessages() {
		setLoadingMessage((pre) => (pre = !pre));

		const response = await messages(auth.auth.token);
		console.log(response);
		if (response && response.status == 200 && response.data.status) {
			message.messageDispatch({
				type: 'ADD',
				messages: response.data.messages,
			});
		} else {
			console.log(response.message);
		}

		setLoadingMessage((pre) => (pre = !pre));
	}

	function getCurrentDay() {
		const date = new Date();
		const y = date.getFullYear();
		const m =
			(date.getMonth() + 1).toString().length == 1
				? `0${date.getMonth() + 1}`
				: date.getMonth() + 1;
		const d =
			date.getDate().toString().length == 1
				? `0${date.getDate()}`
				: date.getDate();
		const h =
			date.getHours().toString().length == 1
				? `0${date.getHours()}`
				: date.getHours();
		const mn =
			date.getMinutes().toString().length == 1
				? `0${date.getMinutes()}`
				: date.getMinutes();
		return `${y}-${m}-${d}T${h}:${mn}`;
	}

	async function sendMessage() {
		if (!messageContent) return;

		setLoadingSendMessage((pre) => (pre = !pre));
		const my = user.user.find((p) => p.id == auth.auth.userId);
		const formData = new FormData();

		formData.append('message', messageContent);
		formData.append('time', getCurrentDay());
		formData.append('id', auth.auth.userId);
		formData.append('userName', auth.auth.userName);
		formData.append('isOnline', my ? my.isOnline : false);

		for (const image of images) {
			formData.append('images', image);
		}

		const response = await send(formData, auth.auth.token);
		console.log(response);
		if (response && response.status == 200 && response.data.status) {
			setMessageContent((pre) => (pre = ''));
			setImages((pre) => (pre = []));
			setPreviewImg((pre) => (pre = []));
		} else {
			console.log(response.message);
		}

		setLoadingSendMessage((pre) => (pre = !pre));
	}

	function showTime(time) {
		const date = Date.parse(time);
		const gettime = new Date(date);

		return `${gettime.getFullYear()}/${
			gettime.getMonth() + 1
		}/${gettime.getDate()} ${gettime.getHours()}:${gettime.getMinutes()}`;
	}

	function scrollToBottom() {
		ref.current && (ref.current.scrollTop = ref.current.scrollHeight);
	}

	function onChangeImages(e) {
		e.target.files &&
			setImages((pre) => (pre = [...Array.from(e.target.files)]));

		for (const image of e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				var result = e.target.result;
				setPreviewImg((pre) => (pre = [...pre, result]));
			};
			reader.readAsDataURL(image);
		}
	}

	return (
		<div className='chat'>
			<div className='head-chat'>
				<h5>Global chat</h5>
			</div>
			<div className='scroll-content' ref={ref}>
				{loadingMessage ? (
					<div
						className='content-chat d-flex justify-content-center'
						style={{ alignItems: 'center', height: '500px' }}
					>
						<div className='d-flex justify-content-center'>
							<div className='spinner-border' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</div>
						</div>
					</div>
				) : (
					<div id='content-chat' className='content-chat'>
						{message.message.length > 0 &&
							message.message.map((val) => {
								if (val.user.id == auth.auth.userId) {
									return (
										<div className='my-message-wrap' key={val.messageId}>
											<div className='my-zone'>
												<p className='my-message'>{val.messageContent}</p>
											</div>
											<div className='message-images'>
												{val.medias &&
													val.medias.map((val) => (
														<img
															src={`data:image/png;base64,${val.mediaContent}`}
															key={val.mediaContent}
														/>
													))}
											</div>
											<p className='time' align='right'>
												{showTime(val.time)}
											</p>
										</div>
									);
								} else {
									return (
										<div key={val.messageId}>
											<div className='outgoing-zone'>
												<div className='avatar-chat'>
													<img
														width='40'
														src={`${Url.client}/assets/images/avatar.png`}
														className='rounded-circle'
														alt='...'
													/>
												</div>
												<p className='outgoing-message'>
													<span className='userName'>{val.user.userName}</span>
													{val.messageContent}
												</p>
											</div>
											<div className='outgoing-message-images'>
												<div>
													{val.medias &&
														val.medias.map((val) => (
															<img
																src={`data:image/png;base64,${val.mediaContent}`}
																key={val.mediaContent}
															/>
														))}
												</div>
											</div>
											<p className='time'>{showTime(val.time)}</p>
										</div>
									);
								}
							})}
					</div>
				)}
			</div>
			<div className='foot-chat'>
				<input
					className='form-control input-chat'
					type='text'
					placeholder='type your message...'
					value={messageContent}
					onChange={(e) => setMessageContent((pre) => (pre = e.target.value))}
					onKeyDown={(e) => e.key == 'Enter' && sendMessage()}
				/>
				<button className='attach-img'>
					<input
						type='file'
						id='images'
						name='images'
						className='images'
						multiple
						onChange={onChangeImages}
					/>
					<label htmlFor='images'>
						<img src={`${Url.client}/assets/images/attach-img.png`} />
					</label>
				</button>
				<NimblePicker
					className='emoji-picker'
					style={{
						display: emoji ? 'block' : 'none',
					}}
					data={data}
					set='twitter'
					defaultSkin={3}
					title='Pick your emoji'
					emoji='thumbsup'
					onSelect={(e) => {
						const { props } = <Emoji emoji={e} size={20} native={true} />;
						const emoji = props.emoji.native;
						setMessageContent((pre) => (pre = `${pre} ${emoji}`));
					}}
				/>
				<button
					className='emoji-picker-btn'
					onClick={() => setEmoji((pre) => (pre = !pre))}
				>
					<img src={`${Url.client}/assets/images/emoji-picker.png`} />
				</button>
				{loadingSendMessage ? (
					<button className='btn color' type='button' disabled>
						<span
							className='spinner-border spinner-border-sm'
							role='status'
							aria-hidden='true'
						></span>
					</button>
				) : (
					<button
						className='btn color'
						type='submit'
						onClick={() => sendMessage()}
					>
						<img src={`${Url.client}/assets/images/send.png`} />
					</button>
				)}
			</div>
			{previewImg.length > 0 && (
				<div className='preview-images'>
					{
						<ul className='nav'>
							{previewImg.map((val) => (
								<li
									className='nav-item'
									style={{ paddingRight: '5px' }}
									key={val}
								>
									<img src={val} alt='..' width='70' />
								</li>
							))}
						</ul>
					}
				</div>
			)}
		</div>
	);
}

export default Chat;
