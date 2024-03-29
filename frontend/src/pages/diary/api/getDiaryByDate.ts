import { getAxios } from "src/api/util";

export const getDiaryByDate = async ( params: { diaryId: number, date: string } ) => {
    try {
        return await getAxios( `/diary/${params.diaryId}/${params.date}` )
    } catch( err ) {
        if(err.response && err.respose.status === 403) {
            return null;
        }
    }
}
