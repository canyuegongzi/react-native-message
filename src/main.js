import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import Apply from './views/Apply/apply';
import Message from './views/Message/message';
import Mine from './views/Mine/mine';
import Market from './views/Market/market';
import MyTabBar from './common/myTabBar'
import { connect } from 'react-redux';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['消息', '应用', '动态', '我的'],
            tabIconNames: ['ios-text', 'ios-keypad', 'logo-buffer', 'ios-contact'],

        };
    }


    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                //renderTabBar={() => <DefaultTabBar/>}
                renderTabBar={() => <MyTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition={'bottom'}

                onChangeTab={
                    (obj) => {
                        if(this.props.message.slideIsOpen) {
                            this.props.dispatch({type: 'CONTROL_SLIDE_STATUS', payload: !this.props.message.slideIsOpen})
                        }

                        // console.log('被选中的tab下标：' + obj.i);
                    }
                }
                onScroll={
                    (position) => {
                        // console.log('滑动时的位置：' + position);
                    }
                }
                // this.props.bottom.locked
                locked = {this.props.message.slideIsOpen ? true : false}
                initialPage={0}
                prerenderingSiblingsNumber={4}

            >
                <View tabLabel="page1" style={styles.center}>
                    <Message></Message>
                </View>
                <View tabLabel="page2" style={styles.center}>
                    <Apply></Apply>
                </View>
                <View tabLabel="page3" style={styles.center}>
                    <Market></Market>
                </View>

                <View tabLabel="page4" style={styles.center}>
                    <Mine></Mine>
                </View>


            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        // flexDirection: 'column',
        // textAlign: 'center',
        // justifyContent: 'center',

    },
});
const mapStateToProps = (state, ownProps) => {
    return {
        bottom: state.bottomReducer,
        message: state.messageReducer
    }
}
export default connect(mapStateToProps)(Main);
