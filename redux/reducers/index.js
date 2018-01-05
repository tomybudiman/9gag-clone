import {combineReducers} from 'redux';

import reducerPhoto from './reducerPhoto';
import reducerConfig from './reducerConfig';

const reducer = combineReducers({
  reducerPhoto,
  reducerConfig
});

export default reducer;
