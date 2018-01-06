const initialState = {
  apiUrl : 'http://192.168.56.1:8082',
  loggedin : {
    username : '',
    token : ''
  }
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default reducer;
