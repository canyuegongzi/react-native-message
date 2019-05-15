/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */
import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback} from "react-native"
import {Actions} from 'react-native-router-flux';

class UserMarket extends Component {
    render() {
        let info = this.props.info
        return (<View>
            <Text>用户动态</Text>
            <Text>{info.id}</Text>
            <Text>{info.name}</Text>
            <Text>{info.nick}</Text>
        </View>)
    }
}

export default UserMarket
