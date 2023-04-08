// Reactotron Configurations Here
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import {NAVIGATION_PERSISTENCE_KEY} from '../../constants';

let reactotron = null;
if (__DEV__) {
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'Inshort App',
      host: '192.168.1.10',
    }) // controls connection & communication settings
    .use(reduxPlugin())
    .use(sagaPlugin())
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
      asyncStorage: {
        ignore: [NAVIGATION_PERSISTENCE_KEY, '@REACTOTRON/clientId'],
      },
    }) // add all built-in react native plugins
    .connect(); // let's connect!
  // console.warn = Reactotron.log;
  // console.log = Reactotron.log;
}

export default reactotron;
