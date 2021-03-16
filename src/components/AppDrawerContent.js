import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {
  Drawer,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

// Theme
import {colors} from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: "#7800C6",
    backgroundColor: colors.secondary,
  },
  header: {},
  body: {
    flex: 1,
  },
  footer: {
    borderTopColor: '#41335F',
    borderTopWidth: 2,
  },
});

export default (props) => {
  const onSignOut = () => console.log('onSignOut');

  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView {...props}>
        {/* <View style={styles.header}>
          <Text>Header</Text>
        </View> */}
        <View style={styles.body}>
          <DrawerItem
            label="Dashboard"
            labelStyle={{color: colors.white, fontSize: 17}}
            icon={() => <Feather name="home" size={17} color={colors.white} />}
            onPress={null}
          />
          <DrawerItem
            label="Master Data"
            labelStyle={{color: colors.white, fontSize: 17}}
            icon={() => <Feather name="box" size={17} color={colors.white} />}
            onPress={null}
          />
          <DrawerItem
            label="Users"
            labelStyle={{color: colors.white, fontSize: 17}}
            icon={() => <Feather name="users" size={17} color={colors.white} />}
            onPress={null}
          />
          <DrawerItem
            label="Laporan"
            labelStyle={{color: colors.white, fontSize: 17}}
            icon={() => (
              <Feather name="layout" size={17} color={colors.white} />
            )}
            onPress={null}
          />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <DrawerItem
          label="Sign Out"
          labelStyle={{color: colors.white, fontSize: 17}}
          icon={() => <Feather name="log-out" size={17} color={colors.white} />}
          onPress={onSignOut}
        />
      </View>
    </View>
  );
};
