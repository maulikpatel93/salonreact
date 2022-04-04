import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import config from "../../../config";

const VoucherPreview = (props) => {
  const { t } = useTranslation();

  const currentUser = props.currentUser;
  const preview = props.preview;
  const service = props.service;
  let matchServicesData = [];
  service.filter(function (item) {
    if (preview && preview.service_id && preview.service_id.indexOf(item.value) != -1) {
      matchServicesData.push(item.label);
      return matchServicesData;
    }
  });
  return (
    <>
      <div className="voucher-preview">
        <div className="bg-white voucher-preview-inner">
          <div className="row mb-md-4 mb-3 gx-1">
            <p>{t("Preview")}</p>
            <div className="col-9">
              <h2 className="mb-0">{preview.name ? preview.name : t("Voucher Name")}</h2>
              <h3 className="mb-1">${preview.amount ? preview.amount : "00.00"}</h3>
              <h4 className="text-justify white-space-pre-line">{preview.description ? preview.description : t("Description")}</h4>
            </div>
            <div className="col-3 ps-3">
              <img src={currentUser.salon && currentUser.salon.logo_url ? currentUser.salon.logo_url : config.imagepath + "logo.png"} alt="" />
            </div>
          </div>
          <div className="mb-md-4 mb-3">
            <label>{t("To")}</label>
            <p>-----</p>
            <label>{t("From")}</label>
            <p>-----</p>
            <label>{t("Note")}</label>
            <p>{t("A message added to the voucher.")}</p>
            <label>{t("Expiry")}</label>
            <p>{t("Valid for {{ months }} month(s)", { months: preview.valid ? preview.valid : 0 })}</p>
            <label>{t("Voucher code:")}</label>
            <p>xxxxxxxxxx</p>
            <label>{t("Redeem on:")}</label>
            <p>{matchServicesData.length > 0 ? matchServicesData.join(", ") : "---"}</p>
            <label className="h4 mb-1">{currentUser.salon.business_name}</label>
            <p>{currentUser.salon.business_address}</p>
          </div>
          <div className="desc">
            <p className="text-justify">{preview.terms_and_conditions}</p>
          </div>
        </div>
      </div>
    </>
  );
};
VoucherPreview.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  preview: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default VoucherPreview;
