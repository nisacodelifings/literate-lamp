import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';

// Stacks
import DrawerStack from './DrawerStack';
import AuthStack from './AuthStack';

const RootStack = createStackNavigator();

export default ({token}) => {
  const screenOptions = {animationEnabled: false};

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootStack.Navigator headerMode="none">
      {token ? (
        <RootStack.Screen
          name="AppScreen"
          component={DrawerStack}
          options={screenOptions}
        />
      ) : (
        <RootStack.Screen
          name="AuthScreen"
          component={AuthStack}
          options={screenOptions}
        />
      )}
    </RootStack.Navigator>
  );
};

export const Home = (props) => {
  return (
    <View>
      <Text>HOME</Text>
    </View>
  );
};
