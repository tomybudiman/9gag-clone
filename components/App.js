import {StackNavigator, TabNavigator} from 'react-navigation';
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {Text} from 'react-native';

import {fetchPhotos} from '../redux/actions/actionPhoto';
import store from '../redux';

// Main Navigator
import UploadPreview from './UploadPreview';
import Signin from './Signin';
import Splash from './Splash';
import Main from './Main';
import ImageDetail from './ImageDetail'

class App extends Component {
  componentWillMount(){
    store.dispatch(fetchPhotos());
  }
  render(){
    return(
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
    )
  }
}

const MainNavigator = StackNavigator({
  Splash : {screen : Splash},
  Main : {
    screen : ({navigation}) => {
      return <Main appNav={navigation}/>
    },
    navigationOptions : () => {
      return{
        header : null
      }
    },
  },
  Signin : {screen : Signin},
  UploadPreview : {screen : UploadPreview},
  ImageDetail : {screen : ImageDetail},
},{
  initialRouteName : 'Splash'
});

export default App;
