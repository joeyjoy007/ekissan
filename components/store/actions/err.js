import { CLEAR_ERROR, GET_ERRORS } from "./Types"

export const returnAction = (msg,status,id)=>{
    return{
        type:GET_ERRORS,
        payload:{msg,status,id}
    }
}

export const clearError = ()=>{
    return{
        type:CLEAR_ERROR
    }
}