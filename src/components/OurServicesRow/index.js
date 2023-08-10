
import {View, Text,Image,Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons'




const OurServicesRow = (props) => {
    const {type,onPress,isSelected} = props;
    const getImage =()=>
  {
    if (type.type === 'Mechanic'){
    return require('../../assets/Images/Mechanic-car.png')

  }
  if (type.type === 'Electrician'){
    return require('../../assets/Images/electric-car.png')

  }

    return require('../../assets/Images/tow-truck.png')

  }
  return (
    <Pressable onPress={onPress} style={[styles.container,{backgroundColor:isSelected ?'#efefef':'white',} ]}>
      {/* Images */}
      <Image style={styles.image} source={getImage()} />
      <View style={styles.middleContainer}>
        <Text style={styles.type} > {type.type} <Ionicons name='person' size={16}/> 3</Text>
        <Text style={styles.time}>  8:03PM Drop Off</Text>
        

      </View>
      <View style={styles.rightContainer}>
        <Ionicons name='pricetag' size={18} color={'red'} />
        <Text style={styles.price}>est.{type.price}Rs</Text>

      </View>
      
    </Pressable>
  );
};
export default OurServicesRow;
