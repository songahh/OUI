import { getAxios } from "src/api/util"

export const getCalendar = async ( params: Date ) => {
    try{
        console.log(params)
        return await getAxios( '/calendar/my', params )
    }catch( err ){
        console.log( err )
    }
}
