import {StackNavigator} from 'react-navigation';
import React,{Component} from 'react';
import {Provider} from 'react-redux';

import {fetchPhotos} from '../redux/actions/actionPhoto';
import UploadPreview from './UploadPreview';
import Signin from './Signin';
import Splash from './Splash';
import Main from './Main';
import store from '../redux';

class App extends Component {
  componentWillMount(){
    store.dispatch(fetchPhotos());
  }
  render(){
    return(
      <Provider store={store}>
        <Navigator/>
      </Provider>
    )
  }
}

const Navigator = StackNavigator({
  Splash : {screen : Splash},
  Main : {screen : Main},
  Signin : {screen : Signin},
  UploadPreview : {screen : UploadPreview},
},{
  initialRouteName : 'Splash'
});

export default App;
