import { putAxios } from "src/api/util"

export const putDeleteAll = async (  ) => {
    try{
        return await putAxios( '/alarm/deleteAll' )
    }catch( err ){
        console.log( err )
    }
}

