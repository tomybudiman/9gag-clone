const initialState = {
  photos : [],
  uploadPreview : {
    filename : '',
    data : ''
  },
  uploadTitle : 'Your title here'
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'SET_UPLOAD_PREVIEW':
      return{...state, uploadPreview : {
        filename : action.imageData.fileName,
        data : action.imageData.data
      }};
    case 'CHANGE_UPLOAD_TITLE':
      return{...state, uploadTitle : action.title};
    case 'ADD_NEW_PHOTO':
      return{...state, photos : action.newPhotos};
    case 'FETCH_PHOTOS':
      return{...state, photos : action.photos}
    default:
      return state;
  }
}

export default reducer;
