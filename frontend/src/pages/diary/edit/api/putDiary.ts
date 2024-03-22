import { putAxios } from 'src/api/util'

interface dataType{
    dailyDiaryId: String,
    dailyDate: Date,
    dailyContent: String
}

export const putDiary = async (data:dataType) => {
    try{
        const response = await putAxios(`/diary/${data.dailyDiaryId}`, data);
        return response
    }catch(err){
        throw err
    }
}