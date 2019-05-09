import Api from "../../api/api";

// 设置动态的数据
export const setMarketAction =  {
    type: 'SET_MARKET_LIST'
}
export const getMarketAction =  {
    type: 'GET_MARKET_LIST'
}

export const setPageAction =  {
    type: 'SET_PAGE_NUMBER'
}
export const getPageAction =  {
    type: 'GET_PAGE_NUMBER'
}

export const getMarketListAction = async ( dispatch) => {
    await Api.getMyMarketList( {Authorization:'555d5d5ddd', row: 10,page: 1},response=>{
        console.log(response)
        dispatch(
            {
                type: 'RESET_MARKET_LIST',
                payload: response.data
            }
        )
    })
}
