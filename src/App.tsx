import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Router from "./navigation/Router";

let persistor = persistStore(store);

export function App() {
  const [appIsReady, getAppReady] = useState(false);

  useEffect(() => {
    getAppReady(true);
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );

};

export default App;