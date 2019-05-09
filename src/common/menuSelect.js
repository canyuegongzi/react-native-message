import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //这个是图标
export default class MenuSelect extends Component<Porpos> {
    static propTypes = {
        // leftGoToPage: PropTypes.func, // 跳转到对应tab的方法
        name: PropTypes.string,
        iconLeftName: PropTypes.string,
        iconRightName: PropTypes.string,
        tabBarVisible: PropTypes.string,
    };

    render() {
        return (
            <View style={styles.con}>
                <Text>菜单</Text>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    con: {
        flex: 1,
        height: 80,
        width: 60,
        borderColor: '#cdcdcd'
    },
    head: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FF3399',
        marginTop: Platform.OS === 'ios' ? 20 : 0,

    },
    desc: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff'

    },


});