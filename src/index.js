import React from "react";
import ReactDOM from "react-dom";

import {App} from "./components/app/app.jsx";
import {offers} from "./mocks/offers";

const init = () => {
  ReactDOM.render(
      <App offers={offers}/>,
      document.getElementById(`root`)
  );
};

init();
