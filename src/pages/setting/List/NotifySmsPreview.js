import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import config from "../../../config";

const NotifySmsPreview = (props) => {
  const { t } = useTranslation();

  const currentUser = props.currentUser;
  const preview = props.preview;
  return (
    <>
      <p className="mb-0">
        <b>Preview</b>
      </p>
      <div className="text-center">
        <div className="mobile-data position-relative img-wrapper">
          <img src={config.imagepath + "mobile.png"} alt="" className="mobile-img" />
          <div className="p-3 mobile-txt text-start">
            <h6 className="text-white mb-0">{preview.sms_template}</h6>
          </div>
        </div>
      </div>
    </>
  );
};
NotifySmsPreview.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  preview: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default NotifySmsPreview;
