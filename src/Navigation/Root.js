import React from 'react';
import {View,Text} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

import HomeNavigator from './Home';

const Drawer= createDrawerNavigator();
const DummyScreen =(props)=>(
  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
    <Text> {props.name} </Text>
  </View>
)


const RootNavigator = (props) => {
  return (
    <NavigationContainer>
       <Drawer.Navigator drawerContent={(props) => (<CustomDrawer{...props}/>)} >

       <Drawer.Screen  name="Homes" component={HomeNavigator}/>

       <Drawer.Screen name="Your Mechanic Record">
       {()=> <DummyScreen name="Your Mechanic Record"/>}
       </Drawer.Screen>

       <Drawer.Screen name="Help">
       {()=> <DummyScreen name="Help"/>}
       </Drawer.Screen>

       <Drawer.Screen name="Setting">
       {()=><DummyScreen name="Setting"/>}
       </Drawer.Screen>

       </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator ;
