import { View, Text, Dimensions, Alert, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useCompleteOrderMutation ,useFeedBackMutation} from '../../ReduxTollKit/Stepney/stepneyUser';
import OrderScreen from '../OrderScreen';

const SearchResultScreen = (props) => {
  const typeState = useState(null);
  const UserId = useSelector((state) => state.useData.userId);
  console.log(UserId);
  const route = useRoute();
  const navigation = useNavigation();
  const [completeOrder, { data, error }] = useCompleteOrderMutation();
  console.log('DATA', data, error);
const [feedback,{data:feedBackData,error:feedbackError}]=useFeedBackMutation()
console.log("feedBackData",feedBackData,feedbackError);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [charges, setCharges] = useState('');
React.useEffect(() => {
  if(data){
    setShowSecondPopup(true);
  }
}, [data])
React.useEffect(()=>{
  if(feedBackData){
navigation.navigate('Home')
  }
},[feedBackData])
  const onSubmitFirstPopup = () => {
    Alert.alert('', 'Are You Sure Your order is Completed ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'ok',
        onPress: () => {
          completeOrder({id:UserId})
        },
      },
    ]);
  };

  const onSubmitSecondPopup = () => {
    // Perform the actual order completion logic and submit to the server
    // Use the rating, description, and charges values in this function
    feedback({
      mechanic:3,
      rating: rating,
      service_details:description,
      charges:charges,
    })
    // For example:
    const orderData = {
      userId: UserId,
      rating: rating,
      description: description,
      charges: charges,
    };

    completeOrder(orderData);
    setShowSecondPopup(false);
    // Additional logic or navigation can be added here
  };

  const { originLocation, destinationPlace } = route.params;
console.log(charges);
  return (
    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
      {
        <View style={{height: Dimensions.get('window').height - 400}}>
          <RouteMap origin={originLocation} destination={destinationPlace} />
        </View>
      }
      <OurServices typeState={typeState} onSubmit={onSubmitFirstPopup} />

      {showSecondPopup && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%', // Adjust the width as needed
            }}
          >
            {/* Rating */}
            <Text style={{ marginBottom: 5 }}>Rating:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter rating (0-10)"
              value={rating}
              onChangeText={(text) => {setRating(text)
                // Ensure only numbers between 0 and 10 are entered
              //   const numericValue = parseFloat(text);
              //   if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
              //     setRating(numericValue.toString());
              //   }
              }
            }
              keyboardType="numeric" // This restricts input to numbers
            />

            {/* Description */}
            <Text style={{ marginBottom: 5 }}>Description:</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Enter description"
              multiline
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {/* Charges */}
            <Text style={{ marginBottom: 5 }}>Charges:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter charges"
              value={charges}
              onChangeText={(text) => {setCharges(text)
                // Ensure only numeric values are entered
                // const numericValue = parseFloat(text);
                // if (!isNaN(numericValue)) {
                //   setCharges(numericValue.toString());
                // }
              }}
              keyboardType="numeric" // This restricts input to numbers
            />

            {/* Submit */}
            <TouchableOpacity style={styles.submitButton} onPress={onSubmitSecondPopup}>
              <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
});

export default SearchResultScreen;