import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import {useRoute, useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {useCompleteOrderMutation} from '../../ReduxTollKit/Stepney/stepneyUser';
import OrderScreen from '../OrderScreen';
const SearchResultScreen = props => {
  const typeState = useState(null);
  const UserId = useSelector(state => state.useData.userId);
console.log(UserId);
  const route = useRoute();
  const navigation = useNavigation();
  const [completeOrder, {data, error}] = useCompleteOrderMutation();
  console.log('DATA', data, error);

  const onSubmit = async () => {
    const [type] = typeState;
    // if (!type) {
    //   return;
    // }
    // Submit to server
    // try {
    //   const input= {
    //     type,
    //     originLatitude
    //   }
    // }
    Alert.alert('', 'Are You Sure Your order is Completed ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'ok',
        onPress: () => { completeOrder({id:UserId})},
        // navigation.navigate('OrderScreen'),
      },
    ]);
  };

  const {originLocation, destinationPlace} = route.params;
  // console.log('origin', originPlace);
  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      {
        <View style={{height: Dimensions.get('window').height }}>
          <RouteMap origin={originLocation} destination={destinationPlace} />
        </View>
      }
      {data && 
      <View style={{position:'absolute', backgroundColor :'white', alignSelf:'center'}} >
<OrderScreen/>
</View>
      }{!data &&
      <View style={{height: 200 /*backgroundColor:'rgb(255, 216, 0)'*/}}>
        <OurServices typeState={typeState} onSubmit={onSubmit} />
      </View>}
    </View>
  );
};
export default SearchResultScreen;
