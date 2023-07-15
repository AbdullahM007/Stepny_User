import { View, Text } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

const PlaceRow =({data})=> {
    
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {data.description === 'Home'
        ?<Entypo name='home' size={20} color={'red'}/>
        : <Entypo name='location-pin' size={20} color={'red'}/>
      }
      </View>
      <Text style={styles.locationText}>{data.description || data.vicinity}</Text>
    </View>
  );
};
export default PlaceRow;