import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';

// Contexts
import NotificationContextProvider from '../contexts/NotificationContext';

// Components
import AppHeaderScreen from '../components/AppHeaderScreen';

// Contexts
import {AuthContext} from '../contexts/AuthContext';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import {Alert} from 'react-native';

const HomeStack = createStackNavigator();

export default (props) => {
  const navigation = useNavigation();
  const {user, token} = useContext(AuthContext);

  // Ketika berhasil login simpan token ke database
  const saveDeviceToken = async (deviceToken) => {
    console.log('saveDeviceToken', {deviceToken});

    if (user) {
      try {
        const url = 'https://kspapi.webhadecreative.com/api/notif/store';
        const body = JSON.stringify({token_device: deviceToken});
        const headers = {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        await fetch(url, {method: 'POST', headers, body});
      } catch (error) {
        Alert.alert('saveDeviceToken Error', JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then((deviceToken) => saveDeviceToken(deviceToken));

    return messaging().onTokenRefresh((deviceToken) =>
      saveDeviceToken(deviceToken),
    );
  }, []);

  return (
    <NotificationContextProvider>
      <HomeStack.Navigator initialRouteName="Dashboard">
        <HomeStack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerTitle: (props) => <AppHeaderScreen navigation={navigation} />,
          }}
        />
      </HomeStack.Navigator>
    </NotificationContextProvider>
  );
};
