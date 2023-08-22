import { View, Text, Dimensions, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HomeMap from '../../components/HomeMap';
import OurServices from '../../components/OurServices';
import RouteMap from '../../components/RouteMap';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useCompleteOrderMutation, useFeedBackMutation } from '../../ReduxTollKit/Stepney/stepneyUser';
import OrderScreen from '../OrderScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
   
    feedback({
      mechanic:3,
      rating: rating,
      service_details:description,
      charges:charges,
    })
    const orderData = {
      userId: UserId,
      rating: rating,
      description: description,
      charges: charges,
    };

    completeOrder(orderData);
    setShowSecondPopup(false);
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

      <TouchableOpacity
        style={[styles.sosButton, { backgroundColor: 'red' }]}
        onPress={() => {
          // Handle your SoS logic here
        }}
      >
        <View style={styles.sosButtonContent}>
          <Text style={styles.sosButtonText}>SoS</Text>
          <FontAwesome name="exclamation-circle" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          SoS: Press only in case of Emergency such as Police case e.t.c .
        </Text>
      </View>


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
              width: '80%', 
            }}
          >
            {/* Rating */}
            <Text style={{ marginBottom: 5 }}>Rating:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter rating (0-10)"
              value={rating}
              onChangeText={(text) => {setRating(text)
                
              }
            }
              keyboardType="numeric" 
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
               
              }}
              keyboardType="numeric"
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

  sosButton: {
    position: 'relative',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 50,
    paddingHorizontal:20,
    marginTop:70,
    // right: 15,
  },
  sosButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:25,
    marginRight:5
  },
  sosButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionsContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  instructionsText: {
    textAlign: 'center',
    color: 'red',
    fontStyle: 'italic',
  },
});

export default SearchResultScreen;