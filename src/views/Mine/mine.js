import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, Platform} from 'react-native';
import HeadTopBar from "../../common/headTopBar";

class MineIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 40}}>
                    <HeadTopBar
                        name={'个人中心'}
                        tabBarVisible={'true'}
                    />
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
})
export default  MineIndex
