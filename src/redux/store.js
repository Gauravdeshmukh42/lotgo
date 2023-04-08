import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import thunk from "redux-thunk";
import Reactotron from "reactotron-react-native";
import reactotronConfig from "../services/reactotron";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["news"],
};

if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  var sagaMiddleware = createSagaMiddleware({ sagaMonitor });
} else {
  var sagaMiddleware = createSagaMiddleware();
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, thunk],
  devTools: (__DEV__ && reactotronConfig.createEnhancer()) || undefined,
});

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
