import {View, Text,Pressable} from 'react-native';
import React from 'react';
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';




const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
        <View style={{backgroundColor:'black'}} >

          {/* user Row */}
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            paddingTop:20,
            paddingLeft:10,
            paddingBottom:10

        }}>
            <View style={{
              backgroundColor:'#eeeeee',
              width:50,
              height:50,
              borderRadius:25,
              marginRight:17,
            }}/>
            <View>
              <Text style={{color:'white', fontSize:24}}>Abdullah Mushtaq</Text>
              <Text style={{color:'lightgrey'}}>5.0 *</Text>
            </View>
          </View>


          {/* messages Row  */}
          <View style={{borderTopWidth:1,
             borderBottomWidth:1,
             borderTopColor:'#919191',
             borderBottomColor:'#919191',
             paddingVertical:10,
             marginVertical:10,
             }}>

          <Pressable onPress={()=>{console.warn('Messages')}} >
            <Text style={{color:'#dddddd',paddingVertical:5,paddingLeft:17}}>Messages</Text>
            </Pressable>
            </View>


          {/*do more with account */}
          <Pressable onPress={()=>{console.warn('Do More With Account')}} >
            <Text style={{color:'#dddddd',paddingVertical:5,paddingLeft:17}}>Do More With Account</Text>

          </Pressable>

          <Pressable onPress={()=>{console.warn('Make Money')}} >
            <Text style={{color:'white',paddingVertical:10,paddingLeft:17 }}>Make money by Servicing</Text>

          </Pressable>
          
        </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  );
};
export default CustomDrawer ;