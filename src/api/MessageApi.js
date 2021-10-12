import Axios from '../config/Axios';
const sub = 'message';

export async function messages(token) {
    try {
        const response = await Axios({url:`${sub}`,method:'GET',headers:{'Authorization':`Bearer ${token}`}});
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export async function send(data,token) {
    try {
        const response = await Axios({url:`${sub}`,method:'POST',data:data,headers:{'Authorization':`Bearer ${token}`}});
        return response;
    } catch (error) {
        return error.response.data;
    }
}