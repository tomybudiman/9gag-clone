import Realm from 'realm';
import {LoggedinSchema} from '../../database/model';

export const checkLogin = () => {
  return (dispatch,getState) => {
    Realm.open({
      schema : [LoggedinSchema]
    }).then(realm => {
      const loggedin = realm.objects('Loggedin')['0'];
      if(loggedin){
        dispatch({
          type : 'SET_SESSION',
          token : loggedin.token
        });
      }else{
        dispatch({
          type : 'SET_SESSION',
          token : ''
        });
      }
    }).catch(err => {
      console.warn(err);
    });
  }
}
