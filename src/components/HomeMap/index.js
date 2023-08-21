import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {
  useSetDeviceTokenMutation,
  useUpdateLocationMutation,
  useGetAllFeedBackQuery,
  useGetAllMechanicsQuery,
  usePlaceOrderMutation,
} from '../../ReduxTollKit/Stepney/stepneyUser';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cars from '../../assets/data/cars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLAtitude,
  setLocation,
  setLocationaccess,
  setLongitude,
} from '../../ReduxTollKit/Slices/slice';
import Geolocation from '@react-native-community/geolocation';
export const HomeMap = props => {
  const [
    placeOrder,
    {data: placeOrderData, isLoading: orderLoading, error: orderERROR},
  ] = usePlaceOrderMutation();
  console.log('placeOrderData', placeOrderData, 'orderERROR', orderERROR);

  const dispatch = useDispatch();
  const [granted, setGranted] = useState(false);
  const latitude = useSelector(state => state.useData.lat);
  const [notificationToken, setNotificationToken] = useState('');
  const location = useSelector(state => state.useData.location);
  const longitude = useSelector(state => state.useData.lon);
  const UserId = useSelector(state => state.useData.userId);
  const [setDeviceToken, {data: DeviceToken, error: TokenError}] =
    useSetDeviceTokenMutation();
  console.log('userId: ', UserId);
  useEffect(() => {
    if (!notificationToken) return;
    SendNotificationstoServer();
  }, [notificationToken]);
  const SendNotificationstoServer = React.useCallback(() => {
    messaging()
      .getToken()
      .then(deviceToken =>
        setDeviceToken({
          id: UserId,
          device_token: deviceToken,
        }),
      );
  }, [notificationToken]);
  // useEffect(() => {
  //   pushNoti();
  // }, []);

  async function handleListners() {
    await PushNotification.configure({
      onRegister: function (token) {
        setNotificationToken(token?.token);
      },
      onNotification: function (notification: any) {
        const idd = notification.data;
        // dispatch(setShowRedIocn(true));
        if (notification?.data?.type === 'message') {
          // dispatch(setShowMessageRedIcon(true));
        }
        try {
          if (notification?.userInteraction) {
            if (notification?.data?.type === 'message') {
              navigation.navigate('ChatList');
            } else {
              navigation.navigate('IncomingNotifications');
            }
            // navigation.navigate("IncomingNotifications")
          }
          // else if ()
        } catch (err) {
          console.log('error while handling action', err);
        }
      },
    });

    // for foreground msg listner
    messaging().onMessage(async (remoteMessage: any) => {
      // console.log('Notification push arrived', remoteMessage);
      PushNotification.localNotification({
        channelId: 'custom_sound',
      });
    });
    // app opened from background state
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      // console.log('Notification push opened app', remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Notification push setBackgroun', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
        }
      });
  }
  // const pushNoti = async () => {
  //   // const authStatus = await messaging().requestPermission();
  //   // const enabled =
  //   //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   const status = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
  //   );
  //   if (status === 'granted') {
  //     handleListners();
  //     console.log(status);
  //   }
  // };
  messaging().onMessage(async remoteMessage => {
    // console.log('Notification push arrived', remoteMessage);
    PushNotification.localNotification({
      channelId: 'custom_sound',
    });
  });
  const {
    data: AllMechanics,
    error: mechanicError,
    isLoading: MechanicLoading,
  } = useGetAllMechanicsQuery();
  const [userId, setuserId] = useState();
  const {
    data: allFeedBack,
    error: feedBackError,
    isLoading: feedBackLoading,
  } = useGetAllFeedBackQuery({id: userId});
  const [originLocation, setUserLocation] = useState({lat: 0, lon: 0});
  console.log('DeviceToken', DeviceToken, JSON.stringify(TokenError));
  const navigation = useNavigation();
  const handleHireButtonPress = () => {
    // Navigate to the desired screen here
    navigation.navigate('DestinationSearchScreen'); // Replace 'DestinationScreen' with the name of the screen you want to navigate to
  };
  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          'PermissionsAndroid.RESULTS.GRANTED',
          PermissionsAndroid.RESULTS.GRANTED,
        );
        handleListners();
        setGranted(true);
      } else {
        setGranted(false);
        dispatch(setLocationaccess(false));
        Alert.alert('Location permission denied');
      }
    } catch (err) {
      setGranted(false);
      dispatch(setLocationaccess(false));
      // console.warn(err);
      console.log('Erros', err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // getLocation();
      requestLocationPermission();
    }, []),
  );
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('DATA', position);
        // dispatch(
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          );
        // );
      },
      error => {
        // See error code charts below.

        console.error('dfdgdg', error.code, error.message);
        dispatch(setLocationaccess(false));
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  }
  useEffect(() => {
    if (granted) {
      getLocation();
    }
  }, [granted]);
  const getImage = type => {
    if (type === 'Mechanic') {
      return require('../../assets/Images/Mechanic-car.png');
    }
    if (type === 'Electrician') {
      return require('../../assets/Images/electric-car.png');
    }

    return require('../../assets/Images/tow-truck.png');
  };
  const renderRatingStars = rating => {
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <MaterialCommunityIcons key={i} name="star" size={20} color="gold" />,
      );
    }

    if (halfStars > 0) {
      stars.push(
        <MaterialCommunityIcons
          key="half"
          name="star-half"
          size={20}
          color="gold"
        />,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          size={20}
          color="gold"
        />,
      );
    }

    return stars;
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerPress = marker => {
    setSelectedMarker(marker);
  };
  const handleNext = item => {
    setuserId(item);
  };
  const [destinationPlace, setdestinationPlace] = useState();

  useEffect(() => {
    if (selectedMarker) {
      setdestinationPlace(selectedMarker);
    }
  }, [selectedMarker]);
  const handleTrackeUSer = () => {
    navigation.navigate('SearchResultScreen', {
      originLocation,
      destinationPlace,
    });
  };
  console.log('originLocation', originLocation);
  React.useEffect(() => {
    if (allFeedBack) {
      navigation.navigate('MechanicReviewScreen', {mechaData: allFeedBack});
    }
  }, [allFeedBack]);

  const handleHire = item => {
    placeOrder({mechanic_id: item});
  };
  return (
    <View>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          // showsUserLocation={true}
          style={{width: '100%', height: '100%'}}
          region={{
            // Current Display Setting on screen
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta: 2.015,
            longitudeDelta: 2.0121,
          }}>
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.lon,
            }}
          />

          {AllMechanics?.map(item => (
            <Marker
              key={item.id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              onPress={() => handleMarkerPress(item)} // Add onPress event
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="center"
                source={require('../../assets/Images/electric-car.png')}
              />
            </Marker>
          ))}
        </MapView>
      )}
      {/* Add the popup to display marker details */}
      {selectedMarker && (
        <View style={styles.markerPopup}>
          <View style={styles.profileHeader}>
            {/* <Image source={selectedMarker.image} style={styles.profileImage} /> */}
            <FontAwesome name="user-circle" size={100} color="blue" />

            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, styles.selectedMarkerName]}>
                Name: {selectedMarker?.Name}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  Rating:{selectedMarker?.rating}
                </Text>

                {/* {renderRatingStars(selectedMarker.rating)} */}
              </View>
              <Text style={styles.ServiceType}>
                My Services: {selectedMarker?.specialization}
              </Text>
              <Text style={styles.ServiceType}>
                Contact: {selectedMarker?.contact}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleNext(selectedMarker?.id)}>
                <Text
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 2,
                    marginBottom: 10,
                  }}>
                  <Ionicons name="information-circle" size={18} color="blue" />
                  Review
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DestinationSearchScreen')}>
                <Text
                  style={{
                    backgroundColor:
                      selectedMarker?.status === true ? 'green' : 'red',
                    borderRadius: 10,
                    color: selectedMarker?.statue === true ? 'white' : 'white',
                    padding: 6,
                  }}>
                  {selectedMarker?.status === false
                    ? 'Unavailable'
                    : 'Available'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Pressable
            style={styles.hireButton}
            onPress={
              () => handleHire(selectedMarker?.id)
              // handleTrackeUSer()
            }>
            <Text style={styles.hireButtonText}>Hire?</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  markerPopup: {
    position: 'absolute',
    bottom: 92,
    left: 10,
    right: 10,
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  ServiceType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  profileRating: {
    fontSize: 16,
    color: 'black',
  },
  hireButton: {
    // backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  hireButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeMap;
