import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// Theme
import {colors} from '../theme';

// Contexts
import {AuthContext} from '../contexts/AuthContext';
import {NotificationContext} from '../contexts/NotificationContext';

// Components
import {FloatingMenuUser, FloatingMenuNotif} from './AppHeaderFloatingMenu';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  icon: {
    color: colors.primary,
    fontSize: 24,
    marginLeft: 10,
  },
  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.green,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    elevation: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: Dimensions.get('window').width * 0.45,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.gray,
    fontSize: 15,
  },
});

export default (props) => {
  const {signOut} = useContext(AuthContext);
  const [showUserMenus, setShowUserMenus] = useState(false);
  const [showUserNotif, setShowUserNotif] = useState(false);

  const [userMenus, setUserMenus] = useState([
    {
      label: 'my profile',
      icon: 'user',
      onPress: () => console.log('my profile pressed'),
    },
    {
      label: 'change password',
      icon: 'lock',
      onPress: () => console.log('change password pressed'),
    },
    {
      label: 'logout',
      icon: 'log-out',
      onPress: () => signOut(),
    },
  ]);

  const onProfilePressed = () => {
    setShowUserNotif(false);
    setShowUserMenus(!showUserMenus);
  };

  const onNotificationPressed = () => {
    setShowUserMenus(false);
    setShowUserNotif(!showUserNotif);
  };

  // FIXME: Fetch notifications from server
  const {notifications, dispatch} = useContext(NotificationContext);
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);

  useEffect(() => {
    console.log('loading....');
    setIsNotificationLoading(true);
    setTimeout(() => {
      setIsNotificationLoading(false);
      console.log('we have the data');

      dispatch.setNotifications([
        {label: 'Pariatur consectetur veniam ex labore', date: Date.now()},
        {label: 'Est cillum sit nulla eiusmod eu', date: Date.now()},
      ]);
    }, 2000);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapper}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Feather name="list" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.textInput} />
          <Feather
            name="search"
            style={[styles.icon, {color: colors.lightGray}]}
          />
        </View>

        {!isNotificationLoading && (
          <TouchableOpacity onPress={onNotificationPressed}>
            <Feather name="bell" style={styles.icon} />
            {notifications.length !== 0 && <View style={styles.greenDot} />}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onProfilePressed}>
          <Image
            source={require('../assets/avatar.png')}
            style={[styles.image, {marginLeft: 14}]}
          />
        </TouchableOpacity>
      </View>

      <FloatingMenuUser menus={userMenus} show={showUserMenus} />

      <FloatingMenuNotif show={showUserNotif} />
    </View>
  );
};
