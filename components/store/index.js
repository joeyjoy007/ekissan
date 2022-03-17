import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const middleWare = [thunk];
import rootReducer from "./reducers/index"





const initial = {}

const store = createStore(
    rootReducer,
    initial,
    applyMiddleware(...middleWare)
)
export default store