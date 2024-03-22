import { postAxios } from "src/api/util";

export const postDiaryDeco = async ( data: dataType ) => {
    try {
        return await postAxios(`/diary/decorate/${data.dailyDiaryId}`, { diaryId: data.diaryId, decoration: data.decoration });
    } catch ( err ) {
        throw err;
    }
}

interface dataType {
    dailyDiaryId: number, 
    diaryId: number,
    decoration: string,
}