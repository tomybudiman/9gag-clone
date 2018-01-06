import React,{Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import axios from 'axios';

// Realm
import Realm from 'realm';
import {LoggedinSchema} from '../database/model';

const styles = StyleSheet.create({
  container : {
    padding : 20
  },
  header : {
    fontSize : 18,
    paddingBottom : 10,
    fontWeight : 'bold'
  },
  loginButton : {
    height : 50,
    width : '100%',
    alignSelf : 'center'
  }
});

class Login extends Component {
  static navigationOptions(){
    return({
      title : 'Register Account',
      headerTitleStyle : {
        color : 'rgb(255,255,255)',
        fontWeight : '100'
      },
      headerStyle : {
        backgroundColor : 'rgb(0,0,0)'
      }
    });
  }
  loginUser(userData){
    axios.post(`${this.props.config.apiUrl}/api/users/login-sm`,userData).then(({data}) => {
      if(data.status){ // Jika berhasil login maka server akan mengirim token
        Realm.open({
          schema : [LoggedinSchema]
        }).then(realm => {
          realm.write(() => {
            realm.create('Loggedin',{
              username : userData.username,
              token : data.token
            });
          });
        }).catch(err => {
          console.warn(err);
        });
        const redirect = NavigationActions.reset({
          index : 0,
          actions : [
            NavigationActions.navigate({routeName : 'Main'})
          ]
        });
        this.props.navigation.dispatch(redirect);
      }else{
        console.warn(data.msg);
        alert('Cannot SignIn! Contact System Administrator!');
      }
    }).catch(err => {
      console.warn(err);
      alert('Cannot SignIn! Contact System Administrator!');
    });
  }
  loginWithGoogle(){
    GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
      GoogleSignin.configure().then(() => {
        GoogleSignin.currentUserAsync().then(check => {
          if(check){
            GoogleSignin.signOut();
          }else{
            GoogleSignin.signIn().then(user => {
              this.loginUser({
                email : user.email,
                username : user.email.match(/^([^@]*)@/)[1],
                name : user.name
              });
            });
          }
        });
      });
    }).catch(errPlayservice => {
      console.warn(`${errPlayservice.code} - ${errPlayservice.message}`);
    });
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>Login With :</Text>
        <GoogleSigninButton
          style={styles.loginButton}
          onPress={() => this.loginWithGoogle()}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    config : state.reducerConfig
  }
}

export default connect(mapStateToProps,null)(Login);
