/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/9
 */
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio } from 'react-native'
import {switchCase} from "@babel/types";

const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class TypeOne extends PureComponent {
    render() {
        let info = this.props.info.item
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={{ uri: info.user.headPic }} style={styles.icon} />

                <View style={styles.rightContainer}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.h1}>{info.title}</Text>
                    <View>
                    </View>
                    <Text  numberOfLines={3} ellipsizeMode={'tail'} style={styles.p} numberOfLines={0} style={{ marginTop: 8 }}>{info.title}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.h1, styles.price]}>{info.title}元</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: color.theme
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
})

export default TypeOne
