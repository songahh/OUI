import { getAxios } from "src/api/util"

export const getDiaryTitle = async ( diaryId: number ) => {
    try{
        const res =  await getAxios( `/diary/title/${diaryId}` )
        return res;
    }catch( err ){
        console.log( err )
    }
}
