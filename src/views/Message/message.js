import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Dimensions,
    PixelRatio,
    Image,
    TouchableNativeFeedback,
    FlatList,
    TouchableOpacity
} from 'react-native';
import HeadTopBar from '../../common/headTopBar'
import SlideIndex from '../Slide/slide'
import SideMenu from 'react-native-side-menu'
import {connect} from "react-redux";
import {getMessageListAction} from "../../store/message/messageAction";
import {scaleSizeW} from '../../untils/scale'
import RightDrownSelect from '../../common/rightDrownSelect'

let {width, height} = Dimensions.get('window');
const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class MessageIndex extends Component {
    messageList;

    constructor(props) {
        super(props);
        // this.personList = props.slide.personList;
        this.messageList = props.message.messageList;
        this._createEmptyView = this._createEmptyView.bind(this)
        //当前页
        this.page = 1
        this.state = {
            slideOpenStatus: '开',
            isOpen: false,
            // 列表数据结构
            data: [],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
            emptyViewText: '加载中',
            // 下拉框的标志
            rightDrownSelect: false,
        }
        // this.SelectMenuItemCallBack = this.SelectMenuItemCallBack.bind(this);
        this._onItemClick = this._onItemClick.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    /*
        @params: {val}
        侧边栏是否打开
     */
    changeSlideStatus(val) {
        this.props.dispatch({type: 'CONTROL_SLIDE_STATUS', payload: !this.props.message.slideIsOpen})
        // this.setState({
        //     isOpen: !this.state.isOpen,
        // });
    }

    /*
    右侧菜单
     */
    rightMenuStatus() {
        this.setState({
            rightDrownSelect: !this.state.rightDrownSelect,
        });
    }

    componentDidMount() {
        console.log(this.messageList)
        if (this.messageList.length === 0) {
            this.props.dispatch(getMessageListAction);
        }
        setInterval(() => {
            this.setState({
                emptyViewText: '暂无数据'
            })
        }, 2000)

    }

    /*
    渲染单行
     */
    _renderItem({item}) {
        return <TouchableOpacity onPress={() => {
            if (this.state.rightDrownSelect) {
                this.setState({
                    rightDrownSelect: false,
                });
                return false;
            }
            alert(item.name)
        }
        }>
            <View style={styles.listRow}>
                <Image source={{uri: item.photo}} style={styles.imgStyle}>
                </Image>
                <View style={styles.message}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.itemName}>{item.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={styles.itemMessage}>{item.message[0].mes}</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.itemTime}>{item.time}</Text>
                    <Text
                        style={styles.messageNumber}>{item.message.length > 10 ? 10 + '+' : item.message.length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    /*
    渲染
     */

    render() {
        //初始化menu，传递回调函数
        const menu = this.props.message.slideIsOpen === true ? <SlideIndex/> : null;
        const rightDrown = this.state.rightDrownSelect === true ? <RightDrownSelect/> : null;
        const messageList = this.props.message.messageList;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.props.message.slideIsOpen}
                onChange={(isOpen) => {
                    this.props.dispatch({type: 'CONTROL_SLIDE_STATUS', payload: isOpen})
                }}
                menuPosition={'left'}//侧边栏是左边还是右边
                openMenuOffset={1 * width}//侧边栏的宽度
                disableGestures={false}
                edgeHitWidth={200}//手指拖动可以打开侧边栏的距离（距离侧边栏）

            >
                <View style={{
                    flex: 1,
                    backgroundColor: this.props.message.slideIsOpen === true ? 'rgba(0,0,0,0.5)' : '#eeeeee',
                }}>
                    <View style={{height: 40}}>
                        <HeadTopBar
                            name={'消息'}
                            tabBarVisible={'true'}
                            iconLeftName={'ios-person'}
                            iconRightName={'ios-menu'}
                            iconLeftFun={this.changeSlideStatus.bind(this)}
                            iconRightFun={this.rightMenuStatus.bind(this)}
                        />
                        {rightDrown}
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={messageList}
                            // refreshing={true}
                            renderItem={this._renderItem}
                            // 空布局
                            ListEmptyComponent={this._createEmptyView}
                            //添加头尾布局
                            //ListHeaderComponent={this._createListHeader}
                            //ListFooterComponent={this._createListFooter}
                            //下拉刷新相关
                            onRefresh={() => this._onRefresh()}
                            refreshing={this.state.isRefresh}
                            //加载更多
                            //onEndReached={() => this._onLoadMore()}
                            onEndReachedThreshold={0.1}
                        />

                    </View>
                </View>
            </SideMenu>
        )
    }

    /**
     * 创建头部布局
     */
    _createListHeader() {
        return (
            <View style={styles.headView}>
                <Text style={{color: 'white'}}>
                    头部布局
                </Text>
            </View>
        )
    }

    /**
     * 创建脚部布局
     */
    _createListFooter() {
        return (
            <View style={styles.footerView}>
                <Text style={{color: 'white'}}>
                    底部底部
                </Text>
            </View>
        )
    }

    /**
     * 空布局
     */
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    {this.state.emptyViewText}
                    {/*暂无数据*/}
                </Text>
            </View>
        );
    }

    /**
     * 下啦刷新
     * @private
     */
    _onRefresh = () => {
        // 不处于 下拉刷新
        if (!this.state.isRefresh) {
            this.page = 1
            // this._getHotList()
            this.props.dispatch(getMessageListAction)
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0) {
            this.page = this.page + 1
            this._getHotList()
        }
    }

    /**
     * item点击事件
     */
    _onItemClick(item) {
        alert(111)
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    messageCon: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listRow: {
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderColor: color.border,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    imgStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    itemText: {
        width: scaleSizeW(320),
        fontSize: 18,
        paddingLeft: 40,
        lineHeight: 20,
        marginLeft: 20,
        alignItems: 'center',
    },
    itemName: {
        color: '#6c6c6c',
        fontWeight: '200',
        width: 320,
        fontSize: 16,
        paddingLeft: 40,
        lineHeight: 20,
        marginLeft: 20,
        alignItems: 'center',
    },
    itemMessage: {
        color: '#cdcdcd',
        fontWeight: '100',
        width: scaleSizeW(400),
        fontSize: 13,
        paddingLeft: 40,
        lineHeight: 16,
        marginLeft: 20,
        alignItems: 'center',
    },
    itemTime: {
        fontSize: 14,
        position: 'absolute',
        right: 10,
        top:-5
    },
    message: {
        flexDirection: 'column',
        fontSize: 8,
        position: 'absolute',
        left: scaleSizeW(40),
        top: 10
    },
    time: {
        fontSize: 6,
        flexDirection: 'column',
        marginBottom:6,
    },
    messageNumber: {
        flex: 1,
        width: 35,
        fontSize: 12,
        color: '#ffffff',
        height: 18,
        lineHeight: 16,
        borderRadius: 13,
        backgroundColor: '#FF3399',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: -5

    }
});
const mapStateToProps = (state, ownProps) => {
    return {
        bottom: state.bottomReducer,
        message: state.messageReducer,
        slide: state.slideReducer
    }
}
export default connect(mapStateToProps)(MessageIndex);
