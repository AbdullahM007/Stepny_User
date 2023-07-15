import React from 'react';
import {StatusBar, View,Text} from 'react-native';
import styles from './styles';

const InfoMessage = () => {
  return (
   <View style={styles.container}>
    <Text style={styles.title}>Please turn on your location from setting.</Text>
      <Text style={styles.text}>Please Search the Mechanic that is near by you.</Text>
      <Text style={styles.learnMore}>Learn More</Text>

   </View>
  );
};
export default InfoMessage;