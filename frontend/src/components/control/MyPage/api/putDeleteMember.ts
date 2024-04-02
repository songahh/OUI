import { putAxios } from "src/api/util"

export const putDeleteMember = async ( ) => {
    try{
        return await putAxios( `/auth` )
    }catch( err ){
        console.log( err )
    }
}


