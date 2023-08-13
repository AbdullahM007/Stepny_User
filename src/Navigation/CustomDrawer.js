import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const handleLogout = () => {
    console.warn('Log Out');
  };
  const gotoSetting = () => {
    navigation.navigate('SettingScreen');
  };
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#a52a2a'}}>
      <View style={{flex: 1, backgroundColor: '#a52a2a'}}>
        {/* user Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 10,
            paddingBottom: 30,
          }}>
          <View
            style={{
              backgroundColor: '#EF5350',
              width: 60,
              height: 60,
              borderRadius: 35,
              marginRight: 12,
            }}
          />
          <View>
            <Text style={{color: 'white', fontSize: 24}}>Abdullah Mushtaq</Text>
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
          borderTopWidth: 1,
          borderTopColor: '#919191',
          borderBottomWidth: 1,
          borderBottomColor: '#919191',
          paddingVertical: 10,
        }}>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: '#EF5350',
            paddingVertical: 10,
            marginTop: 390,
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
