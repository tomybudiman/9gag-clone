import Realm from 'realm';
import {LoggedinSchema} from '../../database/model';

export const checkLogin = () => {
  return (dispatch,getState) => {
    Realm.open({
      schema : [LoggedinSchema]
    }).then(realm => {
    }).catch(err => {
      console.warn(err);
    });
  }
}
