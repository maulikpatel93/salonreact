import config from "../config";
import { useTranslation } from "react-i18next";
// ==============================|| LOADER ||============================== //
const NoDataFound = () => {
  const { t } = useTranslation();
  return (
    <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4 pt-10">
      <div className="complete-box-wrp text-center">
        <img src={config.imagepath + "addphoto-box.png"} alt="" className="mb-md-4 mb-3" />
        <h5 className="mb-2 fw-semibold">{t("No data found")}</h5>
      </div>
    </div>
  );
};

export default NoDataFound;
