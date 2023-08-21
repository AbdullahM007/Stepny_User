import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import {useRoute, useNavigation} from '@react-navigation/native';

import {useCompleteOrderMutation} from '../../ReduxTollKit/Stepney/stepneyUser';
const SearchResultScreen = props => {
  const typeState = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [completeOrder, {data, error}] = useCompleteOrderMutation();
  console.log('DATA', data, error);
  const onSubmit = async () => {
    const [type] = typeState;
    if (!type) {
      return;
    }
    // Submit to server
    // try {
    //   const input= {
    //     type,
    //     originLatitude
    //   }
    // }
    Alert.alert('Hurray', 'Your order is submitted', [
      {
        text: 'Track Order',
        onPress: () => completeOrder,
        // navigation.navigate('OrderScreen'),
      },
    ]);
  };

  const {originLocation, destinationPlace} = route.params;
  // console.log('origin', originPlace);
  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      {
        <View style={{height: Dimensions.get('window').height - 400}}>
          <RouteMap origin={originLocation} destination={destinationPlace} />
        </View>
      }
      <View style={{height: 200 /*backgroundColor:'rgb(255, 216, 0)'*/}}>
        <OurServices typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};
export default SearchResultScreen;
