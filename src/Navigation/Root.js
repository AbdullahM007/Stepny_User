import React from 'react';
import { View, Text, Pressable } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import HomeNavigator from './Home';
import HelpScreen from '../SmallScreens/HelpScreen';
import RecentRidesScreen from '../SmallScreens/MechanicRecord';
import ChatScreen from '../SmallScreens/ChatScreen';
import SettingScreen from '../SmallScreens/SettingScreen';

const Drawer = createDrawerNavigator();

const drawerScreenOptions = {
  drawerLabelStyle: { color: 'white' }, 
};


const RootNavigator = () => {
  return (
    
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={drawerScreenOptions} >
        <Drawer.Screen name="Homes" component={HomeNavigator} />
        <Drawer.Screen name="Your Mechanic Record" component={RecentRidesScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
};

export default RootNavigator;