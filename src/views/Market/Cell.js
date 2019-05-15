/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent, Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight,TouchableNativeFeedback, TouchableOpacity, Image, PixelRatio, Dimensions} from 'react-native'

import {scaleSizeH, scaleSizeW} from '../../untils/scale';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";
import VideoModel from "./pages/videoModel";
import ImgModel from "./pages/imageModel";
import {Actions} from "react-native-router-flux";

let {width, height} = Dimensions.get('window');
const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class Cell extends Component {
    constructor(props) {
        super(props);
        this._creatTypeOne = this._creatTypeOne.bind(this);
        this._creatTypeTwo = this._creatTypeTwo.bind(this);
        this._creatTypeThree = this._creatTypeThree.bind(this);
        this._creatTypeFour = this._creatTypeFour.bind(this);
        this._creatTypeFive = this._creatTypeFive.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.renderMarketSetting = this.renderMarketSetting.bind(this);
        this.videoError = this.videoError.bind(this);
        this.clickUser = this.clickUser.bind(this);
        this.state = {
            muted: false,
            paused: true,
            videoButton: 'ios-play', // 'ios-pause'
            videoData: [],
            popVideoPlayer: false,
            popImgModel: false
        }

    }

    /*
    图片浏览弹出框的转态
     */
    closeImgModel() {
        if (this.state.popImgModel) {
            this.setState({
                popImgModel: false
            })
        } else {
            this.setState({
                popImgModel: true
            })
        }
    }

    /*
    视频播放
     */
    videoPlay(info) {
        // const str = 'video' + info.id.toString()
        if (!this.state.popVideoPlayer) {
            this.setState({
                popVideoPlayer: true
            })
        } else {
            this.setState({
                popVideoPlayer: false
            })
        }
    }

    onBuffer() {
        //console.log('缓冲中')
    }

    videoError() {
        console.log('播放错误')
    }
    /*
    渲染设置
     */
    renderMarketSetting() {

    }
    /*
    点击用户头像
     */
    clickUser(user) {
        Actions.linkUser({info: user,userName: user.name,name: user.name,})
        //alert(user.name + user.userId)
    }
    /*
    渲染第一种样式 【纯文字】
     */
    _creatTypeOne() {
        let info = this.props.info.item
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.clickUser(info.user)}>
                    <Image source={{uri: info.user.headPic}} style={styles.icon}/>
                </TouchableNativeFeedback>
                <View style={styles.rightContainer}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.user.name}</Text>
                    <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.p}
                          style={{marginTop: 8}}>{info.title}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'}
                              style={[styles.time, styles.price]}>{info.time}1</Text>
                    </View>
                </View>
                <View style={styles.setting}>
                    <Text style={styles.settingWord}>...</Text>
                </View>
            </View>
        );
    }

    /*
    渲染第二种样式 【图文】
     */
    _creatTypeTwo() {
        let info = this.props.info.item
        return (
            <View>
                {this.state.popImgModel === true ? <ImgModel img={{isShow: this.state.popImgModel, imgInfo: info.photo}}
                                                             fn={this.closeImgModel.bind(this)}/> : null}
                <View style={styles.container}>

                    {/*<ImgModel img={{isShow: this.state.popImgModel, imgInfo: info.photo}}*/}
                    {/*fn={this.closeImgModel.bind(this)}/>*/}
                    <TouchableNativeFeedback onPress={() => this.clickUser(info.user)}>
                        <Image source={{uri: info.user.headPic}} style={styles.icon}/>
                    </TouchableNativeFeedback>

                    <View style={styles.rightContainer}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.user.name}</Text>

                        <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.p}
                              style={{marginTop: 8}}>{info.title}</Text>
                        <View style={styles.imgWell}>
                            {info.photo.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.closeImgModel()}>
                                        <Image source={{uri: item.pic}} key={index} style={styles.imgWellImg}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}
                                  style={[styles.time, styles.price]}>{info.time}2</Text>
                        </View>
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingWord}>...</Text>
                    </View>
                </View>
            </View>
        );
    }

    /*
    渲染第三种样式 【图片】
     */
    _creatTypeThree() {
        let info = this.props.info.item
        return (
            <View>
                {this.state.popImgModel === true ? <ImgModel img={{isShow: this.state.popImgModel, imgInfo: info.photo}}
                                                             fn={this.closeImgModel.bind(this)}/> : null}
                <View style={styles.container}>
                    <TouchableNativeFeedback onPress={() => this.clickUser(info.user)}>
                        <Image source={{uri: info.user.headPic}} style={styles.icon}/>
                    </TouchableNativeFeedback>

                    <View style={styles.rightContainer}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.user.name}</Text>
                        <View style={styles.imgWell}>
                            {info.photo.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => this.closeImgModel()}>
                                        <Image source={{uri: item.pic}} key={index} style={styles.imgWellImg}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}
                                  style={[styles.time, styles.price]}>{info.time}3</Text>
                        </View>
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingWord}>...</Text>
                    </View>
                </View>
            </View>
        );
    }

    /*
        渲染第四种样式 【小视频】
         */
    _creatTypeFour() {
        let info = this.props.info.item;
        let video = this.props.market.video;
        return (
            <View style={styles.container}>
                <VideoModel video={{isShow: this.state.popVideoPlayer, videoInfo: info}}
                            fn={this.videoPlay.bind(this)}/>
                <TouchableNativeFeedback onPress={() => this.clickUser(info.user)}>
                    <Image source={{uri: info.user.headPic}} style={styles.icon}/>
                </TouchableNativeFeedback>
                <View style={styles.rightContainer}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.user.name}</Text>
                    <TouchableOpacity onPress={() => this.videoPlay(info)}>
                        <View style={[styles.videoCon]}>
                            <View style={styles.controls}>
                                <Icon name={this.state.videoButton}
                                      size={40}
                                      color={'rgba(0,0,0,.6)'}
                                      style={styles.videoButton}
                                ></Icon>
                            </View>
                            <Video
                                source={{uri: info.video}}   // Can be a URL or a local file.
                                //source={require('../../assets/video/example1.mp4')}
                                paused={true}
                                muted={this.state.muted}
                                playInBackground={false}
                                id={info.id}
                                ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                                    this.player = ref
                                }}
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onError={this.videoError}               // Callback when video cannot be loaded
                                style={styles.backgroundVideo}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'}
                              style={[styles.time, styles.price]}>{info.time}4</Text>
                    </View>
                </View>
                <View style={styles.setting}>
                    <Text style={styles.settingWord}>...</Text>
                </View>
            </View>
        );
    }

    /*
    视频文
     */
    _creatTypeFive() {
        let info = this.props.info.item
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.clickUser(info.user)}>
                    <Image source={{uri: info.user.headPic}} style={styles.icon}/>
                </TouchableNativeFeedback>

                <View style={styles.rightContainer}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.user.name}</Text>
                    <View>
                    </View>
                    <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.p}
                          style={{marginTop: 8}}>{info.title}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'}
                              style={[styles.time, styles.price]}>{info.time}4</Text>
                    </View>
                </View>
                <View style={styles.setting}>
                    <Text style={styles.settingWord}>...</Text>
                </View>
            </View>
        );
    }


    render() {
        let info = this.props.info.item
        if (info.type == 1) {
            return (this._creatTypeOne())
        } else if (info.type == 2) {
            return (this._creatTypeTwo())
        } else if (info.type == 3) {
            return (this._creatTypeThree())
        } else if (info.type == 4) {
            return (this._creatTypeFour())
        } else if (info.type == 5) {
            return (this._creatTypeFive())
        } else {
            return (this._creatTypeOne())
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    rightContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,

    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        width: 150
    },
    time: {
        fontSize: 12,
        color: '#777777',
        width: 50,
        marginTop: 8

    },
    p: {
        fontSize: 13,
        color: '#777777',
        width: 80
    },
    settingWord: {},
    setting: {
        paddingRight: 10
    },
    imgWell: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imgWellImg: {
        width: scaleSizeW(160),
        height: 140,
        margin: 2
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderWidth: .5,
        borderColor: '#cdcdcd',
        // width: scaleSizeW(298),
        // height: scaleSizeH(200),

    },
    videoCon: {
        flex: 1,
        flexDirection: 'row',
        width: scaleSizeW(300),
        height: scaleSizeH(200),
        justifyContent: 'center',
        // borderWidth: .5,
        // borderColor: '#cdcdcd',
        marginTop: 8

    },
    controls: {
        position: 'absolute',
        marginTop: scaleSizeH(70),
        marginLeft: scaleSizeW(150),
    },
    videoButton: {
        zIndex: 15
    }
})
const mapStateToProps = (state, ownProps) => {
    return {
        market: state.marketReducer
    }
}
export default connect(mapStateToProps)(Cell)
