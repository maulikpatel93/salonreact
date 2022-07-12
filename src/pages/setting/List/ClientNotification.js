import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { NotifyDetail, OpenNotificationForm } from "store/slices/notificationSlice";
import NotificationForm from "../Form/NotificaitonForm";

const ClientNotification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const isOpenNotificationForm = useSelector((state) => state.notification.isOpenNotificationForm);

  const notifyobjectData = [
    {
      icon: config.imagepath + "email-send.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
      icon: config.imagepath + "email-send.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
      icon: config.imagepath + "email-send.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
      icon: config.imagepath + "email-send.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
      icon: config.imagepath + "msg-gray.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
      icon: config.imagepath + "msg-gray.png",
      salon_id: currentUser.salon_id,
      user_id: currentUser.id,
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
  return (
    <>
      <div className="mb-md-5 mb-4 pb-xxl-1">
        <h4 className="fw-semibold mb-2">{t("Client Notifications")}</h4>
        <h6>{t("Send appointment reminders to avoid no-shows and keep your clients coming back with follow-up messages with these automated client notifications!")}</h6>
      </div>
      <div className="row">
        {notifyobjectData &&
          Object.keys(notifyobjectData).map((item, i) => {
            let icon = notifyobjectData[item].icon;
            let nofify = notifyobjectData[item].nofify;
            let title = notifyobjectData[item].title;
            let type = notifyobjectData[item].type;
            let short_description = notifyobjectData[item].short_description;
            let is_active = notifyobjectData[item].is_active;
            return (
              <div className="col-xl-10 mx-auto" key={i}>
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 mb-md-4 mb-3 text-start">
                  <div className="row align-items-center">
                    <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                      <div className="d-flex align-items-center">
                        <div className="text-center">
                          <img src={icon} alt="" />
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
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <span className="color-default">{t("Enabled")}</span>
                      </div>
                      <a
                        className="edit me-1 cursor-pointer"
                        onClick={() => {
                          dispatch(OpenNotificationForm("open"));
                          dispatch(NotifyDetail(notifyobjectData[item]));
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
    </>
  );
};

export default ClientNotification;
