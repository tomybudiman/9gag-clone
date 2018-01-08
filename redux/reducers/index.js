import {combineReducers} from 'redux';

import reducerPhoto from './reducerPhoto';
import reducerConfig from './reducerConfig';
import reducerComment from './reducerComment'

const reducer = combineReducers({
  reducerPhoto,
  reducerConfig,
  reducerComment
});

export default reducer;
