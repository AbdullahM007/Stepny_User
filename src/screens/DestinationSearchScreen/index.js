import {View, Text,SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow';
import { useNavigation } from '@react-navigation/native'



const HomePlace={
  description:'Home',
  geometry:{location:{lat:32.2479, lng:74.1680}}
}
const WorkPlace={
  description:'Work',
  geometry:{location:{lat:32.5738, lng:74.0789}}
}


const DestinationSearchScreen = (props) => {

  const navigation=useNavigation();

  useEffect(()=>{
    if (originPlace && destinationPlace){
      navigation.navigate('SearchResultScreen',{
        originPlace,
        destinationPlace,
      })
    }
  })
 

const [originPlace,setOriginPlace] = useState();
const [destinationPlace,setDestinationPlace] = useState(null);

  return (
    <SafeAreaView><View style={styles.container}>
      <GooglePlacesAutocomplete 
      placeholder='Where to?'
      textInputProps={{
        placeholderTextColor: '#rgb(255, 255, 255)',
        returnKeyType: "search"
      }}
      onPress={(data, details ) => {
        setOriginPlace({data,details});
      
      }}
      suppressDefaultStyles
      currentLocation={true}
      currentLocationLabel={'Current Location'}
      enablePoweredByContainer={false}
      //for clearing code different styles => styles
      styles={{
        textInput:styles.TextInput,
        container:{...styles.autoCompleteContainer,
          top:10,
        },
        listView:styles.listView,
        separator:styles.separator,
      }}
      fetchDetails
      query={{
        key: 'AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8',
        language: 'en',
      }}
      renderRow={(data) => <PlaceRow data={data}/>}
      renderDescription={(data) => data.description || data.vicinity}
      predefinedPlaces={[HomePlace,WorkPlace]}

    />

      {<GooglePlacesAutocomplete
      placeholder='Where to?'
      textInputProps={{
        placeholderTextColor: '#rgb(255, 255, 255)',
        returnKeyType: "search"
      }}
      onPress={(data, details = null) => {
        setDestinationPlace({data,details});
      
      }}
      suppressDefaultStyles
      enablePoweredByContainer={false}
      // different styles => styles
      styles={{
        textInput:styles.TextInput,
        container:{...styles.autoCompleteContainer,
      top:70},
        listView:{...styles.listView,
        top:60},
        separator:styles.separator,
      }}
      fetchDetails
      query={{
        key: 'AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8',
        language: 'en',
      }}
      renderRow={(data) => <PlaceRow data={data}/>}
    /> }


<View style={styles.circle}/>

<View style={styles.line}/>

<View style={styles.square}/>
    </View>
    </SafeAreaView>
  );
};
export default DestinationSearchScreen ;
