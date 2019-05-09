import rootReducer from "./appReducer";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...[thunk]), // 需要使用的中间件数组
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
export  default store;