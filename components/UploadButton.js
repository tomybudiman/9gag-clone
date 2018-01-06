import React,{Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';

import {setUploadPreview} from '../redux/actions/actionPhoto';

class UploadButton extends Component {
  selectFile(){
    if(this.props.config.loggedin == ''){
      this.props.screenProps.navigate('Signin');
    }else{
      ImagePicker.showImagePicker(response => {
        if(!response.didCancel && !response.error && !response.customButton){
          // Action here
          this.props.setUploadPreview(response); // Redux
          this.props.preview();
        }
      });
    }
  }
  render(){
    return(
      <ActionButton
        onPress={() => this.selectFile()}
        buttonColor="rgb(52,152,219)">
      </ActionButton>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    config : state.reducerConfig
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUploadPreview : (imageData) => dispatch(setUploadPreview(imageData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadButton);
