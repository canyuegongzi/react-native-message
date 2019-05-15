import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, Platform,TouchableNativeFeedback, Dimensions} from 'react-native';
import HeadTopBar from "../../common/headTopBar";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import {setSpText} from "../../untils/scale";
let {width, height} = Dimensions.get('window');

import { Actions } from 'react-native-router-flux';
import CrossTalkPage from "./pages/crossTalkPage";
import NewsPage from "./pages/newsPage";

export default  class ApplyIndex extends Component {
    constructor(props) {
        super(props);
        this.clickRouter = this.clickRouter.bind(this)
        this.applyBlock = [
            {
                router: () => {Actions.moviePage({name: '电影'})},
                name: '电影',
                class:'FontAwesome',
                pic: 'film'
            },
            {
                router: () => {Actions.musicPage({name: '音乐'})},
                name: '音乐',
                class:'FontAwesome',
                pic: 'music'
            },
            {
                router: () => {Actions.bookPage({name: '音乐'})},
                name: '小说',
                class:'FontAwesome',
                pic: 'book'
            },
            {
                router: () => {Actions.newsPage({name: '资讯'})},
                name: '资讯',
                class:'FontAwesome',
                pic: 'newspaper-o'
            },
            {
                router: () => {Actions.crossTalkPage({name: '段子'})},
                name: '段子',
                pic: 'heartbeat',
                class:'FontAwesome',
            },
            {
                router: () => {Actions.livePage({name: '直播'})},
                name: '直播',
                pic: 'video-camera',
                class:'FontAwesome',
            },

        ]
    }

    /*
    点击事件
     */
    clickRouter(router) {
        Actions.moviePage()
        //alert(router)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 45}}>
                    <HeadTopBar
                        name={'应用'}
                        tabBarVisible={'true'}
                    />
                </View>
                <View style={styles.applyCon}>
                    {this.applyBlock.map((item,index) => {
                        return (
                            <TouchableNativeFeedback key={index} onPress={item.router}>
                                <View style={styles.applyBlock} key={index}>
                                    <FontAwesome name={item.pic} size={setSpText(50)} color={'#FF3399'}></FontAwesome>
                                    <Text style={styles.name}>{item.name}</Text>

                                </View>
                            </TouchableNativeFeedback>
                        )
                    })}
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    applyCon: {
        width:width,
        height: height,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    applyBlock:{
        width: width/3,
        height: width/3,
        borderColor: '#cdcdcd',
        borderWidth: .5,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '400',
        paddingTop: 15
    }
})
