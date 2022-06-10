import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";

const ClientNotification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  return (
    <>
      <div className="mb-md-5 mb-4 pb-xxl-1">
        <h4 className="fw-semibold mb-2">{t("Client Notifications")}</h4>
        <h6>{t("Send appointment reminders to avoid no-shows and keep your clients coming back with follow-up messages with these automated client notifications!")}</h6>
      </div>
      <div className="row">
        <div className="col-xl-10 mx-auto">
          <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
            <div className="row align-items-center">
              <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "email-send.png"} alt="" />
                    <span className="d-block mt-1">{t("Email")}</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("New Appointment")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client on booking an appointment")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  {t("Active")}
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  {t("Edit")}
                </a>
              </div>
            </div>
          </div>

          <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
            <div className="row align-items-center">
              <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "email-send.png"} alt="" />
                    <span className="d-block mt-1">{t("Email")}</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("Appointment Reminder")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client 24 hours before their appointment")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  Active
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  {t("Edit")}
                </a>
              </div>
            </div>
          </div>
          <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
            <div className="row align-items-center">
              <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "email-send.png"} alt="" />
                    <span className="d-block mt-1">{t("Email")}</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("Cancelled Appointment")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client if their appointment is cancelled")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  Active
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  {t("Edit")}
                </a>
              </div>
            </div>
          </div>
          <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
            <div className="row align-items-center">
              <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "email-send.png"} alt="" />
                    <span className="d-block mt-1">{t("Email")}</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("No-Show")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client if their appointment is marked as no-show")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  Active
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  {t("Edit")}
                </a>
              </div>
            </div>
          </div>
          <div className="box-image-cover w-100 mx-0 p-md-4 mb-md-4 mb-3 p-3 text-start">
            <div className="row align-items-center">
              <div className="col-md-9 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "msg-gray.png"} alt="" />
                    <span className="d-block mt-1">{t("SMS")}</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("Appointment Reminder")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client 24 hours before their appointment")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  Active
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  {t("Edit")}
                </a>
              </div>
            </div>
          </div>
          <div className="box-image-cover w-100 mx-0 p-md-4 mb-md-4 mb-3 p-3 text-start">
            <div className="row align-items-center">
              <div className="col-md-9 mb-md-0 mb-2">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={config.imagepath + "msg-gray.png"} alt="" />
                    <span className="d-block mt-1">SMS</span>
                  </div>
                  <div className="ps-3">
                    <h5 className="fw-semibold mb-0">{t("Reply 'Yes' to Confirm")}</h5>
                    <h6 className="mb-0">{t("Automatically sends to a client 48 hours before their appointment if not confirmed")}</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <a href="" className="active me-1 cursor-pointer">
                  Active
                </a>
                <a href="" className="edit me-1 cursor-pointer">
                  Edit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientNotification;
