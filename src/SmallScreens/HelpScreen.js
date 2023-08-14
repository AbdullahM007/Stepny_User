import React, {useEffect, useRef, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import {useIsFocused} from '@react-navigation/native'; // Import useIsFocused hook

const HelpScreen = () => {
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

  return (
    <View style={styles.container}>
      {/* Provide the relative path of the local image */}
      <Image source={require('../assets/Images/2.jpg')} style={styles.image} />
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
    backgroundColor: 'black',
  },
  image: {
    width: 500,
    height: 200,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HelpScreen;
