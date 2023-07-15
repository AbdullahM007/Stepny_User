import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import { useRoute } from '@react-navigation/native';




const SearchResultScreen = (props) => {
  const route = useRoute();

  console.log(route.params);
  const{originPlace, destinationPlace} =route.params
  return (
    <View style={{display:'flex', justifyContent:'space-between'}}>
      { <View style={{height:Dimensions.get('window').height-400}}>
      <RouteMap origin={originPlace} destination={destinationPlace}/>
      </View> }
     <View style={{height: 400,/*backgroundColor:'rgb(255, 216, 0)'*/}}>
       <OurServices/>
    </View>
    </View>
  );
};
export default SearchResultScreen;