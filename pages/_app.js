import "semantic-ui-css/semantic.min.css";
import App from "next/app";
import makeStore from "../store";
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider, ReactReduxContext, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props;
//     // return (
//     //   // <Provider store={store}>
//     //   <Component {...pageProps} />
//     //   // </Provider>
//     // );

//     return (
//       <ReactReduxContext.Consumer>
//         {({ store }) => {
//           <PersistGate
//             persistor={store.__persistor}
//             loading={<div>Loading</div>}
//           >
//             <Component {...pageProps} />
//           </PersistGate>;
//         }}
//       </ReactReduxContext.Consumer>
//     );
//   }

//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = Component.getInitialProps
//       ? await Component.getInitialProps(ctx)
//       : {};

//     return pageProps;
//   }
// }

const MyApp = ({ Component, pageProps }) => {
  const store = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PersistGate>
  );
};

export default createWrapper(makeStore).withRedux(MyApp);
// export default wrapper.withRedux(MyApp);
