import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducer from "./errorReducer";
import productReducers from "./productReducers";

export default combineReducers({
    product:productReducers,
    auth:authReducers,
    err:errorReducer
})