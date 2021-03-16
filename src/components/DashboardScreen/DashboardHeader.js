import React, {useContext} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

// Theme
import {colors} from '../../theme';

// Contexts
import {AuthContext} from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  hrLineWrapper: {
    marginTop: 10,
    width: '100%',
    height: 2,
    backgroundColor: colors.gray,
  },
  hrLineAccent: {
    width: Dimensions.get('window').width * 0.4,
    height: 2,
    backgroundColor: colors.primary,
    position: 'absolute',
    left: 0,
  },
});

export default (props) => {
  const {user} = useContext(AuthContext);
  const title = `Welcome ${user.level || ''}`;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.hrLineWrapper}>
        <View style={styles.hrLineAccent} />
      </View>
    </View>
  );
};
