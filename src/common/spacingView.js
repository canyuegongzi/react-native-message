/**
 * @Description:
 * @author Marvin
 * @email yongfeide123@gmail.com
 * @date 2019/5/10
 */

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'


class SpacingView extends PureComponent<{}> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 14,
        backgroundColor: color.paper,
    },
})


export default SpacingView
