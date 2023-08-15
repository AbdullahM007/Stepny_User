import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native'; // Import useIsFocused hook
import {useUserHelpSupportMutation} from '../ReduxTollKit/Stepney/stepney';
const HelpScreen = () => {
  const [userHelpSupport, {data, error, isLoading}] =
    useUserHelpSupportMutation();
  const isFocused = useIsFocused(); // Get the focused state of the component
  const bounceValue = useRef(new Animated.Value(-100)).current;

  const startBounceAnimation = useCallback(() => {
    // Start the animation
    Animated.timing(bounceValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [bounceValue]);

  useEffect(() => {
    if (isFocused) {
      // Reset the animation value when the component is focused
      bounceValue.setValue(-100);
      startBounceAnimation();
    }
  }, [isFocused, bounceValue, startBounceAnimation]);

  // Interpolate the animated value to apply translation on the X-axis
  const animatedStyle = {
    transform: [{translateX: bounceValue}],
  };
  const [helcenter, setHelcenter] = React.useState('');
  const handleSendMessage = () => {
    setHelcenter('');
    userHelpSupport({message: helcenter});
  };
  console.log('data', data, error);
  useEffect(() => {
    if (data) {
      Alert.alert('', 'Your Message has been sent ');
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {/* Provide the relative path of the local image */}

      <Image source={require('../assets/Images/2.jpg')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000" // Set the placeholder text color to black
        secureTextEntry={true}
        value={helcenter}
        onChangeText={text => setHelcenter(text)}
      />
      <TouchableOpacity
        onPress={() => handleSendMessage()}
        style={styles.signupButton}>
        <Text>Send</Text>
      </TouchableOpacity>
      <Animated.Text style={[styles.text, animatedStyle]}>
        To get in touch with the Stepney Customer Support Team {'\n\n'}
        Dial 111 300 300 {'\n\n'}
        OR {'\n\n'}
        Email us at customercare@Stepney.com.pk {'\n\n'}
        OR {'\n\n'}
        You can get the nearest location of Stepney offices.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgray',
  },
  image: {
    width: 500,
    height: 200,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000', // Set the text color to black
  },
  signupButton: {
    width: '90%',
    backgroundColor: '#34C759',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default HelpScreen;
