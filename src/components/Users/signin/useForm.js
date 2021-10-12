import { useState, useContext } from 'react';
import { sigin } from '../../../api/UserApi';
import { GlobalContext } from '../../../context/GlobalContext';

function useForm(Validation) {
	const [value, setValue] = useState({
		userName: '',
		password: '',
	});
	const [error, setError] = useState({
		userName: '',
		password: '',
		unCompleted: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValue((pre) => ({ ...pre, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = Validation(value);
		setError((pre) => (pre = errors));

		if (errors.userName || errors.password || errors.confirmPassword) {
			return;
		}
		signin(value.userName, value.password);
	};

	const handleKeyDown = (e) => {
		if(e.key=='Enter'){
			signin(value.userName,value.password);
		}
	}
	

	const { auth } = useContext(GlobalContext);

	async function signin(userName, password) {
		setLoading((pre) => (pre = !pre));

		const response = await sigin(userName, password);

		if (response && response.status == 200 && response.data.status) {
			setValue(
				(pre) =>
					(pre = { ...pre, userName: '', password: '', confirmPassword: '' })
			);
			setError(
				(pre) =>
					(pre = {
						...pre,
						userName: '',
						password: '',
						confirmPassword: '',
						unCompleted: '',
					})
			);
			auth.authDispatch({
				type: 'AUTHENTICATION',
				data: {
					userId: response.data.user.id,
					userName: response.data.user.userName,
					token: response.data.token,
				},
			});
			setLoading((pre) => (pre = !pre));
			return;
		}
		const error = response.Message;
		setError((pre) => (pre = { ...pre, unCompleted: error }));
		setLoading((pre) => (pre = !pre));
	}

	return {
		value,
		handleChange,
		handleSubmit,
		handleKeyDown,
		error,
		loading,
	};
}

export default useForm;
