import { getAxios } from "src/api/util"

export const getLogin = async ( params: String ) => {
    try{
        return await getAxios(`/auth/login/kakao?code=${params}` )
    }catch( err ){
        console.log( err )
    }
}
