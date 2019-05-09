import Api from "../../api/api";

export const setMessageListAction =  {
    type: 'SET_MESSAGE_LIST'
}
export const deleteMessageDataAction =  {
    type: 'DELETE_MESSAGE_DATA'
}
export const addMessageDataAction =  {
    type: 'ADD_MESSAGE_DATA'
}

export const controlSlideStatusAction =  {
    type: 'CONTROL_SLIDE_STATUS'
}
export const getMessageListAction = async (dispatch) => {
    await Api.getMessageList(response=>{
        console.log(response)
        dispatch(
            {
                type: 'SET_MESSAGE_LIST',
                payload: response.data
            }
        )
    })
}