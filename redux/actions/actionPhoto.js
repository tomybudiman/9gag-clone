import axios from 'axios';

export const setUploadPreview = (imageData) => {
  return{
    type : 'SET_UPLOAD_PREVIEW',
    imageData
  }
}

export const changeUploadTitle = (title) => {
  return{
    type : 'CHANGE_UPLOAD_TITLE',
    title
  }
}

export const addNewPhoto = (photo) => {
  return (dispatch,getState) => {
    let newPhotos = getState().reducerPhoto.photos;
    newPhotos.unshift({
      _id : photo._id,
      title : getState().reducerPhoto.uploadTitle,
      url : `data:image/png;base64,${getState().reducerPhoto.uploadPreview.data}`,
      height : photo.height
    });
    dispatch({
      type : 'ADD_NEW_PHOTO',
      newPhotos
    });
  }
}

export const fetchPhotos = () => {
  return (dispatch,getState) => {
    axios.get(`${getState().reducerConfig.apiUrl}/api/images/all`).then(({data}) => {
      if(data.status){
        dispatch({
          type : 'FETCH_PHOTOS',
          photos : data.msg
        });
      }else{
        alert('Something went wrong! Contact your system administrator! - 1');
      }
    }).catch(err => {
      alert('Something went wrong! Contact your system administrator! - 2');
    });
  }
}
