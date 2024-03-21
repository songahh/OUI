import axios from 'axios';


const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    timeout: 10000
});


export const getLogin = async( params: String ) => {
    try {
        const res = await api.get( '/auth/login/kakao', {
            params: {
                code: params
            }
        });
        
        return res
    } catch ( err ) {
        console.log(err)
        throw err;
    }
}