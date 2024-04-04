import { putAxios } from "src/api/util"

export const putModify = async ( diaryId:number, data: dataType ) => {
    try{
        return await putAxios( `/diary/setting/${diaryId}`, data )
    }catch( err ){
        console.log( err )
    }
}

interface dataType{
    name?: string,
    alarm?: string,
    templateId?: number,
    memberList?: []
}


