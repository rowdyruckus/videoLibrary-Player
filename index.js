//================================ React Native Imported Files ======================================//
import React from 'react';
import {AppRegistry} from 'react-native';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {applyMiddleware, combineReducers, createStore} from 'redux';

//================================ Local Imported Files ======================================//

import App from './App';
import {name as appName} from './app.json';
import ApiData from './redux/store/reducers/ApiData';

const rootReducer = combineReducers({
  ApiData: ApiData,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
