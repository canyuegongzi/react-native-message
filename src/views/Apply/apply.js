import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, Platform} from 'react-native';
import HeadTopBar from "../../common/headTopBar";


export default  class ApplyIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 40}}>
                    <HeadTopBar
                        name={'应用'}
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
