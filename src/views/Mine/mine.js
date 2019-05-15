import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, Platform,ScrollView,Image,RefreshControl} from 'react-native';
import HeadTopBar from "../../common/headTopBar";
import {Heading1, Heading2, Paragraph} from "./pages/text";
import MineItemCell from "./pages/mineItemCell";
import SpacingView from "../../common/spacingView";
import {scaleSizeH} from "../../untils/scale";
const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class MineIndex extends Component {
    state: {
        isRefreshing: boolean
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        }
    }
    /*
    模拟刷新
     */
    onHeaderRefresh() {
        this.setState({isRefreshing: true})

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000);
    }
    /*
    渲染行
     */
    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <MineItemCell image={data.image} title={data.title} subtitle={data.subtitle}
                                         key={data.title}/>
                cells.push(cell)
            }
            cells.push(<SpacingView key={i}/>)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }
    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userContainer}>
                    <Image style={styles.avatar} source={require('../../assets/img/mine/avatar.png')}/>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Heading1 style={{color: 'white'}}>code_xzh</Heading1>
                            <Image style={{marginLeft: 4}}
                                   source={require('../../assets/img/mine/beauty_technician_v15.png')}/>
                        </View>
                        <Paragraph style={{color: 'white', marginTop: 4}}>个人信息 ></Paragraph>
                    </View>
                </View>
            </View>
        )
    }
    getDataList() {
        return (
            [
                [
                    {title: '我的钱包', subtitle: '办信用卡', image: require('../../assets/img/mine/icon_mine_wallet.png')},
                    {title: '余额', subtitle: '￥95872385', image: require('../../assets/img/mine/icon_mine_balance.png')},
                    {title: '抵用券', subtitle: '63', image: require('../../assets/img/mine/icon_mine_voucher.png')},
                    {title: '会员卡', subtitle: '2', image: require('../../assets/img/mine/icon_mine_membercard.png')}
                ],
                [
                    {title: '好友去哪', image: require('../../assets/img/mine/icon_mine_friends.png')},
                    {title: '我的评价', image: require('../../assets/img/mine/icon_mine_comment.png')},
                    {title: '我的收藏', image: require('../../assets/img/mine/icon_mine_collection.png')},
                    {title: '会员中心', subtitle: 'v15', image: require('../../assets/img/mine/icon_mine_mineorder.png')},
                    {title: '积分商城', subtitle: '好礼已上线', image: require('../../assets/img/mine/icon_mine_member.png')}
                ],
                [

                ]
            ]
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 45}}>
                    <HeadTopBar
                        name={'个人中心'}
                        tabBarVisible={'true'}
                        iconLeftName={'ios-notifications'}
                        iconRightName={'md-settings'}
                        iconLeftFun={() => alert('left')}
                        iconRightFun={() => alert('right')}
                    />

                </View>
                <View style={{
                    width: screenWidth,
                    height:0,
                    backgroundColor: '#06C1AE'
                    //backgroundColor: '#FF3399'
                }}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    header: {
        //backgroundColor: '#06C1AE',
        backgroundColor: '#FF3399',
        paddingBottom: 20
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 7,
    },
    icon: {
        width: 27,
        height: 27,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
})
export default  MineIndex
