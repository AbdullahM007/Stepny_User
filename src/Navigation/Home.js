import {View, Text} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import SearchResultMap from '../screens/SearchResultScreen/SearchResultMap';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Intro from '../components/HomeIntro/Intro';


const Stack= createStackNavigator();
const HomeNavigator = (props) => {
  return (
    
    
        <Stack.Navigator screenOptions={{headerShown:false,}}
        >
          {/* <Stack.Screen name={"SplashScreen"} component={SplashScreen} /> */}
          {/* <Stack.Screen name={"Intro"} component={Intro}/> */}
          
           <Stack.Screen name={"Home"} component={HomeScreen}/>
          <Stack.Screen name={"DestinationSearchScreen"} component={DestinationSearchScreen}/>
          <Stack.Screen name={"SearchResultScreen"} component={SearchResultScreen}/>
          <Stack.Screen name={"SearchResultMap"} component={SearchResultMap}/>
        </Stack.Navigator>
    
  );
};
export default HomeNavigator ;
