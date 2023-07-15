import React from 'react';
import { StyleSheet, View,Text,Image, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
    title:{color:'black' ,fontSize: 32,fontWeight:'bold',marginTop:40},
    // image: {width:400,height:400},
    text:{color:'red',fontSize:18,fontWeight:'bold',marginTop:20},
    
  });

const slides = [
  {
    key: 1,
    title: 'Get your automobile fixed at lowest rate',
    text: 'Select mechanical services you want',
    image: require('../../assets/Images/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Get in touch with your mechanic',
    text: 'Chat with the mechanic on the go',
    image: require('../../assets/Images/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Car Diagnostic',
    text: 'Get your car diagnose in our mechanics garage',
    image: require('../../assets/Images/3.jpg'),
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
    constructor(props){
        super(props)
  this.state = {
    showRealApp: false
  };
}
  _renderItem = ({ item }) => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        
        <Image style={{width:300,
            height:300,
            borderRadius:300
            }} source={item.image} />

        
        <Text style={styles.title}>{item.title}</Text>
        
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider
      activeDotStyle={{marginleft:-5,width:40,backgroundColor:'rgb(255, 0, 0)'}}
      dotStyle={{marginLeft:-5,width:40,backgroundColor:'black'}}
      renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
    }
  }
}