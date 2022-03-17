import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
const middleWare = [thunk];


const initial = {}

const store = createStore(
    rootReducer,
    initial,
    applyMiddleware(middleWare)
)
export default store