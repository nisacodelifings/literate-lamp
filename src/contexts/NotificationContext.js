import React, {createContext, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const NotificationContext = createContext();
const {Provider} = NotificationContext;

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return (state = action.notifications);

    case 'DEL_NOTIFICATION':
      return state.filter((el) => el.label !== action.label);

    default:
      return state;
  }
};

export default (props) => {
  const [notifications, dispatch] = useReducer(reducer, initialState);

  const notificationDispatch = useMemo(() => {
    return {
      delNotification: async (label) => {
        const newNotifs = notifications.filter((el) => el.label !== label);
        await AsyncStorage.setItem('notifications', JSON.stringify(newNotifs));
        dispatch({type: 'DEL_NOTIFICATION', label});
      },
      setNotifications: async (payload) => {
        await AsyncStorage.setItem('notifications', JSON.stringify(payload));

        dispatch({
          type: 'SET_NOTIFICATIONS',
          notifications: payload,
        });
      },
    };
  }, []);

  return (
    <Provider value={{notifications, dispatch: notificationDispatch}}>
      {props.children}
    </Provider>
  );
};
