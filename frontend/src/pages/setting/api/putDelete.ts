import { putAxios } from "src/api/util"

export const putDelete = async ( diaryId:number ) => {
    try{
        return await putAxios( `/diary/${diaryId}/delete` )
    }catch( err ){
        console.log( err )
    }
}


