import {View, Text, Dimensions,Pressable} from 'react-native';
import React from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import { useRoute } from '@react-navigation/native';




const SearchResultMap = (props) => {
  return (
    <View style={{display:'flex', justifyContent:'space-between'}}>
       <View style={{height:Dimensions.get('window').height-400}}>
      
      <View style={{height: 400,/*backgroundColor:'rgb(255, 216, 0)'*/}}>
       <OurServices/>
    </View>
      </View> 
      <Pressable /*onPress={confirm}*/ style={{
        
        backgroundColor:'black',
        padding:10,
        margin:10,
        alignItems:'center',
       }}>
        <Text style={{color:'white',fontWeight:'bold'}}>Ready to hire a mechanic</Text>
       </Pressable>
      
      </View>
  );
};
export default SearchResultMap;