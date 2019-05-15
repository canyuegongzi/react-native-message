/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableNativeFeedback,
    Platform
} from "react-native"
import {getUserListAction} from "../../../store/slide/slideAction";
import {Actions} from "react-native-router-flux";
let {width, height} = Dimensions.get('window');

class LivePage extends Component {
    constructor(props) {
        super(props);
        this._createEmptyView = this._createEmptyView.bind(this)
        this.state = {
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
            emptyViewText: '加载中',
            player:null,
            currentVideo: null,
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
            ]
        }
    }
    componentDidMount() {
       // s
    }
    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            setTimeout(()=>{
                this.setState({
                    isRefresh: false
                })
            })
        }
    };
    /*
    渲染列表
     */
    _renderItem({item}) {
        return <TouchableNativeFeedback onPress={() => {
            //Actions.searchPage({info: item,name: item.name})
            console.log(item)
            Actions.liveVideoPlayer({info: item})
        }}>
            <View style={styles.listRow}>
                <Text style={styles.itemText} key={item.name}>{item.name}</Text>
            </View>
        </TouchableNativeFeedback>
    }
    /**
     * 空布局
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
    render() {
        return (
            <View style={styles.container}>
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
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
        flexDirection:   'column',
        marginTop: Platform.OS == 'ios' ? 20 : 0,
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
    }
});
export  default LivePage
