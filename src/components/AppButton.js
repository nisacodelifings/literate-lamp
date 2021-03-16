import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {colors} from '../theme';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const AppButton = (props) => {
  if (props.isLoading) {
    return (
      <View style={styles.appButton}>
        <ProgressBar color={colors.white} style={styles.progress} />
        <Text style={styles.appButtonText}>{props.title}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={[
          styles.appButton,
          {backgroundColor: props.bgColor || colors.primary},
          {elevation: props.showElevation ? 5 : 0},
        ]}>
        <Text
          style={[styles.appButtonText, {color: props.textColor || 'white'}]}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  appButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 19,
    marginBottom: 10,
    borderRadius: 4,
    minWidth: Dimensions.get('window').width * 0.2,
  },
  appButtonText: {
    fontSize: 20,
    color: 'white',
    textTransform: 'capitalize',
  },
  progress: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
});

export default AppButton;
