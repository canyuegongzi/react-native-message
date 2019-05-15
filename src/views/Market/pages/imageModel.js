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
    Dimensions, Platform, ActivityIndicator, TouchableNativeFeedback,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
let {width, height} = Dimensions.get('window');

class ImgModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            modalVisible: props.img.isShow
        };
        this.changeIndex = this.changeIndex.bind(this)
        this.images = this.mapUrlList(props.img.imgInfo)
    }

    changeIndex() {
        this.props.fn()
    }
    mapUrlList(data) {

       let arr =  data.map(((item) => {
            return {
                url: item.pic,
                freeHeight: true,
                freeWidth: true
            }
        }))
        console.log(arr)
        return arr;
    }
    render() {
        let modalVisible = this.props.img.isShow;
        //let imgInfo = this.props.img.imgInfo;
        //let imgInfo = this.state.
        //console.log(imgInfo)
        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => {}}
                >
                    <ImageViewer
                        imageUrls={this.images}
                        index={this.state.index}
                        style={styles.img}
                        onCancel={this.changeIndex}
                        onSwipeDown={() => {
                            console.log('onSwipeDown');
                        }}
                        saveToLocalByLongPress={false}
                        onMove={data => console.log(data)}
                        onChange={data => {
                            this.setState({
                                index: data
                            });
                        }}
                        enableSwipeDown={true}
                        menuContext= {{ "saveToLocal": "保存到相册", "cancel": "取消" }}
                        enableImageZoom={true}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            this.props.fn('子组件的值')
                        }}
                        style={styles.close}>
                        <Icon
                            name={'ios-close'} // 图标 调用传入的属性
                            size={40}
                            color={'#ffffff'}/>
                    </TouchableHighlight>
                </Modal>
            </View>
        );
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
    currentClose: {},
    img: {
        height: height,
        width: width,
        paddingLeft: 0,
        paddingRight: 0,
    }
})
export default ImgModel
