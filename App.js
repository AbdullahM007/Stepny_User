import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, PermissionsAndroid, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DestinationSearchScreen from './src/screens/DestinationSearchScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchResultScreen from './src/screens/SearchResultScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Router from './src/Navigation/Root';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Intro from './src/components/HomeIntro/Intro';
import {withAuthenticator, useAuthenticator} from 'aws-amplify-react-native';
import {Provider} from 'react-redux';
import {store} from './src/ReduxTollKit/store';
navigator.geolocation = require('@react-native-community/geolocation');

//  import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
import RootNavigator from './src/Navigation/Root';
import HomeNavigator from './src/Navigation/Home';
import {NavigationContainer} from '@react-navigation/native';
//  Amplify.configure(awsExports);

const App = () => {
  // for location permission
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Stepney App Location Permission',
          message:
            'Stepney App needs access to your Location ' +
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
      console.warn('Error requesting location permission:', err);
    }
  };
  useEffect(() => {
    //For Android
    if (Platform.OS === 'android') {
      androidPermission();
    } //For IOS
    else {
      Geolocation.requestAuthorization();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="white-content" />
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
};
export default App;
