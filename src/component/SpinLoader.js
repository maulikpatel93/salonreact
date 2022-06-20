import config from "../config";

// ==============================|| LOADER ||============================== //
const SpinLoader = () => (
  <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }}>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default SpinLoader;
