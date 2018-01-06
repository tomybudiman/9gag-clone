const initialState = {
  apiUrl : 'http://10.11.12.227:8082',
  loggedin : ''
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'SET_SESSION':
      return{...state,loggedin : action.token}
    default:
      return state;
  }
}

export default reducer;
