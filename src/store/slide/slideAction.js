import Api from "../../api/api";
export const setUserListAction =  {
    type: 'SET_USER_LIST'
}
export const deleteUserDataAction =  {
    type: 'DELETE_USER_DATA'
}
export const addUserDataAction =  {
    type: 'ADD_USER_DATA'
}

export const getUserListAction = async (dispatch) => {
    await Api.getLinkList(response=>{
        dispatch(
            {
                type: 'GET_USER_LIST',
                payload: response.data
            }
        )
    })
}