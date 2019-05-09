import Icon from 'react-native-vector-icons/Ionicons'; //这个是图标
import  PropTypes from 'prop-types'
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
export default class MyTabBar extends Component {
    static propTypes = {

        goToPage: PropTypes.func, // 跳转到对应tab的方法
        activeTab: PropTypes.number, // 当前被选中的tab下标
        tabs: PropTypes.array, // 所有tabs集合

        tabNames: PropTypes.array, // 保存Tab名称
        tabIconNames: PropTypes.array, // 保存Tab图标

    };  // 注意这里有分号


    render() {
        return (
            <View style={styles.tabs}>
                {/*遍历。系统会提供一个tab和下标 调用一个自定义的方法*/}
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        // console.log('动画值：'+value);
    }

///  处理tabbar的颜色和字体及图标
    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? "#FF3399" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            //因为要有点击效果 所以要引入可触摸组件
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={tab}>
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]} // 图标 调用传入的属性
                        size={30}
                        color={color}/>
                    <Text style={{color: color}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 55,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },

});
