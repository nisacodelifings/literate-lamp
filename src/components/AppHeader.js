import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 2,
    color: colors.secondary,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    marginBottom: 10,
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.title,
          {textTransform: !props.title ? 'uppercase' : 'capitalize'},
        ]}>
        {props.title || 'KSP'}
      </Text>
      <Text style={styles.tagline}>
        {props.tagline || 'Koperasi Simpan Pinjam'}
      </Text>
    </View>
  );
};
