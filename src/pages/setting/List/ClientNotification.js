import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { NotifyDetail, NotifyDetailListViewApi, NotifyDetailUpdateApi, OpenNotificationForm, OpenNotificaitonSmsForm } from "store/slices/notificationSlice";
import NotificationForm from "../Form/NotificaitonForm";
import NotificaitonSmsForm from "../Form/NotificaitonSmsForm";

const ClientNotification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const isOpenNotificationForm = useSelector((state) => state.notification.isOpenNotificationForm);
  const isOpenNotificaitonSmsForm = useSelector((state) => state.notification.isOpenNotificaitonSmsForm);
  const isNotifyDetailListView = useSelector((state) => state.notification.isNotifyDetailListView);

  const notifyobjectData = [
    {
      icon: "email-send.png",
      nofify: "Email",
      title: t("New Appointment"),
      type: "NewAppointment",
      short_description: t("Automatically sends to a client on booking an appointment"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
    {
      icon: "email-send.png",
      nofify: "Email",
      title: t("Appointment Reminder"),
      type: "AppointmentReminder",
      short_description: t("Automatically sends to a client 24 hours before their appointment"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
    {
      icon: "email-send.png",
      nofify: "Email",
      title: t("Cancelled Appointment"),
      type: "CancelledAppointment",
      short_description: t("Automatically sends to a client if their appointment is cancelled"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
    {
      icon: "email-send.png",
      nofify: "Email",
      title: t("No-Show"),
      type: "NoShow",
      short_description: t("Automatically sends to a client if their appointment is marked as no-show"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
    {
      icon: "msg-gray.png",
      nofify: "SMS",
      title: t("Appointment Reminder"),
      type: "AppointmentReminder",
      short_description: t("Automatically sends to a client 24 hours before their appointment"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
    {
      icon: "msg-gray.png",
      nofify: "SMS",
      title: t("Reply 'Yes' to Confirm"),
      type: "ReplyYesToConfirm",
      short_description: t("Automatically sends to a client 48 hours before their appointment if not confirmed"),
      appointment_times_description: "",
      cancellation_description: "",
      preview: "",
      is_active: 1,
    },
  ];

  useEffect(() => {
    dispatch(NotifyDetailListViewApi({ notifydata: notifyobjectData }));
  }, []);

  return (
    <>
      <div className="mb-md-5 mb-4 pb-xxl-1">
        <h4 className="fw-semibold mb-2">{t("Client Notifications")}</h4>
        <h6>{t("Send appointment reminders to avoid no-shows and keep your clients coming back with follow-up messages with these automated client notifications!")}</h6>
      </div>
      <div className="row">
        {isNotifyDetailListView &&
          Object.keys(isNotifyDetailListView).map((item, i) => {
            let id = isNotifyDetailListView[item].id;
            let icon = isNotifyDetailListView[item].icon;
            let nofify = isNotifyDetailListView[item].nofify;
            let title = isNotifyDetailListView[item].title;
            let type = isNotifyDetailListView[item].type;
            let short_description = isNotifyDetailListView[item].short_description;
            let is_active = isNotifyDetailListView[item].is_active;
            return (
              <div className="col-xl-10 mx-auto" key={i}>
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
                  <div className="row align-items-center">
                    <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                      <div className="d-flex align-items-center">
                        <div className="text-center">
                          <img src={config.imagepath + icon} alt="" />
                          <span className="d-block mt-1">{t(nofify)}</span>
                        </div>
                        <div className="ps-3">
                          <h5 className="fw-semibold mb-0">{title}</h5>
                          <h6 className="mb-0">{short_description}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-4 ps-md-0 d-flex justify-content-between align-items-center">
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          name="is_active"
                          defaultChecked={is_active === 1 ? true : false}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              setTimeout(() => {
                                dispatch(NotifyDetailUpdateApi({ ...isNotifyDetailListView[item], is_active: 1 }));
                              }, 100);
                            } else {
                              setTimeout(() => {
                                dispatch(NotifyDetailUpdateApi({ ...isNotifyDetailListView[item], is_active: 0 }));
                              }, 100);
                            }
                          }}
                        />
                        <span className="color-default">{t("Enabled")}</span>
                      </div>
                      <a
                        className="edit me-1 cursor-pointer"
                        onClick={() => {
                          if (type === "AppointmentReminder" || type === "ReplyYesToConfirm") {
                            dispatch(OpenNotificaitonSmsForm("open"));
                          } else {
                            dispatch(OpenNotificationForm("open"));
                          }
                          dispatch(NotifyDetail(isNotifyDetailListView[item]));
                        }}
                      >
                        {t("Edit")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {isOpenNotificationForm && <NotificationForm />}
      {isOpenNotificaitonSmsForm && <NotificaitonSmsForm />}
    </>
  );
};

export default ClientNotification;
