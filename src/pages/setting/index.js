import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import config from "../../config";
import { SettingTabGridView } from "store/slices/settingSlice";
import BusinessDetailForm from "./Form/BusinessDetailForm";
import Integration from "./List/Integration";
import StripeSetupForm from "pages/account/Form/StripeSetupForm";
import Closeddate from "./List/Closeddate";
import ClientNotification from "./List/ClientNotification";
import Cancellationreason from "./List/Cancellationreason";

const Setting = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabview = useSelector((state) => state.setting.isTabView);
  const isOpenedStripeAddForm = useSelector((state) => state.stripe.isOpenedAddForm);
  useEffect(() => {
    dispatch(SettingTabGridView(""));
  }, []);
  return (
    <>
      <div className="page-content ac-setup-page" id={"page-content-" + tabview}>
        <div className="d-flex align-items-start ac-setup">
          <div className="nav flex-column nav-pills acsetup-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "businessdetails" ? " active" : "")} id="v-pills-businessdetails-tab" data-bs-toggle="pill" data-bs-target="#v-pills-businessdetails" type="button" role="tab" aria-controls="v-pills-businessdetails" aria-selected="true" onClick={() => dispatch(SettingTabGridView("businessdetails"))}>
              {t("Business Details")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "ClosedDates" ? " active" : "")} id="v-pills-ClosedDates-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ClosedDates" type="button" role="tab" aria-controls="v-pills-ClosedDates" aria-selected="false" onClick={() => dispatch(SettingTabGridView("ClosedDates"))}>
              {t("Closed Dates")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "ClientNotifications" ? " active" : "")} id="v-pills-ClientNotifications-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ClientNotifications" type="button" role="tab" aria-controls="v-pills-ClientNotifications" aria-selected="false" onClick={() => dispatch(SettingTabGridView("ClientNotifications"))}>
              {t("Client Notifications")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "CancellationReasons" ? " active" : "")} id="v-pills-CancellationReasons-tab" data-bs-toggle="pill" data-bs-target="#v-pills-CancellationReasons" type="button" role="tab" aria-controls="v-pills-CancellationReasons" aria-selected="false" onClick={() => dispatch(SettingTabGridView("CancellationReasons"))}>
              {t("Cancellation Reasons")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "Permissions" ? " active" : "")} id="v-pills-Permissions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Permissions" type="button" role="tab" aria-controls="v-pills-Permissions" aria-selected="false" onClick={() => dispatch(SettingTabGridView("Permissions"))}>
              {t("Permissions")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "SMSUsage" ? " active" : "")} id="v-pills-SMSUsage-tab" data-bs-toggle="pill" data-bs-target="#v-pills-SMSUsage" type="button" role="tab" aria-controls="v-pills-SMSUsage" aria-selected="false" onClick={() => dispatch(SettingTabGridView("SMSUsage"))}>
              {t("SMS Usage")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "Integrations" ? " active" : "")} id="v-pills-Integrations-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Integrations" type="button" role="tab" aria-controls="v-pills-Integrations" aria-selected="false" onClick={() => dispatch(SettingTabGridView("Integrations"))}>
              {t("Integrations")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "ConsultationForms" ? " active" : "")} id="v-pills-ConsultationForms-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ConsultationForms" type="button" role="tab" aria-controls="v-pills-ConsultationForms" aria-selected="false" onClick={() => dispatch(SettingTabGridView("ConsultationForms"))}>
              {t("Consultation Forms")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "BookingButtons" ? " active" : "")} id="v-pills-BookingButtons-tab" data-bs-toggle="pill" data-bs-target="#v-pills-BookingButtons" type="button" role="tab" aria-controls="v-pills-BookingButtons" aria-selected="false" onClick={() => dispatch(SettingTabGridView("BookingButtons"))}>
              {t("Booking Buttons")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "Analytics" ? " active" : "")} id="v-pills-Analytics-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Analytics" type="button" role="tab" aria-controls="v-pills-Analytics" aria-selected="false" onClick={() => dispatch(SettingTabGridView("Analytics"))}>
              {t("Analytics")}
            </button>
          </div>
          <div className="acsetup-right">
            {!tabview && (
              <div className="alltab-box">
                <div className="row">
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("businessdetails"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Business Details")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("ClosedDates"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-1.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Closed Dates")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("ClientNotifications"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-3.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Client Notifications")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("CancellationReasons"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-5.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Cancellation Reasons")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("Permissions"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-7.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Permissions")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("SMSUsage"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Group1.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("SMS Usage")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("Integrations"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-2.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Integrations")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("ConsultationForms"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-4.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Consultation Forms")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("BookingButtons"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-6.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Booking Buttons")}</h6>
                    </div>
                  </a>
                  <a className="box-image-cover listsetup" onClick={() => dispatch(SettingTabGridView("Analytics"))}>
                    <div className="tabs-image">
                      <img src={config.imagepath + "Frame1-8.png"} />
                    </div>
                    <div className="image-content">
                      <h6>{t("Analytics")}</h6>
                    </div>
                  </a>
                </div>
              </div>
            )}

            <div className="tab-content" id="v-pills-tabContent">
              <div className={"tab-pane fade " + (tabview && tabview == "businessdetails" ? " show active" : "")} id="v-pills-businessdetails" role="tabpanel" aria-labelledby="v-pills-businessdetails-tab">
                {tabview && tabview == "businessdetails" && <BusinessDetailForm />}
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "ClosedDates" ? " show active" : "")} id="v-pills-ClosedDates" role="tabpanel" aria-labelledby="v-pills-ClosedDates-tab">
                {tabview && tabview == "ClosedDates" && <Closeddate />}
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "ClientNotifications" ? " show active" : "")} id="v-pills-ClientNotifications" role="tabpanel" aria-labelledby="v-pills-ClientNotifications-tab">
                {tabview && tabview == "ClientNotifications" && <ClientNotification />}
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "CancellationReasons" ? " show active" : "")} id="v-pills-CancellationReasons" role="tabpanel" aria-labelledby="v-pills-CancellationReasons-tab">
                {tabview && tabview == "CancellationReasons" && <Cancellationreason />}
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "Permissions" ? " show active" : "")} id="v-pills-Permissions" role="tabpanel" aria-labelledby="v-pills-Permissions-tab"></div>
              <div className={"tab-pane fade " + (tabview && tabview == "SMSUsage" ? " show active" : "")} id="v-pills-SMSUsage" role="tabpanel" aria-labelledby="v-pills-SMSUsage-tab"></div>
              <div className={"tab-pane fade " + (tabview && tabview == "Integrations" ? " show active" : "")} id="v-pills-Integrations" role="tabpanel" aria-labelledby="v-pills-Integrations-tab">
                {tabview && tabview == "Integrations" && <Integration />}
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "ConsultationForms" ? " show active" : "")} id="v-pills-ConsultationForms" role="tabpanel" aria-labelledby="v-pills-ConsultationForms-tab"></div>
              <div className={"tab-pane fade " + (tabview && tabview == "Analytics" ? " show active" : "")} id="v-pills-Analytics" role="tabpanel" aria-labelledby="v-pills-Analytics-tab"></div>
            </div>
          </div>
        </div>
      </div>
      {isOpenedStripeAddForm && <StripeSetupForm />}
    </>
  );
};

export default Setting;
