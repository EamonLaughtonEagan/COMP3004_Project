import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

const appName = 'Counter App'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  TouchableHighlight,
  Image, 
  SafeAreaView
} from 'react-native';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      show: true
    };
  }

  IncrementItem = () => {
    this.setState({counter: this.state.counter + 1});
    console.log("Image tapped");
  }

  render () {
    return (
      
      <View style = {styles.container}>
        <Text style = {styles.countText}> Times Tapped: {this.state.counter} </Text>
        <TouchableHighlight onPress = {this.IncrementItem}>
          <Image 
            fadeDuration = {2000}
            source = {{
              width: 200,
              height: 300,
              uri: "https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"}}
          />
        </TouchableHighlight>
      </View>
    );
  }
}


export default function App() {
  return (
    <HomeScreen />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //flex - grows to fit the dimensions of the screen
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 50,
    padding: 10,
    color: '#FF00FF'
  }
});
