import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Components
import AppDrawerContent from '../components/AppDrawerContent';

// Stacks
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <AppDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        children={HomeStack}
        options={{title: 'Dashboard'}}
      />
    </Drawer.Navigator>
  );
};
