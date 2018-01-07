import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import axios from 'axios';

import {updateVotes} from '../redux/actions/actionPhoto';

const styles = StyleSheet.create({
  eachPost : {
    marginTop : 5,
    marginBottom : 15
  },
  title : {
    fontSize : 18,
    paddingLeft : 10,
    paddingBottom : 5,
    color : 'rgb(0,0,0)',
  },
  buttonAct : {
    width : 100 / 3+'%'
  }
});

class Trending extends Component {
  vote(type,id){
    axios.post(`${this.props.config.apiUrl}/api/images/${type}`,{
      postId : id
    },{
      headers : {
        token : this.props.config.loggedin,
        type : type
      }
    }).then(({data}) => {
      if(data.status){
        if(data.login){
          this.props.updateVotes(id,type,data.userId);
        }else{
          this.props.screenProps.navigate('Signin');
        }
      }else{
        console.warn(data.msg);
        alert('Something went wrong!');
      }
    }).catch(err => {
      console.warn(err);
    });
  }

  postDetail (photoId) {
    this.props.screenProps.navigate('ImageDetail', {photoId : photoId})
  }

  render(){
    return(
      <FlatList
        data={this.props.photos}
        renderItem={({item}) => (
          <View style={styles.eachPost}>
            {console.log(item)}
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{uri : item.url}} style={{width : '100%', height : item.height + 20}}/>
            <View style={{flexWrap : 'wrap', flexDirection : 'row', paddingTop : 10}}>
              <TouchableOpacity
                style={styles.buttonAct}
                onPress={() => this.vote('upvote',item._id)}>
                <Image
                  resizeMode="contain"
                  style={{alignSelf : 'center', height : 25}}
                  source={require('../media/arrow-up-icon.png')}/>
                <Text style={{alignSelf : 'center'}}>{item.upvotes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonAct}
                onPress={() => this.vote('downvote',item._id)}>
                <Image
                  resizeMode="contain"
                  style={{alignSelf : 'center', height : 25}}
                  source={require('../media/arrow-down-icon.png')}/>
                <Text style={{alignSelf : 'center'}}>{item.downvotes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonAct}
                onPress={() => this.postDetail(item._id)}>
                <Image
                  resizeMode="contain"
                  style={{alignSelf : 'center', height : 25}}
                  source={require('../media/comment-icon.png')}/>
                <Text style={{alignSelf : 'center'}}>0</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}/>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    photos : state.reducerPhoto.photos,
    config : state.reducerConfig
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateVotes : (postId,type,userId) => dispatch(updateVotes(postId,type,userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Trending);
