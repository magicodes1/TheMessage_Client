export default function Validation (values) {
	let error = {userName:'',password:''};

	if (values.userName == '') {
		error.userName = 'User Name cannot be null.';
	} else if (values.password == '') {
		error.password = 'Password cannot be null.';
	}
    return error;
};

