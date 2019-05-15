/**
 * @Description:  视频播放页面
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableNativeFeedback,
    ActivityIndicator,
    Dimensions
} from "react-native";
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {scaleSizeH, scaleSizeW} from "../../../untils/scale";
import Icon from 'react-native-vector-icons/Ionicons'; //这个是图标
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from "react-native-router-flux";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MyTabBar from "../../../main";
import TopTabBar from "../../../common/topTabBar";

/**
 * 定义每行列表
 * @private
 */
class MyListItem extends React.PureComponent {
    switchVideo = () => {
        this.props.onPressItem(this.props.info);
    };

    render() {
        const item = this.props.info;
        const style  = this.props.styleItem;
        console.log(style)
        return (<TouchableNativeFeedback
            onPress={this.switchVideo}
        >
            <View style={[styles.listRow, {
                backgroundColor:  style === item.name ? '#FF3399' : '#ffffff',
            }]}>
                <Text style={[styles.itemText,{ color: style === item.name ? '#ffffff' : '#000000'}]} key={item.name}>{item.name}</Text>
            </View>
        </TouchableNativeFeedback>)
    }
}



/*
评论组件
 */

class CommentListItem extends React.PureComponent {
    // 点击查看详情
    lookDetailCommentChildren = () => {
        this.props.lookDetailCommentChildren(this.props.infos);
    };
    // 点击评论
    clickComment = () => {
        this.props.clickComment(this.props.infos);
    };


    render() {
        const item = this.props.infos;
        console.log(item)
        return (<TouchableNativeFeedback
            onPress={this.clickComment}
        >
            <View style={[styles.listRow, {
            }]}>
                <Text style={[styles.itemText]} key={item.id}>{item.comment}</Text>
            </View>
        </TouchableNativeFeedback>)
    }
}
let {width, height} = Dimensions.get('window');

class LiveVideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.player = null;
        this.timer = null;
        this.state = {
            styleItem: props.info.name,
            isFullScreen: false,
            videoWidth: width,
            videoHeight: width * 9 / 16, // 默认16：9的宽高比
            player: null,
            isPlay: 0,
            paused: true,
            isYetLoad: false,
            duration: 0,
            playIcon: 'ios-play',  // 'ios-pause'
            isShowControl: true,
            // 下拉刷新
            isRefresh: false,
            isCommentRefresh: false,
            // 加载更多
            isLoadMore: false,
            emptyViewText: '加载中',
            currentVideoInfo: props.info,
            currentUrl: props.info.url,
            tabNames: ['列表', '评论'],
            videoUrl: [
                {
                    id: '1',
                    name: 'CCTV-6',
                    url: 'http://ivi.bupt.edu.cn/hls/cctv6.m3u8'
                },
                {
                    id: '2',
                    name: 'CCTV-5',
                    url: 'http://ivi.bupt.edu.cn/hls/cctv5.m3u8'
                },
                {
                    id: '3',
                    name: 'CCTV-1',
                    url: 'http://ivi.bupt.edu.cn/hls/cctv1.m3u8'
                },
                {
                    id: '4',
                    name: 'CCTV-3',
                    url: 'http://ivi.bupt.edu.cn/hls/cctv3.m3u8'
                },
                {
                    id: '5',
                    name: 'CCTV-8',
                    url: 'http://ivi.bupt.edu.cn/hls/cctv8.m3u8'
                },
                {
                    id: '6',
                    name: '北京卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/btv1.m3u8'
                },
                {
                    id: '7',
                    name: '湖南卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/hunanhd.m3u8'
                },
                {
                    id: '8',
                    name: '浙江卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/zjhd.m3u8'
                },
                {
                    id: '9',
                    name: '江苏卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/jshd.m3u8'
                },
                {
                    id: '10',
                    name: '东方卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/dfhd.m3u8'
                },
                {
                    id: '11',
                    name: '辽宁卫视',
                    url: 'http://ivi.bupt.edu.cn/hls/lnhd.m3u8'
                }
            ],
            videoComment: [
                {
                    id: '1',
                    comment: '测试内容',
                    children: {
                        arr: [
                            {
                                user: {
                                    id: '21',
                                    name: '测试name0'
                                }
                            },
                            {
                                user: {
                                    id: '22',
                                    name: '测试name1'
                                }
                            },
                        ]

                    },
                },
                {
                    id: '2',
                    comment: '测试内容1',
                    children: {
                        arr: [
                            {
                                user: {
                                    id: '22',
                                    name: '测试name2'
                                }
                            },
                        ]

                    },
                },

            ],
            programItem: [
                {
                    id: '10',
                    name: '新闻',
                }
            ]

        }
        this.currentVideoInfo = props.info;
        this.controlVideo = this.controlVideo.bind(this)
        this.renderLoading = this.renderLoading.bind(this)
        this._createEmptyView = this._createEmptyView.bind(this)

    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <View style={[styles.videoCon, {
                    width: this.state.videoWidth,
                    height: this.state.videoHeight,
                    backgroundColor: '#000000'
                }]}>
                    <TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor:'transparent'}}
                                      onPress={this.controlVideo}
                    >
                        <Video
                            //source={require('../../../assets/video/example.mp4')} // 视频的URL地址，或者本地地址
                            //source={require('./music.mp3')} // 可以播放音频
                            source={{uri: this.state.currentUrl}}
                            ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                                this.player = ref
                            }}
                            controls={false}
                            // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                            volume={1.0}
                            // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
                            muted={false}
                            // true代表静音，默认为false.
                            paused={this.state.paused}                 // true代表暂停，默认为false
                            resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                            repeat={false}                 // 是否重复播放
                            playInBackground={false}       // 当app转到后台运行的时候，播放是否暂停
                            playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                            onLoadStart={this.loadStart}   // 当视频开始加载时的回调函数
                            onLoad={this.setDuration}      // 当视频加载完毕时的回调函数
                            onProgress={this.setTime}      //  进度控制，每250ms调用一次，以获取视频播放的进度
                            onEnd={this.onEnd}             // 当视频播放完毕后的回调函数
                            onError={this.videoError}      // 当视频不能加载，或出错后的回调函数
                            style={styles.fullScreen}
                        />
                        {this.state.isYetLoad === true ? null : this.renderLoading()}
                        {/*{this.renderControl()}*/}

                        {this.state.isShowControl === true ? this.renderControl() : null}

                    </TouchableOpacity>
                </View>

                <ScrollableTabView
                    //renderTabBar={() => <DefaultTabBar/>}
                    renderTabBar={() => <TopTabBar tabNames={this.state.tabNames} />}
                    tabBarPosition={'top'}
                    onChangeTab={
                        (obj) => {
                             console.log('被选中的tab下标：' + obj.i);
                        }
                    }
                    onScroll={
                        (position) => {
                            // console.log('滑动时的位置：' + position);
                        }
                    }
                    // this.props.bottom.locked
                    // locked = {this.props.message.slideIsOpen ? true : false}
                    initialPage={0}
                    prerenderingSiblingsNumber={2}

                >
                    <View tabLabel="page1">
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.videoUrl}
                            renderItem={this._renderItem}
                            // 空布局
                            ListEmptyComponent={this._createEmptyView}
                            onRefresh={() => this._onRefresh()}
                            refreshing={this.state.isRefresh}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                    <View tabLabel="page2">
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.videoComment}
                            renderItem={this._renderCommentItem}
                            // 空布局
                            ListEmptyComponent={this._createEmptyView}
                            onRefresh={() => this._onRefreshComment()}
                            refreshing={this.state.isCommentRefresh}
                            onEndReachedThreshold={0.1}
                        />
                    </View>


                </ScrollableTabView>



            </View>
        )
    }

    /**
     * 切换视频
     * @private
     */
    switchVideo = (videoInfo, seekTime) => {
        if (!this.state.paused) {
            this.setState({
                paused: true,
            })
        }
        this.setState({
            currentUrl: videoInfo.url,
            styleItem: videoInfo.name
        });
    }
    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            setTimeout(() => {
                this.setState({
                    isRefresh: false
                })
            },1500)
        }
    };
    /**
     * 下拉刷新品论
     * @private
     */
    _onRefreshComment = () => {
        // 不处于 下拉刷新
        if (!this.state.isCommentRefresh) {
            setTimeout(() => {
                this.setState({
                    isCommentRefresh: false
                })
            },1500)
        }
    };
    /**
     * 渲染单行
     * @private
     */
    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this.switchVideo}
            info={item}
            styleItem={this.state.styleItem}
        />
    );
    /**
     * 渲染单行
     * @private
     */
    _renderCommentItem = ({item}) => (
        <CommentListItem
            lookDetailCommentChildren={this.lookDetailCommentChildren}
            clickComment={this.clickComment}
            infos={item}
        />
    );
    /**
     * 点击品论
     * @private
     */
    clickComment = (info) => {
        alert(info.id)
    }
    /**
     * 看字评论
     * @private
     */
    lookDetailCommentChildren = (info) => {
        alert(info.comment)
    }

    /**
     * 空布局
     * @private
     */
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>

                <View style={styles.loadingMore}>
                    <ActivityIndicator size={30} color="#000000"/>
                </View>
                {/*暂无数据*/}

            </View>
        );
    }

    /**
     * 渲染控制条
     * @private
     */
    renderControl() {
        return (
            <View style={styles.control}>
                <Icon name={this.state.playIcon}
                      size={30}
                      color={'#ffffff'}
                      onPress={() => this.controlVideo()}
                >
                </Icon>
                <MaterialCommunityIcons name={'fullscreen'}
                                        size={30}
                                        color={'#ffffff'}
                                        onPress={() => {
                                            this.onControlShrinkPress()
                                        }}
                >
                </MaterialCommunityIcons>
            </View>
        )
    }

    /**
     * 控制视频的播放暂停
     * @private
     */
    controlVideo() {
        if (this.state.isShowControl) {
            if (this.state.paused) {
                this.setState(
                    {
                        paused: false,
                        playIcon: 'ios-pause'
                    }
                )
            } else {
                this.setState(
                    {
                        paused: true,
                        playIcon: 'ios-play'
                    }
                )
            }
        } else {
            this.setState(
                {
                    isShowControl: true,
                }
            )
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {this.setState(
                {
                    isShowControl: false,
                }
            )},4000)

        }

    }

    /**
     * 渲染加载中
     * @private
     */
    renderLoading() {
        return (<View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff"/>
        </View>)
    }

    /**
     * 开始加载
     * @private
     */
    loadStart = (data) => {
        console.log('加载中')
        this.setState({
            isYetLoad: false,
        })
    }

    /**
     * 点击全屏
     * @private
     */
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    /**
     * 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
     * @private
     */
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        console.log('通过onLayout得到的宽度：' + width);
        console.log('通过onLayout得到的高度：' + height);

        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape) {
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
                //isShowControl: false,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9 / 16,
                isFullScreen: false,
                //isShowControl: false,

            })
        }
        console.log(Orientation)
        // Orientation.unlockAllOrientations();
    };
    /**
     * 加载完毕
     * @private
     */
    setDuration = (data) => {
        this.setState({
            duration: data.duration,
            isYetLoad: true,
            paused: false,
            playIcon: 'ios-pause'
        })
        clearTimeout(this.timer)
        setTimeout(() => {
            this.setState({
                isShowControl: false
            })
        }, 4000)
    }
    /**
     * 获取视频的进度
     * @private
     */
    setTime = (data) => {
        console.log('进度')
    }
    /**
     * 视频播放出错
     * @private
     */
    videoError = (data) => {
        this.setState({
            duration: 0,
            isYetLoad: false,
            paused: true
        })
    }

}

const styles = StyleSheet.create({
    tabsContainer:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabsItem: {
        textAlign: 'center',
        color: '#FF3399',
        fontSize: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    videoCon: {
        // width:'100%',
        // height:'35%',
        // backgroundColor:'#000',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        backgroundColor: 'grey',
    },
    slider: {
        flex: 1,
        width: '80%',
        height: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
    },
    control: {
        width: '100%',
        height: scaleSizeH(50),
        backgroundColor: 'rgba(0,0,0,.6)',
        position: 'absolute',
        bottom: scaleSizeH(0),
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 40,
    },
    listRow: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 12,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderColor: '#cdcdcd',
        backgroundColor: 'white',
    },
    itemText: {
        fontSize: 18,
        paddingLeft: 20,
        lineHeight: 40,
        color: '#6c6c6c',
        fontWeight: '400',
        width: 320,
    },
    loadingMore: {
        width: width,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentVideo: {
        backgroundColor: '#FF3399',
        color: '#ffffff',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 12,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderColor: '#cdcdcd',
    }
});
export default LiveVideoPlayer


