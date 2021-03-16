import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// Theme
import {colors} from '../../theme';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    color: colors.secondary,
    width: Dimensions.get('window').width * 0.8,
  },
});

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text} numberOfLines={1}>
        Copyright © 2020. KSP. All rights reserved.
      </Text>
    </View>
  );
};
