import React,{Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import {
  changeUploadTitle,
  addNewPhoto
} from '../redux/actions/actionPhoto';

// Styling
const uploadPreview =  StyleSheet.create({
  container : {
    padding : 20
  }
});

class UploadPreview extends Component {
  static navigationOptions(){
    return({
      title : 'Upload Preview',
      headerTitleStyle : {
        color : 'rgb(255,255,255)',
        fontWeight : '100'
      },
      headerStyle : {
        backgroundColor : 'rgb(0,0,0)'
      },
      headerTintColor : 'rgb(255,255,255)'
    });
  };
  constructor(props){
    super(props);
    this.state = {
      imageHeight : 0,
      loading : false
    }
  }
  componentWillMount(){
    Image.getSize(`data:image/png;base64,${this.props.preview.data}`, (width,height) => {
      const imageHeight = Math.round(height * 100 / width) * 3.5;
      this.setState({
        imageHeight : imageHeight
      });
    }, err => {
      console.warn(err);
    });
  }
  submitImage(){
    this.setState({
      loading : true
    });
    const formData = new FormData();
    formData.append('image',JSON.stringify(this.props.preview));
    formData.append('height',this.state.imageHeight);
    formData.append('title',this.props.previewTitle);
    formData.append('userid',26736482647236476);
    axios.post(`${this.props.apiUrl}/api/images/add`,formData).then(({data}) => {
      if(data.status){
        this.props.addNewPhoto(data.msg);
        const redirect = NavigationActions.reset({
          index : 0,
          actions : [
            NavigationActions.navigate({routeName : 'Main'})
          ]
        });
        this.props.navigation.dispatch(redirect);
      }else{
        this.setState({
          loading : false
        });
        alert(data.msg);
      }
    }).catch(err => {
      console.warn(err);
    });
  }
  render(){
    return(
      <View>
        {this.state.loading ?
          <ActivityIndicator
          size="large"
          color="rgb(52,152,219)"
          style={{zIndex : 1, marginTop : '20%'}}/> : null
        }
        <ScrollView style={{position : 'absolute', width : '100%'}}>
          <View style={uploadPreview.container}>
            <Image
              style={{width : '100%',height : this.state.imageHeight}}
              source={{uri : `data:image/png;base64,${this.props.preview.data}`}}/>
            <TextInput
              placeholder="Type something funny"
              underlineColorAndroid="rgb(85,85,85)"
              onChangeText={(text) => this.props.changeUploadTitle(text)}/>
            <Button title="Submit" onPress={() => this.submitImage()} disabled={this.state.loading}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    apiUrl : state.reducerConfig.apiUrl,
    preview : state.reducerPhoto.uploadPreview,
    previewTitle : state.reducerPhoto.uploadTitle
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeUploadTitle : (title) => dispatch(changeUploadTitle(title)),
    addNewPhoto : (photo) => dispatch(addNewPhoto(photo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadPreview);
