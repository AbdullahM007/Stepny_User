import React, { useEffect, useRef, useCallback, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native'; 
import { useUserHelpSupportMutation } from '../ReduxTollKit/Stepney/stepney';

const HelpScreen = () => {
  const MAX_CHARACTER_COUNT = 150;
  
  const [characterCount, setCharacterCount] = useState(MAX_CHARACTER_COUNT);
  const [userHelpSupport, {data, error, isLoading}] =
    useUserHelpSupportMutation();
  const isFocused = useIsFocused(); 
  const bounceValue = useRef(new Animated.Value(-100)).current;

  const startBounceAnimation = useCallback(() => {
    Animated.timing(bounceValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [bounceValue]);

  useEffect(() => {
    if (isFocused) {
      bounceValue.setValue(-100);
      startBounceAnimation();
    }
  }, [isFocused, bounceValue, startBounceAnimation]);

  const animatedStyle = {
    transform: [{translateX: bounceValue}],
  };

  const [helcenter, setHelcenter] = React.useState('');

  const handleSendMessage = () => {
    if (characterCount >= 0) {
      setHelcenter('');
      userHelpSupport({ message: helcenter });
    } else {
      Alert.alert('', 'You have exceeded the character limit (150 characters)');
    }
  };

  const handleTextChange = (text) => {
    setHelcenter(text);
    const remainingCharacters = MAX_CHARACTER_COUNT - text.length;
    setCharacterCount(remainingCharacters);
  };

  useEffect(() => {
    if (data) {
      Alert.alert('', 'Your Message has been sent ');
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Images/2.jpg')} style={styles.image} />

      <Text style={styles.messageText}>
        Your Message to Our Support
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Type your message here..."
        placeholderTextColor="#000"
        multiline={true}
        value={helcenter}
        onChangeText={handleTextChange}
        maxLength={MAX_CHARACTER_COUNT} 
        textAlignVertical="top"
        underlineColorAndroid="transparent"
      />
      
      <Text style={styles.characterCountText}>
        {characterCount >= 0 ? `${characterCount} characters left` : 'Character limit exceeded'}
      </Text>

      <TouchableOpacity onPress={() => handleSendMessage()} style={styles.signupButton}>
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
    height: 80,
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
  characterCountText: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    color: '#777',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'center',
    marginLeft: 20,
    color:'red'
  },
});

export default HelpScreen;
