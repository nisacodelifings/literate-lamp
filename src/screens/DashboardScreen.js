import React from 'react';
import {View} from 'react-native';

// Components
import AppContainer from '../components/AppContainer';
import DashboardHeader from '../components/DashboardScreen/DashboardHeader';
import DashboardFooter from '../components/DashboardScreen/DashboardFooter';

export default ({navigation}) => {
  return (
    <AppContainer>
      <DashboardHeader />

      {/* Body content here */}
      <View style={{flex: 1}}></View>

      <DashboardFooter />
    </AppContainer>
  );
};
