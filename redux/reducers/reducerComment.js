const initialState = {
  comments: []
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'FETCH_COMMENTS' :
      return {...state, comments: action.comments}
    case 'POST_COMMENT' :
      return {...state, comments: action.comments}
    default:
      return state;
  }
}

export default reducer;
