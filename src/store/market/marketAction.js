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
export const setMarketVideoAction =  {
    type: 'SET_MARKET_VIDEO'
}
export const getMarketListAction = async ( dispatch) => {
    await Api.getMyMarketList( {Authorization:'555d5d5ddd', row: 10,page: 1},response=>{
        console.log(response)
        let videoList = []
        response.data.forEach((item) => {
            if(item.type ==4) {
                videoList.push({ref: item.id, flag:true})
            }
        })
        dispatch(
            {
                type: 'SET_MARKET_VIDEO',
                payload: videoList
            }
        )
        dispatch(
            {
                type: 'RESET_MARKET_LIST',
                payload: response.data
            }
        )
    })
}
