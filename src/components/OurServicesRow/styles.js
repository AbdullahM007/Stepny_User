import { View } from "react-native";
import { StyleSheet } from "react-native";
const styles= StyleSheet.create({
container:{
    flexDirection:"row",
    // justifyContent:"space-between",
    alignItems:"center",
    padding:20
},
image:{
    height:50,width:50,resizeMode:'contain'
},
middleContainer:{
    flex:1,
    marginHorizontal:10,
},
type:{
    fontSize:20,
    fontWeight:"bold",
    color:'black'

},
time:{
    color:'black'
},
rightContainer:{
    width:100,
    flexDirection:"row",
    justifyContent:"flex-end",
},
price:{
    marginLeft:5,
    fontWeight:"bold",
    fontSize:17,
    color:'black'
},


});
export default styles;