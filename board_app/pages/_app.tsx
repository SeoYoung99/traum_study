import React from "react";
import App, { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import { compose, createStore, Store } from "redux";
import rootReducer from "../src/store";
import { StyledEngineProvider } from "@mui/styled-engine";

// store 생성
function configureStore(): Store {
  const composeEnhancers =
    (typeof (window as any) !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(rootReducer, composeEnhancers());
  return store;
}
// store 설정파일 로드
export const store = configureStore();

const TestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StyledEngineProvider>
  );
};

TestApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default TestApp;
