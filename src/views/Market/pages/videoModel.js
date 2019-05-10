/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Text,
    TouchableHighlight,
    Dimensions, Platform, ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Video from "react-native-video";

class VideoModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: props.video.isShow,
            paused: !props.video.isShow,
            muted: false,
            isYetLoad: false,
            duration: 0,
            isError: false,
            progress: null
        };
        this.player = null;
        this.onLoad = this.onLoad.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.videoError = this.videoError.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.renderLoading = this.renderLoading.bind(this)
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    renderError() {
        return (<View style={styles.error}>
        </View>)
    }

    renderLoading() {
        return (<View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff"/>
        </View>)
    }

    render() {
        let playerIshow = this.props.video.isShow;
        let videoInfo = this.props.video.videoInfo;
        let paused = !this.props.video.isShow
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={playerIshow}
                    onRequestClose={() => {
                        // alert("Modal has been closed.");
                        this.player = null
                    }}
                >
                    <View style={{
                        height: Dimensions.get('window').height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}>
                        <View style={styles.videoPar}>
                            <View style={styles.videoCon}>
                                <Video
                                    source={{uri: videoInfo.video}}   // Can be a URL or a local file.
                                    //source={require('../../../assets/video/example1.mp4')}
                                    paused={paused}
                                    muted={this.state.muted}
                                    playInBackground={false}
                                    id={videoInfo.id}
                                    ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                                        this.player = ref
                                    }}
                                    onBuffer={this.onBuffer(videoInfo.video)}                // Callback when remote video is buffering
                                    onError={this.videoError}               // Callback when video cannot be loaded
                                    onLoad={this.onLoad}
                                    onProgress={this.onProgress}
                                    onLoadStart={this.onLoadStart}
                                    style={styles.backgroundVideo}
                                    repeat={true}>

                                </Video>
                                {this.state.isYetLoad === true ? null : this.renderLoading()}
                            </View>
                            <TouchableHighlight
                                onPress={() => {
                                    console.log('视频暂停了')

                                    this.props.fn('子组件的值');
                                }}
                                style={styles.close}>
                                <Icon
                                    name={'ios-close'} // 图标 调用传入的属性
                                    size={40}
                                    color={'#ffffff'}/>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    onBuffer(info) {
        console.log('缓冲中')
        console.log(info)

    }

    videoError() {
        this.setState({
            duration: 0,
            isYetLoad: false,
        })
        this.props.fn()
        console.log('播放错误')
    }

    onLoad(data) {
        this.setState({
            duration: data.duration,
            isYetLoad: true,
        })

        console.log('视频加载')
        console.log(data)
    }

    onProgress(data) {
        this.setState({
            progress : data.duration,
        })
        console.log(JSON.stringify(data))
    }

    onLoadStart() {
        console.log('记载了')
    }
}

const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        top: 5,
        right: 20,
        height: 50, justifyContent: 'center', alignItems: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width: scaleSizeW(298),
        // height: scaleSizeH(200),

    },
    error: {},
    loading: {
        flex: 1,
        justifyContent: 'center'
    },
    videoCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    videoPar: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        margin: 20,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    currentClose: {

    }
})
export default VideoModel
