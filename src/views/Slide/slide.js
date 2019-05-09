import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    AppRegistry,
    FlatList,
    TouchableNativeFeedback, Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {getUserListAction} from '../../store/slide/slideAction';
import Api from "../../api/api";
import Icon from 'react-native-vector-icons/Ionicons';
import HeadTopBar from "../../common/headTopBar";

let {width, height} = Dimensions.get('window');

class SlideIndex extends Component {
    personList;

    constructor(props) {
        super(props);
        this.personList = props.slide.personList;
        this._createEmptyView = this._createEmptyView.bind(this)
        this.state = {
            inputValue: '',
            // 列表数据结构
            data: [],
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
            emptyViewText: '加载中'
        }
        // const {personList} = this.
    }

    componentDidMount() {
        console.log(this.personList)
        setTimeout(() => {
            if (this.personList.length === 0) {
                this.props.dispatch(getUserListAction)
            }
        }, 200)


    }
/*
渲染列表
 */
    _renderItem({item}) {
        return <TouchableOpacity onPress={() => {
            alert(item.id + item.nick)
        }}>
            <View style={styles.listRow}>
                <Image source={{uri: item.photo}} style={styles.imgStyle}></Image>
                <Text style={styles.itemText} key={item.id}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    }

    addUser() {

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

    changeSlideStatus(val) {
        this.props.dispatch({type: 'CONTROL_SLIDE_STATUS', payload: !this.props.message.slideIsOpen})
    }

    rightMenuStatus() {
        alert('联系人页面的右侧')
    }

    _onChangeText(text) {
        if (text) {
            this.setState({inputValue: text})  //实时变化值
            clearTimeout(this.settimeId);       //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
            this.settimeId = setTimeout(() => {
                alert(text)
            }, 1500);                                      //让每次要进行fetch请求时先延迟1秒在进行
        } else {
            this.setState({inputValue: ''})
        }
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
            this.props.dispatch(getUserListAction)
        }
    };

    render() {
        const personList = this.props.slide.personList
        return (
            <View style={{flex: 1}}>
                <View style={{height: 40}}>
                    <HeadTopBar
                        name={'联系人'}
                        tabBarVisible={'true'}
                        iconLeftName={'ios-arrow-back'}
                        iconRightName={'ios-add'}
                        iconLeftFun={this.changeSlideStatus.bind(this)}
                        iconRightFun={this.rightMenuStatus.bind(this)}
                    />
                </View>
                <View style={styles.search}>
                    <TextInput underlineColorAndroid="transparent" placeholder="请输入用户"
                               style={{marginLeft: 10, paddingRight: 40}}
                               onChangeText={this._onChangeText.bind(this)}
                               value={this.state.inputValue}
                               ref="keyWordInput"
                               onSubmitEditing={() => {
                                   this.refs.keyWordInput.blur()
                               }}>
                    </TextInput>
                    <TouchableOpacity>
                        <Icon name={'ios-search'}
                              size={30}
                              onPress={() => alert(1111)}
                              style={styles.icon}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={personList}
                    renderItem={this._renderItem}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }

}

const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff000f',
        // justifyContent:'center',
        // alignItems:'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listRow: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    imgStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 3
    },
    itemText: {
        fontSize: 18,
        paddingLeft: 30,
        lineHeight: 40,
        alignItems: 'center',
        color: '#6c6c6c',
        fontWeight: '400',
        width: 320,
    },
    search: {
        height: 40,
        width: width,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderColor: color.border,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: -35
    }
});
const mapStateToProps = (state, ownProps) => {
    return {
        slide: state.slideReducer,
        message: state.messageReducer
    }
}
export default connect(mapStateToProps)(SlideIndex);
