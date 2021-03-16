import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Dialog} from 'react-native-simple-dialogs';

// Theme
import {colors} from '../theme';

// Components
import AppButton from './AppButton';

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    paddingTop: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 74,
    height: 74,
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.secondary,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'capitalize',
  },
  messages: {
    color: colors.orange,
    width: Dimensions.get('window').width * 0.45,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default (props) => {
  return (
    <Dialog
      visible={props.dialogVisible}
      animationType="fade"
      dialogStyle={styles.dialog}
      contentStyle={styles.content}
      onTouchOutside={props.onTouchOutside}>
      <View style={styles.icon}>
        <Feather
          name={props.iconName || 'info'}
          size={68}
          color={props.iconColor || colors.primary}
        />
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.messages}>{props.messages}</Text>
      <AppButton
        title={props.positiveButton.title}
        onPress={props.positiveButton.onPress}
      />
    </Dialog>
  );
};
