import { Link } from "react-router-dom";
import config from "../../config";

const NoMatch = () => {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to={config.basePath}>Go to the home page</Link>
      </p>
    </div>
  );
};

export default NoMatch;
