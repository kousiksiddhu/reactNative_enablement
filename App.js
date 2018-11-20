/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView, TouchableOpacity, Button} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10
  },
  button: {
    backgroundColor: 'red',
    color: 'yellow'
  }
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this);
    this.state = {
      date: new Date(),
      response: 'text'
    };
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  getMoviesFromApiAsync() {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          response: JSON.stringify(responseJson.movies[1].title)
        });
        console.log("in");
        //return JSON.stringify(responseJson.movies[1].title);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>{this.state.date.toLocaleTimeString()}</Text>
          
          <TouchableOpacity style={styles.instructions}>
            <Text onPress={this.getMoviesFromApiAsync}>{this.state.response}</Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>{instructions}</Text>
          {/* <Button
            title="Learn More"
            //color='green'
            accessibilityLabel="Learn more about this purple button"
            style={styles.button}
          /> */}
          
      </View>
    );
  }
}
