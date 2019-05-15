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
import {scaleSizeW} from '../untils/scale'
import { Actions } from 'react-native-router-flux';

export default class SecondPageTopBar extends Component<Porpos> {
    static propTypes = {
        // leftGoToPage: PropTypes.func, // 跳转到对应tab的方法
        name: PropTypes.string,
        iconLeftName: PropTypes.string,
        iconRightName: PropTypes.string,
        tabBarVisible: PropTypes.string,
        iconLeftFun: PropTypes.any,
        iconRightFun: PropTypes.any,

        // rightAppy: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.iconLeftName = props.iconLeftName ? props.iconLeftName : 'ios-arrow-back';
        this.iconRightName = props.iconRightName ? props.iconRightName : 'ios-more';
        this.iconLeftFun = props.iconLeftFun ? props.iconLeftFun : this.iconLeftFunOwn;
    }
    // 退回上一级
    iconLeftFunOwn() {
        Actions.pop();
    }
    render() {
        return (
            <View style={styles.con}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={
                        this.iconLeftFun
                        // this.props.changeSlideStatus('关')
                    }>
                        <Icon name={this.iconLeftName}
                              size={30}
                              color={'#ffffff'}
                        >
                        </Icon>
                    </TouchableOpacity>
                    <Text style={styles.desc}>{this.props.name}</Text>
                    <TouchableOpacity onPress={
                        this.props.iconRightFun
                    }>
                        <Icon name={this.iconRightName}
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
        //flex: 1,
        //height: 45,
    },
    head: {
        paddingLeft: 15,
        paddingRight: 15,
        height: 45,
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
