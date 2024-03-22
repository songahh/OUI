import axios from "axios"


export const getLogin = async ( params: String ) => {
    try{        
        return await axios.get( `/auth/login/kakao?code=${params}`)
    }catch( err ){
        console.log( err )
    }
}
