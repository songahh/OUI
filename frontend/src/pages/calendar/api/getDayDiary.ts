import { getAxios } from "src/api/util"

export const getDayDiary = async ( data: dataType ) => {
    try{
        return await getAxios( `/calendar/${data.diaryId}/day`, { date: data.date })
    }catch( err ){
        console.log( err )
    }
}

interface dataType{
    diaryId: number,
    date: string,
}