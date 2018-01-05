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

class Home extends Component {
  vote(type,id){
    axios.post(`${this.props.config.apiUrl}/api/images/${type}`,{
      postId : id
    },{
      headers : {
        token : ''
      }
    }).then(({data}) => {
      if(data.status){
        if(data.login){
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
  render(){
    return(
      <FlatList
        data={this.props.photos}
        renderItem={({item}) => (
          <View style={styles.eachPost}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{uri : item.url}} style={{width : '100%', height : item.height}}/>
            <View style={{flexWrap : 'wrap', flexDirection : 'row', paddingTop : 10}}>
              <TouchableOpacity
                style={styles.buttonAct}
                onPress={() => this.vote('upvote',item._id)}>
                <Image
                  resizeMode="contain"
                  style={{alignSelf : 'center', height : 25}}
                  source={require('../media/arrow-up-icon.png')}/>
                <Text style={{alignSelf : 'center'}}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonAct}
                onPress={() => this.vote('downvote',item._id)}>
                <Image
                  resizeMode="contain"
                  style={{alignSelf : 'center', height : 25}}
                  source={require('../media/arrow-down-icon.png')}/>
                <Text style={{alignSelf : 'center'}}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonAct}>
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

export default connect(mapStateToProps,null)(Home);
