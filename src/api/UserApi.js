import Axios from '../config/Axios';
const sub = 'user';

export async function singup (userName,password){
    try {
        const response = await Axios({url:`${sub}/signup`,method:'POST',data:{userName,password,role:'USER'}});
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export async function sigin (userName,password){
    try {
        const response = await Axios({url:`${sub}/signin`,method:'POST',data:{userName,password}});
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export async function getOnlineUsers (token){
    try {
        const response = await Axios({url:`${sub}`,method:'GET',headers:{'Authorization':`Bearer ${token}`}});
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export async function logout (id){
    try {
        const response = await Axios({url:`${sub}/logout/${id}`,method:'GET'});
        return response;
    } catch (error) {
        return error.response.data;
    }
}