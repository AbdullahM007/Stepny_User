import {View, Text,Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import OurServicesRow from '../OurServicesRow';
import typesData from '../../assets/data/types';
import {useNavigation} from '@react-navigation/native'



const OurServices = ({typeState , onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;
  const confirm =()=>{ /*navigation.navigate('SearchResultMap')*/console.warn('confirm');}
  return (
    <View>
        {typesData.map(type => 
        <OurServicesRow 
        key={type.id} 
        type={type}
        isSelected={type.type===selectedType}
        onPress={() => setSelectedType(type.type) }
        />)}
        <Pressable onPress={onSubmit} style={{
        
        backgroundColor:'black',
        padding:10,
        margin:10,
        alignItems:'center',
       }}>
        <Text style={{color:'white',fontWeight:'bold'}}>Confirm Service</Text>
       </Pressable>
    </View>
  );
};
export default OurServices ;