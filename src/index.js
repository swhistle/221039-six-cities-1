import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import browserHistory from "./history";

import App from "./components/app/app.jsx";
import {reducer, Operations} from "./reducer";

import thunk from "redux-thunk";
import {compose} from "recompose";

import {configureAPI} from "./api";

const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(Operations.loadOffers());
  store.dispatch(Operations.loadFavoriteHotels());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <App/>
        </Router>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
