import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../theme';

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{props.label}</Text>
        {props.showForgotLink && (
          <TouchableOpacity onPress={props.onForgotPassword}>
            <Text style={styles.text}>forgot password?</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textInputWrapper}>
        <Feather
          name={props.icon || 'home'}
          size={20}
          color={colors.secondary}
        />
        <TextInput
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          style={styles.textInput}
          editable={props.editable}
          secureTextEntry={props.secureTextEntry}
        />
        {props.isPassword && (
          <TouchableOpacity onPress={props.togglePassword}>
            <Feather
              name={props.secureTextEntry ? 'eye' : 'eye-off'}
              size={20}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  labelWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    color: colors.lightGray,
    textTransform: 'capitalize',
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  textInput: {
    fontSize: 19,
    color: colors.secondary,
    marginLeft: 10,
    flex: 1,
  },
});
