export const marketReducer = function (state= { marketList: [], page: 1, video: [] }, action) {
    switch (action.type) {
        case  'RESET_MARKET_LIST':
            return {
                ...state , marketList: action.payload
            }
        case  'SET_MARKET_LIST':
            return {
                ...state , marketList: state.marketList.concat(action.payload)
            }
        case  'SET_MARKET_VIDEO':
            return {
                ...state , video: state.video.concat(action.payload)
            }
        case  'GET_MARKET_NUMBER':
            return {
                ...state , marketList: action.payload
            }
        case  'SET_PAGE_NUMBER':
            return {
                ...state , page: action.payload
            }
        case  'GET_PAGE_LIST':
            return {
                ...state , page: action.payload
            }
        default:
            return state
    }
}
