// import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import ignoreWarnings from 'react-native-ignore-warnings';
import { base_api_url, api_key } from './app-config';

// Theme
import {colors} from './src/theme';
// Context
import {AuthContext} from './src/contexts/AuthContext';
// Stack
import RootStackNavigator from './src/stacks/RootStack';
// Components
import AppDialog from './src/components/AppDialog';

ignoreWarnings([
  'Setting a timer for a long period of time',
  "Can't perform a React state update on an unmounted component",
]);

export default (props) => {
  const [messages, setMessages] = useState('');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const authStateInit = {isLoading: true, token: null, user: null};
  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          user: null,
          isLoading: false,
        };
    }
  };

  const [authState, dispatchAuth] = useReducer(authReducer, authStateInit);

  const authContext = useMemo(() => {
    return {
      signIn: async ({username, password}) => {
        try {
          const headers = {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          };
          const loginUrl = base_api_url + '/user/login';
          const body = JSON.stringify({username, password});
          const res = await fetch(loginUrl, {method: 'POST', headers, body});
          const {token, error} = await res.json();

          if (error) {
            setMessages(JSON.stringify(error));
            setShowWarningDialog(true);
            return;
          }

          const getUserUrl = base_api_url + '/user/me';
          const fetchUser = await fetch(getUserUrl, {
            method: 'POST',
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
            body,
          });
          const user = await fetchUser.json();

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));

          dispatchAuth({type: 'LOGIN', token, user});
        } catch (err) {
          setMessages(JSON.stringify(err));
          setShowWarningDialog(true);
          return;
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        dispatchAuth({type: 'LOGOUT'});
      },
    };
  }, []);

  useEffect(() => {
    const initToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      dispatchAuth({type: 'RETRIEVE_TOKEN', token, user: JSON.parse(user)});
    };
    initToken();
  }, []);

  return (
    <AuthContext.Provider value={{...authContext, ...authState, dispatchAuth}}>
      <NavigationContainer>
        <RootStackNavigator token={authState.token} />
        <AppDialog
          dialogVisible={showWarningDialog}
          title="Oops..."
          messages={messages}
          iconName="x-circle"
          iconColor={colors.orange}
          positiveButton={{
            title: 'ok',
            onPress: () => setShowWarningDialog(false),
          }}
        />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
