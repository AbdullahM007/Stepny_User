import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {StatusBar,PermissionsAndroid,View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DestinationSearchScreen from './src/screens/DestinationSearchScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchResultScreen from './src/screens/SearchResultScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Router from './src/Navigation/Root'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Intro from './src/components/HomeIntro/Intro';
import { withAuthenticator, useAuthenticator } from 'aws-amplify-react-native'




navigator.geolocation = require('@react-native-community/geolocation');

 import { Amplify } from 'aws-amplify';
 import awsExports from './aws-exports';
 Amplify.configure(awsExports);


const App = () => {
  

  // for location permission
  const androidPermission = async () =>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Stepney App Camera Permission',
          message:
            'Stepney App needs access to your camera ' +
            'so you can take our awesome services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  useEffect(()=>{ //For Android
    if(Platform.OS === 'android'){androidPermission();} else //For IOS
    { Geolocation.requestAuthorization(); }
  },[])


    
  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      
      <SafeAreaProvider>
        

      <Router/>
      

      </SafeAreaProvider>
    </>
  );
};
export default App;
