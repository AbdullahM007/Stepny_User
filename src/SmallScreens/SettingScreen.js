import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUpdateUserProfileMutation} from '../ReduxTollKit/Stepney/stepneyUser';
const SettingScreen = () => {
  const [
    updateUserProfile, // This is the mutation trigger
    {data, error, isLoading}, // This is the destructured mutation result
  ] = useUpdateUserProfileMutation();
  // Replace these sample data with the actual user data
  const [userData, setUserData] = useState({
    firstName: 'Abdullah',
    lastName: 'Mushtaq',
    phoneNumber: '123-456-7890',
    address: 'abdullah@uog.com',
    city: '',
    serviceName: '',
    profilePic: require('../assets/Images/mine.jpg'), // Provide a default profile picture
  });

  // State variables to store updated data
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneCountryCode, setPhoneCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(userData.city);
  // const [Service, setService] = useState('');
  const [profilePic, setProfilePic] = useState(userData.profilePic);
  const [value, setValue] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const CountryCodes = [{label: '(+92)', value: '+92'}];
  const Cities = [
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Gujranwala', value: 'Gujranwala'},
    {label: 'Gujrat', value: 'Gujrat'},
  ];

  // const Services = [
  //   { label: 'Mechanical', value: 'Mechanic' },
  //   { label: 'Electrical', value: 'Electrician' },
  //   { label: 'Car Towing', value: 'Car Tower' },
  //   // { label: 'Mechanical & Electrical', value: ['Mechanic', 'Electrician'] },
  //   // { label: 'All Services', value: ['Mechanic', 'Electrician', 'Tower'] },

  // ];
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  // Function to handle profile update
  const handleProfileUpdate = () => {
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      phoneNumber.trim() === '' ||
      address.trim() === '' ||
      city.trim() === ''
      // Service.trim() === ''
    ) {
      // Show error message to the user
      alert('Please fill in all required fields');
      return;
    }

    // Implement your logic to update the user data using API or other methods
    // For this example, we'll just update the state
    setUserData({
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      // serviceName: Service,
      profilePic,
    });
    updateUserProfile({
      first_name: 'Usama544',
      last_name: 'Iqbal',
      contact: '03242233',
      city: 'Gujrat',
      address: 'Staff Gala, Gujrat',
    });
  };
  React.useEffect(() => {
    if (data) {
      alert('Profile updated successfully!');
    } else if (error) {
      Alert.alert('', 'Please Provide Proper Details');
    }
  }, [data, error]);
  console.log('UPDATE', data, error);
  // Function to handle profile picture selection
  const handleChooseProfilePic = () => {
    const options = {
      title: 'Select Profile Picture',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      mediaType: 'photo',
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // User cancelled the picker
      } else if (response.error) {
        // Error occurred while picking the image
      } else {
        // Image selected successfully, set the new profile picture
        setProfilePic({uri: response.uri});
      }
    });
  };

  const handleFirstNameInput = text => {
    // Allow only alphabets (A-Za-z) and remove other characters
    setFirstName(text.replace(/[^A-Za-z]/g, ''));
  };

  // Function to handle last name input
  const handleLastNameInput = text => {
    // Allow only alphabets (A-Za-z) and remove other characters
    setLastName(text.replace(/[^A-Za-z]/g, ''));
  };

  // Function to handle phone number input
  const handlePhoneNumberInput = text => {
    // Allow only numeric digits (0-9) and remove other characters
    const numericText = text.replace(/[^0-9]/g, '');

    // Limit the number of digits to a minimum of 10 and a maximum of 11
    if (numericText.length > 11) {
      setPhoneNumber(numericText.slice(0, 11));
    } else {
      setPhoneNumber(numericText);
    }
  };
  const handleSendOTP = () => {
    // Check if the phone number has exactly 10 digits
    if (phoneNumber.length !== 10) {
      // Show error message to the user
      setVerificationStatus('Please enter a valid 10-11 digit phone number');
      return;
    }

    // Implement logic to send OTP to the user's phone number
    // For example, you can use an API to send the OTP via SMS

    // For this example, we'll simulate OTP sent by setting otpSent to true
    setOtpSent(true);
    setVerificationStatus('OTP sent. Please check your phone for the OTP.');
  };

  // Function to handle OTP verification
  const handleVerifyOTP = () => {
    // Implement logic to verify the entered OTP
    // For this example, we'll assume the correct OTP is '123456'

    if (otp === '123456') {
      // OTP is correct, proceed with profile update
      handleProfileUpdate();
      setOtpVerified(true);
      setVerificationStatus('OTP verified. Phone Number updated successfully!');
    } else {
      // OTP is incorrect, show error message
      setOtpVerified(false);
      setVerificationStatus('Incorrect OTP. Please try again.');
    }
  };

  const [ImageUrl, setImageUrl] = React.useState('');
  const handlePickImage = React.useCallback(async () => {
    const result = await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    setImageUrl(result.assets?.[0]?.base64 || '');
  }, [ImageUrl]);
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity
        style={{marginBottom: 20}}
        onPress={() => handlePickImage()}>
        {ImageUrl ? (
          <Image
            source={{
              uri: `data:image/png;base64,${ImageUrl}`,
            }}
            // source={profilePic}
            style={styles.profilePic}
          />
        ) : (
          <FontAwesome name="user-circle" size={100} color="red" />
        )}
      </TouchableOpacity>

      {/* First Name */}
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={handleFirstNameInput}
        placeholder="First Name"
        placeholderTextColor="black"
      />

      {/* Last Name */}
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={handleLastNameInput}
        placeholder="Last Name"
        placeholderTextColor="black"
      />
      <View style={styles.phoneInputContainer}>
        {/* Phone Number */}
        <Dropdown
          style={styles.countryCode}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={CountryCodes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Country code"
          placeholderTextColor="black"
          value={phoneCountryCode}
          onChange={item => {
            setPhoneCountryCode(item.value);
          }}
          renderItem={renderItem}
        />
        <View style={styles.phoneVerifyContainer}>
          <TextInput
            style={styles.phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={'black'}
            value={phoneNumber}
            onChangeText={handlePhoneNumberInput}
            keyboardType="phone-pad"
          />
          {/* Verify Button for sending OTP */}
          {/* <TouchableOpacity style={styles.verifyButton} onPress={handleSendOTP}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* OTP Input */}
      {otpSent && !otpVerified && (
        <View style={styles.otpContainer}>
          <View style={styles.otpInputContainer}>
            <TextInput
              style={styles.otpInput}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              placeholderTextColor="black"
            />
            {/* Verify OTP Button */}
            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={handleVerifyOTP}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Verification Status */}
      <Text
        style={[
          styles.verificationStatus,
          otpVerified ? styles.verificationSuccess : null,
        ]}>
        {verificationStatus}
      </Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        // keyboardType="address-address"
        placeholderTextColor="black" // Set placeholder text color to black
      />

      {/* City */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={Cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select City"
        searchPlaceholder="Search..."
        placeholderTextColor="black"
        value={city}
        onChange={item => {
          setCity(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        renderItem={renderItem}
      />

      {/* Service Name */}
      {/* <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        data={Services}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Service you can provide"
        searchPlaceholder="Search..."
        placeholderTextColor="black"
        value={Service}
        onChange={item => {
          setService(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      /> */}

      {/* Update Button */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => handleProfileUpdate()}>
        {isLoading == true ? (
          <ActivityIndicator size="small" color={'green'} />
        ) : (
          <Text style={styles.buttonText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#BDBDBD',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  updateButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    marginBottom: 20,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  phoneInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  countryCode: {
    width: '25%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 1,
  },
  phoneNumber: {
    width: '70%',
    height: 40,
    borderColor: '#ccc',
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 5,
  },
  phoneVerifyContainer: {
    width: '70%',
    flexDirection: 'row',
    borderColor: '#ccc',
    // borderWidth: 1,
    // marginBottom: 10,
    borderRadius: 5,
    // paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifyButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpInput: {
    width: '100%',
    height: 40,
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    // marginBottom: 15,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  // otpContainer:{width:'100%'},
  otpInputContainer: {
    width: '77.5%',
    flexDirection: 'row',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifyOtpButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 8,
  },
  verificationStatus: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  verificationSuccess: {
    color: 'green', // Change the color to green for successful verification
  },
});

export default SettingScreen;
