import React from "react";
import ReactDOM from "react-dom";

import {App} from "./components/app/app.jsx";

const init = () => {
  ReactDOM.render(
      <App rentObjects={
        [
          `Wood and stone place`,
          `Canal View Prinsengracht`,
          `Nice, cozy, warm big bed apartment`,
          `Cozy bed apartment`
        ]
      }/>,
      document.getElementById(`root`)
  );
};

init();
