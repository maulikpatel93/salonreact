import config from "../config";

// ==============================|| LOADER ||============================== //
const PaginationLoader = () => (
    <div id="preloader">
        <div id="status">
            <img src={config.logopath} alt="" />
        </div>
    </div>
);

export default PaginationLoader;
