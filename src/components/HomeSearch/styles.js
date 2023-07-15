import { StyleSheet } from "react-native";
const styles= StyleSheet.create({
    container:{
        // backgroundColor:"rgb(255, 216, 0)"

    },
    /* Input Box*/
    inputBox:{
        backgroundColor:"rgb(255, 0, 0)",
        margin:10,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    inputText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        borderRadius:50,
    },
    timeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:90,
        padding:10,
        backgroundColor:"rgb(255, 76, 0)",
        borderRadius:50,
    },

     /*Previous Destination */

     row:{
        flexDirection:"row",
        padding:15,
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"black"
     },
     iconContainer:{
        // backgroundColor:"Red",
        padding:1,
        borderRadius:25
     },
     DestinationText:{
        marginLeft:10,
        fontSize:18,
        fontWeight:'bold',
        color:"black"
     }


});
export default styles;