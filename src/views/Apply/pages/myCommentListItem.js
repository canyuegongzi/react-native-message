import React from "react";
import {TouchableNativeFeedback,View,Text} from "react-native";


class MyCommentListItem extends React.PureComponent {
    switchVideo = () => {
        this.props.onPressItem(this.props.info);
    };

    render() {
        const item = this.props.info;
        const style  = this.props.styleItem;
        console.log(style)
        return (<TouchableNativeFeedback
            onPress={this.switchVideo}
        >
            <View style={[styles.listRow, {
                backgroundColor:  style === item.name ? '#FF3399' : '#ffffff',
            }]}>
                <Text style={[styles.itemText,{ color: style === item.name ? '#ffffff' : '#000000'}]} key={item.name}>{item.name}</Text>
            </View>
        </TouchableNativeFeedback>)
    }
}
