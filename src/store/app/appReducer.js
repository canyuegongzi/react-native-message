import {combineReducers} from "redux";
import {slideReducer} from "../slide/slideReducer";
import {messageReducer} from "../message/messageReducer";
import {marketReducer} from "../market/marketReducer";


const bottomReducer = function (state={locked: true}, action) {
    switch (action.type) {
        case  'CONTROL_BOTTOM_TAB_STATUS':
            return {
                ...state , isScroll: action.payload
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    slideReducer: slideReducer,
    messageReducer: messageReducer,
    bottomReducer: bottomReducer,
    marketReducer: marketReducer
})
export  default rootReducer