import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, Platform, FlatList} from 'react-native';
import {connect} from "react-redux";
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import Cell from './Cell'
import {getMarketListAction} from "../../store/market/marketAction";
import Api from "../../api/api";
import HeadTopBar from "../../common/headTopBar";



class MarketIndex extends Component {
    constructor(props) {
        super(props)
        this.marketList = props.market.marketList;
        this.video = props.market.video;
        this.state = {
            videoDataList: props.market.video,
            refreshState: false,
            emptyViewText: '正在加载中',
            // 下拉刷新
            isRefresh: false,
            // 加载更多
            isLoadMore: false,
        }
        this._createEmptyView = this._createEmptyView.bind(this);
        // console.log(props.market.video)
    }

    componentDidMount() {
        // this.onHeaderRefresh();
        if (this.marketList.length === 0) {
            this.props.dispatch(getMarketListAction);
            console.log(this.marketList)
        }
        setInterval(() => {
            this.setState({
                emptyViewText: '暂无数据'
            })
        }, 2000)
    }

    renderCell = (info: Object) => {
        return <Cell info={info} />
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
        if (!this.state.refreshState) {
            this.props.dispatch(
                {
                    type: 'SET_PAGE_NUMBER',
                    payload: 1
                }
            );
            this.props.dispatch(getMarketListAction);
        }
    };
    /**
     * 加载更多
     * @private
     */
    async _onLoadMore() {
        const page = this.props.page;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.props.market.marketList.length > 0) {
            const newPage = page + 1;
            this.props.dispatch(
                {
                    type: 'SET_PAGE_NUMBER',
                    payload: newPage
                }
           );
            // console.log(this.props.market.marketList)
            // console.log(this.props.market.page)
           await Api.getMyMarketList( {Authorization:'555d5d5ddd', row: 10,page: this.props.market.page},response=>{
                console.log(response)
               this.props.dispatch(
                    {
                        type: 'SET_MARKET_LIST',
                        payload: response.data
                    }
                )
            })
        }
    }
    render() {
        const marketList = this.props.market.marketList;
        return (
            <View style={styles.container}>
                <View style={{height: 40}}>
                    <HeadTopBar
                        name={'动态'}
                        tabBarVisible={'true'}
                    />
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={marketList}
                    // refreshing={true}
                    renderItem={this.renderCell}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //添加头尾布局
                    //ListHeaderComponent={this._createListHeader}
                    //ListFooterComponent={this._createListFooter}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.refreshState}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        market: state.marketReducer
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})
export default connect(mapStateToProps)(MarketIndex);
