import axios from 'axios';
import Url from './Url'
const instance = axios.create({
    baseURL:`${Url.server}/api`
})

export default instance;