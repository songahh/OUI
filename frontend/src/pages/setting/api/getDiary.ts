import { getAxios } from "src/api/util"

export const getDiary = async ( diaryId: any ) => {
    try{
        return await getAxios( `/diary/setting/${diaryId}` )
    }catch( err ){
        console.log( err )
    }
}

