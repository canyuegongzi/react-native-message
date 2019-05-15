/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */


import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'
import {scaleSizeH} from "../untils/scale";

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type Props = {
  style?: any,
}

class Separator extends PureComponent<Props> {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}


const styles = StyleSheet.create({
  line: {
    width: screenWidth,
    height: scaleSizeH(5),
    backgroundColor: color.border,
  },
})


export default Separator
