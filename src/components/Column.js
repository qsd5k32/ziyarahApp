import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Line, Circle } from 'react-native-svg';
export default function Column() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Svg height="300" width="50">
    <Line
      x1="25"
      y1="0"
      x2="25"
      y2="300"
      stroke="grey"
      strokeWidth="1"
    />
    <Circle cx="25" cy="50" r="10" fill="green" stroke="white" strokeWidth="3" />
    <Circle cx="25" cy="150" r="10" fill="green" stroke="white" strokeWidth="3" />
    <Circle cx="25" cy="250" r="10" fill="green" stroke="white" strokeWidth="3"/>
  </Svg>
</View>
  )
}