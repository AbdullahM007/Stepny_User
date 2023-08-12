import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DestinationSearchScreen from '../screens/DestinationSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import SearchResultMap from '../screens/SearchResultScreen/SearchResultMap';
import SettingScreen from '../SmallScreens/SettingScreen';
import OrderScreen from '../screens/OrderScreen';
import LoginScreen from '../SmallScreens/LoginScreen';
import SignUpScreen from '../SmallScreens/SignupScreen';
import ForgotScreen from '../SmallScreens/ForgotSecreen';
import RootNavigator from './Root';
import OTPScreen from '../SmallScreens/OtpScreen';

const Stack = createStackNavigator();
const HomeNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={"SplashScreen"} component={SplashScreen} /> */}
      {/* <Stack.Screen name={"Intro"} component={Intro}/> */}

      {/* <Stack.Screen name={'Home'} component={HomeScreen} /> */}
      <Stack.Screen
        name={'DestinationSearchScreen'}
        component={DestinationSearchScreen}
      />
      <Stack.Screen
        name={'SearchResultScreen'}
        component={SearchResultScreen}
      />
      <Stack.Screen name={'SearchResultMap'} component={SearchResultMap} />
      <Stack.Screen name={'SettingScreen'} component={SettingScreen} />
      <Stack.Screen name={'OrderScreen'} component={OrderScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="RootNavigator" component={RootNavigator} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
