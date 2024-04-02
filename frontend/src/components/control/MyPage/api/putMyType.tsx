import { putAxios } from "src/api/util"

export const putMyType = async ( type:string ) => {
    try{
        return await putAxios( `/survey/update`, { type: type} )
    }catch( err ){
        console.log( err )
    }
}


