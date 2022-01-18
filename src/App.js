import Routes from "./routes";
import { Suspense } from "react";
import Loader from "component/Loader";
// import ErrorBoundary from './ErrorBoundary';
// import { Link } from "react-router-dom";
// import config from "./config";
const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
      {/* <Link to={config.basename}>Login</Link> */}
      {/* <ErrorBoundary> */}
      {/* <Routes /> */}
      {/* </ErrorBoundary> */}
    </>
  );
};

export default App;
