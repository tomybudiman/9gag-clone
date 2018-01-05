import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';

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
  }
});

class Home extends Component {
  render(){
    return(
      <FlatList
        data={this.props.photos}
        renderItem={({item}) => (
          <View style={styles.eachPost}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{uri : item.url}} style={{width : '100%', height : item.height}}/>
            <View></View>
          </View>
        )}
        keyExtractor={item => item._id}/>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    photos : state.reducerPhoto.photos
  }
}

export default connect(mapStateToProps,null)(Home);
