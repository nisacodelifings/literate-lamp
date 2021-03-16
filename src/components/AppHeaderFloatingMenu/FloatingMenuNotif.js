import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

import {colors} from '../../theme';
import {NotificationContext} from '../../contexts/NotificationContext';

export default (props) => {
  const {notifications, dispatch} = useContext(NotificationContext);

  const onCloseNotif = (label) => {
    dispatch.delNotification(label);
  };

  if (!props.show) {
    return <View style={{position: 'absolute'}} />;
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.content}>
        <View style={styles.notifications}>
          {notifications.map((menu, i) => {
            const isLastItem = i + 1 === notifications.length;
            const borderStyle = {
              borderBottomColor: isLastItem ? colors.white : '#EBECF2',
            };
            return (
              <View style={[styles.notification, borderStyle]} key={menu.label}>
                <View>
                  <Text style={styles.notificationLabel} numberOfLines={4}>
                    {menu.label}
                  </Text>
                  <Text style={styles.notificationDate} numberOfLines={1}>
                    {moment(menu.date).format('lll')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => onCloseNotif(menu.label)}>
                  <Feather name="x" size={20} color={colors.lightGray} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 40,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: Dimensions.get('window').height,
  },
  content: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 4,
    elevation: 10,
  },

  notifications: {
    paddingHorizontal: 10,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  notificationLabel: {
    color: colors.secondary,
    fontSize: 16,
    lineHeight: 22,
    width: Dimensions.get('window').width * 0.34,
    textTransform: 'capitalize',
  },
  notificationDate: {
    width: Dimensions.get('window').width * 0.34,
    color: colors.lightGray,
    fontSize: 13,
    marginTop: 6,
  },
});
