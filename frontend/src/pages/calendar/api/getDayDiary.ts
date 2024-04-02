import { getAxios } from "src/api/util"

export const getDayDiary = async ( data: dataType ) => {
    try{
        if(data?.dailyId.length===0) return
        
        const res =  await getAxios( `/calendar/${data.diaryId}/day?${data.dailyId.map(d => `dailyId=${d}&`).join('')}` )
        return res;
    }catch( err ){
        console.log( err )
    }
}

interface dataType{
    diaryId: number,
    dailyId: number[]
}