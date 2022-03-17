import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOG_LOADING, REG_FAILED, REG_LOADING, REG_SUCCESS, USER_FAILED, USER_LOAD, USER_LOADED } from "../actions/Types"

const initial = {
    regLoading:false,
    logLoading:false,
    isAuthenticate:false,
    user:null
}

export default(state=initial,{payload,type})=>{
    switch(type){
        case REG_LOADING:
       return{
           ...state,
           regLoading:true

       };
       case LOG_LOADING:
           return{
               ...state,
               logLoading:true
           }

        case REG_SUCCESS:
            return{
                ...state,
                regLoading:false,
                isAuthenticate:true
            }
        
            case LOGIN_SUCCESS:
                return{
                    ...state,
                    ...payload,
                      isAuthenticate:true,
                logLoading:false
                }

            case LOGOUT_SUCCESS:
            case USER_FAILED:
            return{
                ...state,
                regLoading:false,
                isAuthenticate:null,
                user:null,
                logLoading:false
            }

           

                case USER_LOADED:
                    return{
                        ...state,
                        isAuthenticate:true,
                        user:payload,
                        logLoading:false
                    }

                    default:return state
    }
}