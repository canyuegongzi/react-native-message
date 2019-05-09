export const messageReducer = function (state={slideIsOpen: false, messageList: []}, action) {
    switch (action.type) {
        case  'SET_MESSAGE_LIST':
            return {
                ...state , messageList: action.payload
            }
        case  'CONTROL_SLIDE_STATUS':
            return {
                ...state , slideIsOpen: action.payload
            }
        default:
            return state
    }
}