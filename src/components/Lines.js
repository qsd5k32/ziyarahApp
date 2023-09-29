import { StyleSheet, View } from 'react-native';
import React from 'react';
import colors from '../assets/Colors';

const Lines = ({ colorOne, colorTwo, numLines }) => {
  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < numLines; i++) {
      lines.push(
        <View
          key={i}
          style={[
            styles.line,
            { backgroundColor: i < numLines - 1 ? colorTwo : colorOne },
          ]}
        ></View>
      );
    }
    return lines;
  };

  return <View style={styles.linesContainer}>{renderLines()}</View>;
};

const styles = StyleSheet.create({
  linesContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 22,
    gap: 10,
  },
  line: {
    width: 50,
    height: 8,
    borderRadius: 30,
  },
});

export default Lines;
