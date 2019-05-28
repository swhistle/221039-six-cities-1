import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";
import {offers, cities} from "./mocks/offers";
import {reducer} from "./reducer";

const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App offers={offers}
           cities={cities}/>
    </Provider>,
    document.getElementById(`root`)
  );
};

init();
