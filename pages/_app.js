import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { initStore } from '../store';
import App from 'next/app';
import './global.scss';

export default withRedux(initStore)(
  class MyApp extends App {
    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
});