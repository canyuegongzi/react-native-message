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
import {scaleSizeW}from '../untils/scale'
export default class HeadTopBar extends Component<Porpos> {
    static propTypes = {
        // leftGoToPage: PropTypes.func, // 跳转到对应tab的方法
        name: PropTypes.string,
        iconLeftName: PropTypes.string,
        iconRightName: PropTypes.string,
        tabBarVisible: PropTypes.string,
        iconLeftFun: PropTypes.any,
        iconRightFun: PropTypes.any
        // rightAppy: PropTypes.func,
    };

    render() {
        return (
            <View style={styles.con}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={
                        this.props.iconLeftFun
                        // this.props.changeSlideStatus('关')
                    }>
                        <Icon name={this.props.iconLeftName}
                              size={30}
                              color={'#ffffff'}
                        >
                        </Icon>
                    </TouchableOpacity>
                    <Text style={styles.desc}>{this.props.name}</Text>
                    <TouchableOpacity onPress={
                        this.props.iconRightFun
                    }>
                        <Icon name={this.props.iconRightName}
                              size={30}
                              color={'#ffffff'}>
                        </Icon>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    con: {
        flex: 1,
        height: 30,
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
