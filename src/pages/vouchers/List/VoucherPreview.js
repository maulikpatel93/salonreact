import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import config from "../../../config";

const VoucherPreview = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const preview = props.preview;
  const service = props.service;
  let matchServicesData = [];
  const matchServices = service.filter(function (item) {
    if (preview && preview.service_id && preview.service_id.indexOf(item.value) != -1) {
      matchServicesData.push(item.label);
      return matchServicesData;
    }
  });
  return (
    <>
      <div className="voucher-preview">
        <h3>{t("Voucher Preview")}</h3>
        <div className="bg-white voucher-preview-inner">
          <div className="row mb-md-4 mb-3 gx-1">
            <div className="col-9">
              <h2 className="mb-0">{preview.name ? preview.name : t("Voucher Name")}</h2>
              <h3 className="mb-1">${preview.amount ? preview.amount : "00.00"}</h3>
              <h4 className="text-justify white-space-pre-line">{preview.description ? preview.description : t("Description")}</h4>
            </div>
            <div className="col-3 ps-3">
              <img src={config.imagepath + "aura.png"} alt="" />
            </div>
          </div>
          <div className="mb-md-4 mb-3">
            <label>To</label>
            <p>-----</p>
            <label>From</label>
            <p>-----</p>
            <label>Note</label>
            <p>A message added to the voucher.</p>
            <label>Expiry</label>
            <p>{t("Valid for {{ months }} month(s)", { months: preview.valid ? preview.valid : 0 })}</p>
            <label>Voucher code:</label>
            <p>xxxxxxxxxx</p>
            <label>Redeem on:</label>
            <p>{matchServicesData.length > 0 ? matchServicesData.join(", ") : "---"}</p>
            <label className="h4 mb-1">{config.siteName}</label>
            <p>{config.siteAddress}</p>
          </div>
          <div className="desc">
            <p className="text-justify">{config.voucher_terms_condition}</p>
          </div>
        </div>
      </div>
    </>
  );
};
VoucherPreview.propTypes = {
  preview: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default VoucherPreview;
