import React, { Component } from "react";
import { Provider } from "react-redux";

import Layout from "./containers/Layout/Layout";
import store from "./store/store";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Layout />
        </Provider>
      </div>
    );
  }
}

export default App;
