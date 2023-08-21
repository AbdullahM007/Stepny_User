import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useGetUserProfileQuery} from '../ReduxTollKit/Stepney/stepneyUser';
import {useNavigation} from '@react-navigation/native';
import {removeStorageData} from '../Async/AsyncStorage';
import {useDispatch} from 'react-redux';
import {setToken} from '../ReduxTollKit/Slices/slice';
const CustomDrawer = props => {
  const {data, error, isLoading} = useGetUserProfileQuery(null);
  // console.log('User profile', data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gotoSetting = () => {
    navigation.navigate('SettingScreen');
  };
  const [userProfile, setUserProfile] = React.useState();

  React.useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data]);
  const handleLogout = async () => {
    console.log('DON');

    await removeStorageData('userToken');
    dispatch(setToken(false));
  };
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: 'black'}}>
      <View style={{flex: 1, backgroundColor: 'black', position: 'relative'}}>
        {/* user Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 10,
            paddingBottom: 30,
          }}>
          {/* <View
            style={{
              backgroundColor: '#EF5350',
              width: 60,
              height: 60,
              borderRadius: 35,
              marginRight: 12,
            }}
          /> */}
          {userProfile && (
            <Image
              style={{width: 50, height: 50, borderRadius: 300}}
              source={{uri: userProfile?.profile_picture}}
            />
          )}
          <View>
            <Text style={{color: 'white', fontSize: 24}}>
              {userProfile?.first_name + userProfile?.last_name}
            </Text>
            <Text style={{color: 'lightgrey'}}>5.0 *</Text>
          </View>
        </View>

        {/* messages Row  */}
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: '#919191',
            borderBottomColor: '#919191',
            paddingVertical: 10,
            marginVertical: 10,
          }}>
          {/* <Pressable onPress={gotoSetting} >
            <Text style={{color:'#dddddd',paddingVertical:5,paddingLeft:17}}>Setting</Text>
            </Pressable>
            </View>
            <View style={{
             borderBottomWidth:1,
             borderBottomColor:'#919191',
             }}> */}

          {/*do more with account */}
          {/* <Pressable onPress={()=>{console.warn('Do More With Account')}} >
            <Text style={{color:'#dddddd',paddingVertical:5,paddingLeft:17,paddingBottom:20}}>Do More With Account</Text>
             
          </Pressable> */}
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </View>
      <View
        style={{
          alignSelf: 'baseline',
          bottom: 0,
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: '#919191',
          borderBottomWidth: 1,
          borderBottomColor: '#919191',
        }}>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: '#EF5350',
            paddingVertical: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
            Log Out
          </Text>
        </Pressable>
      </View>
      {/* <DrawerItemList {...props}/> */}
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;
