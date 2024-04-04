import { getAxios } from "src/api/util"

export const getMyInfo = async () => {
    try{
        return await getAxios( `/member` )
    }catch( err ){
        console.log( err )
    }
}