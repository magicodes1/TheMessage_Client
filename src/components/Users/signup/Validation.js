export default function Validation (values) {
	let error = {userName:'',password:'',confirmPassword:''};

	if (values.userName == '') {
		error.userName = 'User Name cannot be null.';
	} else if (values.password == '') {
		error.password = 'Password cannot be null.';
	}
    else if(values.confirmPassword==''){
        error.confirmPassword = 'Password confirmation cannot be null.';
    }
    else if(values.password!==values.confirmPassword){
        error.confirmPassword = 'Password confirmation do not match to password.';
    }
    return error;
};

