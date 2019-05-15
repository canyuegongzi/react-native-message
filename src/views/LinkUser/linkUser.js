/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */

import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback} from "react-native"
import {Actions} from 'react-native-router-flux';

class LinkUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let info = this.props.info;
        const userId = info.id ? info.id : info.userId
        return (<View>
            <Text>LinkUser</Text>
            <Text>{userId}</Text>
            <Text>{info.name}</Text>
            <Text>{info.nick}</Text>
            <TouchableNativeFeedback onPress={() => {
                info.id = userId;
                Actions.userMarket({info: info, name: '动态'})
            }
            }>
                <Text>去动态页面</Text>
            </TouchableNativeFeedback>
        </View>)
    }
}

export default LinkUser
