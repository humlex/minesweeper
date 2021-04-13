import React, { FC } from "react";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import "./index.scss";

const App: FC<{}> = () => (
  <>
    <div className="container">
      <div className="header">
        <NumberDisplay value={0} />
        <div className="face">
          <span role="img" aria-label="face">
            😉
          </span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="body">Body</div>
    </div>
  </>
);

export default App;
