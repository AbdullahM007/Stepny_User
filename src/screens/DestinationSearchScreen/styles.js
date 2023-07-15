
import { StyleSheet } from "react-native";
const styles= StyleSheet.create({
container:{
    padding:10,
    height:'100%',
    // backgroundColor:'rgb(255, 216, 0)'
    color:'#rgb(255, 255, 255)'
    
},
TextInput:{
    height:50,
    backgroundColor:"rgb(255, 0, 0)",
    marginVertical:5,
    marginLeft:40,
},
separator:{
    backgroundColor:'black',
    height:1
  },
  listView:{
    // backgroundColor:'red',
    position:'absolute',
    top:120,
  },
  autoCompleteContainer:{
    top:10,
    left:10,
    right:10,
    position:'absolute',
  },
row:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:5,
},
iconContainer:{
    marginRight:15,
    backgroundColor:'#a2a2a2',
    padding:10,
    borderRadius:50,
},
locationText:{color:'black'},
circle:{
    width:5,
    height:5,
    backgroundColor:'black',
    top:38,
    left:25,
    position:"absolute" ,
    borderRadius:5

  },
  line:{
    width:2,
    height:53,
    backgroundColor:'red',
    top:45,
    left:26.5,
    position:"absolute" 

  },
  square:{
    width:5,
    height:5,
    backgroundColor:'black',
    top:100,
    left:25,
    position:"absolute" 


  },

});
export default styles;