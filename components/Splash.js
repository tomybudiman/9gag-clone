import React,{Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Image, View, StyleSheet} from 'react-native';

class Splash extends Component {
  static navigationOptions = () => ({
    header : null
  });
  componentDidMount(){
    const redirect = NavigationActions.reset({
      index : 0,
      actions : [
        NavigationActions.navigate({routeName : 'Main'})
      ]
    });
    setTimeout(() => {
      this.props.navigation.dispatch(redirect);
    },500);
  }
  render(){
    return(
      <View style={styles.container}>
        <Image source={require('../media/9gag-icon.png')} resizeMode='contain' style={styles.image}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  image : {
    width : '25%'
  }
});

export default Splash;
