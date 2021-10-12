import { useState } from 'react';
import { singup } from '../../../api/UserApi';

import { useHistory } from 'react-router-dom';

function useForm(Validation) {
	const [value, setValue] = useState({
		userName: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState({
		userName: '',
		password: '',
		confirmPassword: '',
		unCompleted: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValue((pre) => ({ ...pre, [name]: value }));
	};

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = Validation(value);
		setError((pre) => (pre = errors));

		if (errors.userName || errors.password || errors.confirmPassword) {
			return;
		}
		enrolling(value.userName, value.password);
	};

	const handleKeyDown = (e) => {
		if(e.key=='Enter'){
			enrolling(value.userName,value.password);
		}
	}
	

	async function enrolling (userName,password){
		setLoading((pre) => (pre = !pre));

		const response = await singup(userName,password);
		
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
			setLoading((pre) => (pre = !pre));
			history.push('/signin');
			return;
		}
		const error = response.Message;
		setLoading((pre) => (pre = !pre));
		setError((pre) => (pre = { ...pre, unCompleted: error }));
	};

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
