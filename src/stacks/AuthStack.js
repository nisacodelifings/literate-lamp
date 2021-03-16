import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import SignInScreen from '../screens/SignInScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createStackNavigator();

export default () => {
  const screenOptions = () => ({headerShown: false});

  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={screenOptions}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassScreen} />
      {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
