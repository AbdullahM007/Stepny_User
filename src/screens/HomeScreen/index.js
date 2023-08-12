import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import HomeMap from '../../components/HomeMap';
import InfoMessage from '../../components/InfoMessage';
import HomeSearch from '../../components/HomeSearch';

const HomeScreen = props => {
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 330}}>
        <HomeMap />
      </View>

      {/* <InfoMessage/> */}
      {/* <Text>index</Text> */}
      <HomeSearch />
    </View>
  );
};
export default HomeScreen;
