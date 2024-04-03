import { getAxios } from "src/api/util";

export const getExistDiary = async ( params: number ) => {
    try {
        return await getAxios( `/diary/today/${params}` )
    } catch( err ) {
        console.log( err );
    }
}
