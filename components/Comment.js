import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native'

class Comment extends Component {

  constructor(){
    super()
    this.state = {
      comment: ''
    }
  }

  render(){
    return (
      <View style = {styles.box}>
        <Text style={styles.text}>
        Comment
        </Text>

        <TextInput 
        multiline = {true}
        numberOfLines = {6} 
        onChangeText = { (text) => this.updateComment(text) }
        style = {styles.textBox} />

        <Button
        style = {styles.submitButton}
        title = "Submit"
        onPress = { () => this.handleComment() }
        />
      </View>
    )
  }

  updateComment(text) {
    this.setState({ comment: text });
  }

  handleComment() {
    console.log("handled the comment sucessfully")
    // console.log(this.state.comment)
  }
}

const styles = StyleSheet.create({
  textBox: {
    height: '20%',
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: '5%'
  },
  text: {
    marginHorizontal: '5%'
  },
  box: {
    marginHorizontal: '2%',
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#000',
    marginBottom: '5%'
  },
  submitButton: {
    marginTop: '5%',
    width: '40%'
  }
})

export default Comment