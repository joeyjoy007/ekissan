import { CLEAR_ERROR, GET_ERRORS } from "../actions/Types"

const initial = {}

export default(state=initial,{payload,type})=>{
    switch(type){
       case GET_ERRORS:
           return{
               msg:payload.msg,
               status:payload.status,
               id:payload.id
           };
           case CLEAR_ERROR:
               return {
                   msg:{},
                   status:null,
                   id:null
               };
               default: return state
    }
}