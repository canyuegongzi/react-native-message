
// 发送api请求 获取数据
import NetUtils from "../untils/http";

export default class Api{
    /**
     *  联系人列表
     */
    static getLinkList(success){
        NetUtils.get('http://rap2api.taobao.org/app/mock/167400/linkUser/userLinkList', {Authorization:'555d5d5ddd'},response=>{
            success && success(response)
        })
    }
    /**
     *  消息列表
     */
    static getMessageList(success){
        NetUtils.get('http://rap2api.taobao.org/app/mock/167400/linkUser/userMessageList', {Authorization:'555d5d5ddd'},response=>{
            success && success(response)
        })
    }
    /**
     *  列表
     */
    static  postMyOrderList(params, success){
        NetUtils.post('https://jsonplaceholder.typicode.com/posts', params, response=>{
            success && success(response)
        })
    }
    /**
     *  获取动态
     */
    static  getMyMarketList(params, success){
        NetUtils.get('http://rap2api.taobao.org/app/mock/167400/linkUser/userMarket', params, response=>{
            success && success(response)
        })
    }

    /**
     *  上传图片
     */
    static uploadImageFile(images, params, success){
        NetUtils.uploadFile('', images, params, response=>{
            success && success(response)
        })
    }
}
