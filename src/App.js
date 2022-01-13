import Routes from "./routes";
// import ErrorBoundary from './ErrorBoundary';
// import { Link } from "react-router-dom";
// import config from "./config";
const App = () => {
  return (
    <>
      {/* <Link to={config.basename}>Login</Link> */}
      {/* <ErrorBoundary> */}
      <Routes />
      {/* </ErrorBoundary> */}
    </>
  );
};

export default App;
