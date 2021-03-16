import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from './AppHeader';

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    elevation: 8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
});

export default (props) => {
  return (
    <SafeAreaView style={styles.authScreen}>
      <View style={styles.wrapper}>
        <AppHeader title={props.title} tagline={props.tagline} />
        {props.children}
      </View>
    </SafeAreaView>
  );
};
