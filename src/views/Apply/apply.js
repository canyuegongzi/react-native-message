import React, { Component } from 'react';
import { StyleSheet, TextInput, View,Text} from 'react-native';

export default  class ApplyIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
                <Text style={{fontSize:20}}>功能页面</Text>
            </View>
        )
    }
}