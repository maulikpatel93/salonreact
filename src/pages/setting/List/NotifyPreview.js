import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import config from "../../../config";

const NotifyPreview = (props) => {
  const { t } = useTranslation();

  const currentUser = props.currentUser;
  const preview = props.preview;
  return (
    <>
      <p className="mb-0">
        <b>Preview</b>
      </p>
      <div className="voucher-preview w-100">
        <div className="bg-white voucher-preview-inner ps-4 pe-4">
          <div className="row mb-md-4 mb-3 gx-1">
            <div className="col-md-8 mb-md-0 mb-2">
              <h1 className="mb-4">New Appointment</h1>
              <p className="mb-xl-1 mb-3 h4 fw-normal">Hi Michael, thank you for making an appointment at Aura Beauty Salon. We look forward to seeing you soon.</p>
            </div>
            <div className="col-md-4 ps-3 text-md-end">
              <img src="assets/images/aura.svg" alt="" />
            </div>
          </div>
          <div className="mb-md-5 mb-3 pb-xxl-3">
            <label>Date</label>
            <p>Friday 1st May 2022</p>
            <label>Time</label>
            <p>9:30am</p>
            <label>Staff Member</label>
            <p>Amanda Jones</p>
            <label>Service:</label>
            <p>Men’s Haircut</p>
            <label className="h4 mb-1">{currentUser.salon.business_name}</label>
            <p>{currentUser.salon.business_address}</p>
          </div>
          <div className="mb-4">
            <p className="mb-2">
              <b>Appointment Times</b>
            </p>
            <div className="desc">
              <p className="text-justify">{preview.appointment_times_description}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">
              <b>Cancellations</b>
            </p>
            <div className="desc">
              <p className="text-justify">{preview.cancellation_description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
NotifyPreview.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  preview: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default NotifyPreview;
