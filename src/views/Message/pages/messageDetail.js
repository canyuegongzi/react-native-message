import React, {Component} from 'react';
import {View, Text} from "react-native"

/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */
class MessageDetailIndex extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props)
        // console.log(this.props.message)
        // console.log(this.props.id)
        return (<View>
            <Text>聊天页面</Text>
            <Text>{this.props.userName}</Text>
            <Text>{this.props.id}</Text>
        </View>)
    }
}
export  default MessageDetailIndex
