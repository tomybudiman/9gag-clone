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
      height : photo.height,
      downvotes : [],
      upvotes : []
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

export const updateVotes = (postId,type,userId) => {
  return (dispatch,getState) => {
    const newPhotos = getState().reducerPhoto.photos.map((post,i) => {
      if(post._id == postId){
        switch(type){
          case 'upvote':
            post.downvotes.splice(post.downvotes.indexOf(userId),1);
            if(post.upvotes.indexOf(userId) == -1){
              post.upvotes.push(userId)
            }
            break;
          case 'downvote':
            post.upvotes.splice(post.upvotes.indexOf(userId),1);
            if(post.downvotes.indexOf(userId) == -1){
              post.downvotes.push(userId)
            }
            break;
        }
      }
      return post;
    });
    dispatch({
      type : 'UPDATE_VOTES',
      newPhotos
    });
  }
}



export const getPhoto = (postId) => {
  return {
    type: 'GET_PHOTO_DETAIL',
    postId
  }
}
