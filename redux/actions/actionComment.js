import axios from 'axios';

export const getComments = (photoId) => {
  return (dispatch, getState) => {
    axios.get(`${getState().reducerConfig.apiUrl}/api/comments/${photoId}`)
      .then(({data}) => {
        if (data) {
          dispatch ({
            type : 'FETCH_COMMENTS',
            comments : data
          })
        } else {
          alert('Something went wrong! Contact your system administrator! - 3');
        }
      })
      .catch(err => {
        alert('Something went wrong! Contact your system administrator! - 4');
      })
  }
}


export const postComment => (photoId) => {
  return (dispatch, getState) => {
    axios.post(`${getState().reducerConfig.apiUrl}/api/comments/${photoId}`)
      .then(({data}) => {
        if (data) {
          let comments = getState().reducerComments.comments
          comments.unshift({
            data
          })
          dispatch({
            type: 'POST_COMMENT',
            comments
          })
        }
      })
  }
}
