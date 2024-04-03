import { putAxios } from "src/api/util";


export const putMyInfo = async( data: DataType ) => {
    
    try{
        return await putAxios(`/member`, { file: data.ImgUrl, memberNickname: data.memberNickname}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },})
    }catch( err ){
        console.log(err)
    }
}

interface DataType {
    memberNickname: string,
    ImgUrl: FormData,
}