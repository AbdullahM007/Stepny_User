import React from 'react'
import { View,Text, Pressable } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import styles from './styles';
import {useNavigation} from '@react-navigation/native'

const HomeSearch=(props)=> {
    const navigation= useNavigation();
    const gotoSearch = () =>{
        navigation.navigate('DestinationSearchScreen')
    }
  return (
    <View style={styles.container}>
        {/* Input Box*/}
        <Pressable onPress={ gotoSearch} style={styles.inputBox}>
            <Text style={styles.inputText}>Hire a mechanic?</Text>
            <View style={styles.timeContainer}>
                <AntDesign name={"clockcircle"} size={16} color={'black'}/>
                <Text>Now</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16}/>
            </View>
        </Pressable >
        {/*Previous Destination */}
        <View style={styles.row}>
            <View style={styles.iconContainer}>
            <AntDesign name={"clockcircle"} size={30} color={'black'}/>
            </View>
            <Text style={styles.DestinationText}>Gujranwala</Text>

        </View>
        {/* Home Destination*/}
        <View style={styles.row}>
            <View style={[styles.iconContainer, {backgroundColor:"rgb(255, 0, 0)"}]}>
            <MaterialCommunityIcons name={"home-circle-outline"} size={30} color={'black'}/>
            </View>
            <Text style={styles.DestinationText}>Home</Text>

        </View>
    </View>
  );
};
export default HomeSearch; 
