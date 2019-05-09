export const slideReducer = function (state= { count: 1, personList: [] }, action) {
    switch (action.type) {
        case  'GET_USER_LIST':
            return {
                ...state , personList: action.payload
            }
        case  'SET_USER_LIST':
            return {
                ...state , personList: action.payload
            }
        default:
            return state
    }
}