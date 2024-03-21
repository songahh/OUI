import { postAxios } from 'src/api/util'

interface dataType{
    title: String,
    content: String,
    date: Date
}

const postTodo = async (data:dataType) => {
    try{
        const response = await postAxios('/schedule/my', data);
        return response
    }catch(err){
        throw err
    }
}