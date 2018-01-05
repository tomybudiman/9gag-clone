import React,{Component} from 'react';
import {View} from 'react-native';
import {TabNavigator} from 'react-navigation';

import UploadButton from './UploadButton';
import Trending from './Trending';
import Fresh from './Fresh';
import Home from './Home';

class Main extends Component {
  static navigationOptions = () => ({
    header : null
  });
  uploadPreview(imageData){
    this.props.navigation.navigate('UploadPreview');
  }
  render(){
    return(
      <View style={{flex : 1}}>
        <Navigator/>
        <UploadButton preview={(imageData) => this.uploadPreview(imageData)}/>
      </View>
    )
  }
}

const Navigator = TabNavigator({
  Home : {screen : Home},
  Trending : {screen : Trending},
  Fresh : {screen : Fresh}
},{
  tabBarOptions : {
    style : {
      backgroundColor : 'rgb(0,0,0)'
    }
  }
});

export default Main;