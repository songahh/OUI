import { postAxios } from 'src/api/util'



export const postTodo = async (data:dataType) => {
    try{
        const response = await postAxios('/schedule/my', data);
        return response
    }catch(err){
        throw err
    }
}

interface dataType{
    title: String,
    content: String,
    date: String
}