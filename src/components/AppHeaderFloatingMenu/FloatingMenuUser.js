import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

// Theme
import {colors} from '../../theme';

// Contexts
import {AuthContext} from '../../contexts/AuthContext';

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
    minWidth: Dimensions.get('window').width * 0.45,
    borderRadius: 4,
    elevation: 10,
  },
  header: {
    backgroundColor: '#8F7CBC',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 4,
    borderTopRightRadius: 4,
  },
  headerImage: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  headerInfo: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    textTransform: 'capitalize',
  },
  smallText: {
    fontSize: 12,
  },
  menus: {
    paddingHorizontal: 10,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  menuIcon: {
    fontSize: 16,
    color: colors.secondary,
  },
  menuLabel: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: 6,
    width: Dimensions.get('window').width * 0.3,
    textTransform: 'capitalize',
  },
});

export default ({menus, show}) => {
  const {user} = useContext(AuthContext);

  if (!show) {
    return <View style={{position: 'absolute'}} />;
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/avatar.png')}
            style={[styles.headerImage]}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={[styles.text, styles.smallText]}>{user.level}</Text>
          </View>
        </View>
        <View style={styles.menus}>
          {menus.map((menu, i) => {
            const isLastItem = i + 1 === menus.length;
            const borderStyle = {
              borderBottomColor: isLastItem ? colors.white : '#EBECF2',
            };
            return (
              <TouchableOpacity key={menu.label} onPress={menu.onPress}>
                <View style={[styles.menu, borderStyle]}>
                  <Feather style={styles.menuIcon} name={menu.icon} />
                  <Text style={styles.menuLabel} numberOfLines={1}>
                    {menu.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
