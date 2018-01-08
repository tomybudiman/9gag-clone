import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native'
import {connect} from 'react-redux';

import Comments from './Comments'
import Comment  from './Comment';

import {getPhoto} from '../redux/actions/actionPhoto'


class ImageDetail extends Component {
  
  constructor(){
    super()
    this.state = {
      comments: []
    }
  }
  
  static navigationOptions(){
    return({
      title : 'Image Detail',
      headerTitleStyle : {
        color : 'rgb(255,255,255)',
        fontWeight : '100'
      },
      headerStyle : {
        backgroundColor : 'rgb(0,0,0)'
      }
    });
  }
  
  componentDidMount() {
    const {state} = this.props.navigation
    this.props.getPhoto(state.params.photoId)
  }
  
  render() {
    return (
      <ScrollView>
        {console.log(this.props.photo)}
        <Image source={{uri : this.props.photo.url}} style={{width : '100%', height : this.props.photo.height + 20, marginTop: 20, marginBottom: '10%'}} />
        <Comment/>
        {/* <Comments/> */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photo : state.reducerPhoto.currentPhoto,
    comments : state.reducerComment.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoto : (photoId) => dispatch(getPhoto(photoId)),
    getComments : (photoId) => dispatch(getComments(photoId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageDetail)
