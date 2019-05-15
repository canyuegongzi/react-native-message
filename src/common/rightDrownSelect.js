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
import {scaleSizeH, scaleSizeW} from '../untils/scale'
import { Actions } from 'react-native-router-flux';

export default class RightDrownSelect extends Component<Porpos> {
    constructor(props) {
        super(props);
        this.rightListRow = [
            {
                rowClick: ()=> {alert('扫码')},
                iconLeftName: 'md-qr-scanner',
                name: '扫一扫'
            },
            {
                rowClick: ()=> {Actions.feedBackPage({name:'反馈'})},
                iconLeftName: 'ios-information-circle',
                name: '反馈'

            },
            {
                rowClick: ()=> {Actions.aboutPage({name:'关于'})},
                iconLeftName: 'ios-create',
                name: '关于'
            }
        ]
    }
    render() {
        return (
            <View style={styles.con}>
                {this.rightListRow.map((item) => {
                    return <TouchableOpacity onPress={item.rowClick} key={item.name}>
                        <View style={styles.select}>
                            <Icon name={item.iconLeftName}
                                  size={30}
                                  color={'#ffffff'}
                            >
                            </Icon>
                            <Text style={styles.desc}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    con: {
        width: scaleSizeW(250),
        height: scaleSizeH(270),
        position: 'absolute',
        top: 45,
        right: 5,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,.6)',
        flexDirection: 'column',
        borderRadius: 2

    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 18,
        height: scaleSizeH(90),
        zIndex: 12,
        alignItems: 'center',
    },
    head: {
        width: scaleSizeW(60),
        height: 80,

        // paddingLeft:10,
        // paddingRight:10,
        // height:40,
        // flexDirection:'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // backgroundColor:'#FF3399',
        // marginTop: Platform.OS === 'ios' ? 20 : 0,

    },
    desc: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff',
        alignSelf:'center'

    },


});
