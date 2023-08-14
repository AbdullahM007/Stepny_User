import {View, Text, Image, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Logo from '../../assets/Images/engineer.png';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = props => {
  const [timer, setTimer] = useState(3);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigation.navigate('Home');
    }
  }, [timer, navigation]);
  const edges = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
      }}>
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={Logo} style={{width: 100, height: 100}}></Image>
        <Text style={{color: 'red', fontSize: 25, fontWeight: 'bold'}}>
          STEPNEY
        </Text>
      </Animated.View>
    </View>
  );
};
export default SplashScreen;
