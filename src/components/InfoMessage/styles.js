import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        backgroundColor:'rgb(0, 135, 255)',
        padding:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,

    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        // color:'black',
        marginBottom:30,

    },
    text:{
        fontSize:15,
        // color:'black',
        marginBottom:10,
    },
    learnMore:{
        color:'red',
        fontWeight:"bold",
        
    },

});
export default styles;