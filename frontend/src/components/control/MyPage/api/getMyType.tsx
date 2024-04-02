import { getAxios } from "src/api/util"

export const getMyType = async () => {
    try{
        return await getAxios( `/survey/type` )
    }catch( err ){
        console.log( err )
    }
}