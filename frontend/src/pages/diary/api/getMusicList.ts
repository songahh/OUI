import { getAxios } from "src/api/util";

export const getMusicList = async ( dailyDiaryId: number ) => {
    try {
        return await getAxios( `/diary/music/${dailyDiaryId}` )
    } catch( err ) {
        console.log(err);
    }
}
