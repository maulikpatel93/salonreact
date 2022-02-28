import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { appointmentDeleteApi, appointmentListViewApi, appointmentUpdateApi, clientAppointmentListViewApi, closeAppointmentDetailModal, closeEditAppointmentForm, openAddAppointmentForm } from "store/slices/appointmentSlice";
import { ucfirst } from "helpers/functions";
import { appointmentDetailApi, openEditAppointmentForm } from "store/slices/appointmentSlice";
import { serviceOptions, servicePriceApi } from "store/slices/serviceSlice";
import { staffOptions } from "store/slices/staffSlice";
import Moment from "react-moment";
import { swalConfirm, sweatalert } from "component/Sweatalert2";
import PropTypes from "prop-types";
import { clientSearchName, closeClientSearchList } from "store/slices/clientSlice";
import { offset } from "@popperjs/core";

const AppointmentDetailDrawer = (props) => {
  const [changeStatus, setChangeStatus] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const isRangeInfo = props.isRangeInfo;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const rightDrawerOpened = useSelector((state) => state.appointment.isOpenedDetailModal);
  const appointmentDetail = useSelector((state) => state.appointment.isDetailData);

  const id = appointmentDetail.id;
  const date = appointmentDetail.date;
  const start_time = appointmentDetail.start_time;
  const end_time = appointmentDetail.end_time;
  const cost = appointmentDetail.cost;
  const status = appointmentDetail.status;
  const client = appointmentDetail.client;
  const service = appointmentDetail.service;
  const staff = appointmentDetail.staff;

  const client_id = client.id;
  const profile_photo_url = client.profile_photo_url;
  const first_name = client.first_name;
  const last_name = client.last_name;
  const email = client.email;
  const statusdata = [
    { value: "Scheduled", label: t("Scheduled") },
    { value: "Confirmed", label: t("Confirmed") },
    // { value: "Completed", label: t("Completed") },
    // { value: "Cancelled", label: t("Cancelled") },
  ];
  useEffect(() => {
    setChangeStatus(status);
  }, []);

  const handleDeleteAppointment = (e) => {
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this appointment?"), message: "", confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(appointmentDeleteApi({ id })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(closeEditAppointmentForm());
            dispatch(closeAppointmentDetailModal());
          }
        } else if (action.meta.requestStatus === "rejected") {
          if (action.payload.status === 422) {
            let error = action.payload;
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
          }
        }
      });
    }
  };

  const handleAppointmentDrawer = () => {
    dispatch(openAddAppointmentForm());
    dispatch(clientSearchName(""));
    dispatch(closeClientSearchList());
    dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
  };

  const handleStatusUpdate = (e) => {
    let statusmsg = "schedule";
    if (e.currentTarget.value === "Scheduled") {
      statusmsg = "schedule";
    } else if (e.currentTarget.value === "Confirmed") {
      statusmsg = "confirm";
    } else if (e.currentTarget.value === "Completed") {
      statusmsg = "complete";
    } else if (e.currentTarget.value === "Cancelled") {
      statusmsg = "cancel";
    }
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure you want to {{ status }} the appointment?", { status: statusmsg }), message: "statusupdate", confirmButtonText: t("Yes, {{ status }} it!", { status: statusmsg }) });
    if (confirmbtn === true) {
      setChangeStatus(e.currentTarget.value);
      dispatch(appointmentUpdateApi({ id: id, client_id: client_id, status: "Confirmed", clickEvent: "statusupdate" })).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          dispatch(servicePriceApi({ service_id: "" }));
          dispatch(clientAppointmentListViewApi({ client: client_id }));
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(appointmentDetailApi({ id, client_id }));
          }
          sweatalert({ title: t("Appointment status updated"), text: t("Appointment status updated"), icon: "success" });
        }
      });
    }
  };
  return (
    <>
      <div className={"drawer appointment-detail " + rightDrawerOpened} id="addclient-drawer">
        <div className="drawer-wrp position-relative include-footer">
          <div className="drawer-header mb-3">
            <div className="d-flex">
              <div className="flex-shrink-0">
                {profile_photo_url ? (
                  <a data-fancybox="" data-src={profile_photo_url}>
                    <img src={profile_photo_url} alt="" className="rounded-circle wh-40 mr-3" />
                  </a>
                ) : (
                  <div className="user-initial me-md-3 me-2">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>
                )}
              </div>
              <div className="flex-grow-1 ms-3">
                <h3 className="user-name mb-0">{ucfirst(first_name + " " + last_name)}</h3>
                <p>{email}</p>
              </div>
            </div>
            <a
              className="close-drawer cursor-pointer"
              onClick={() => {
                dispatch(closeAppointmentDetailModal());
                dispatch({ type: "appointment/detail/rejected" });
              }}
            >
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
            {status && status === "Scheduled" && (
              <>
                <div className="row gx-2 action-box mb-3 align-items-end mt-3">
                  <a
                    className="col text-center text-decoration-none cursor-pointer"
                    onClick={() => {
                      dispatch(appointmentDetailApi({ id, client_id })).then((action) => {
                        if (action.meta.requestStatus === "fulfilled") {
                          dispatch(openEditAppointmentForm());
                          dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
                          dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
                        } else if (action.meta.requestStatus === "rejected") {
                          if (action.payload.status === 422) {
                            let error = action.payload;
                            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                            sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
                          }
                        }
                      });
                    }}
                  >
                    <img src={config.imagepath + "edit-big.png"} alt="" />
                    <span className="d-block">{t("Edit")}</span>
                  </a>
                  <a className="col text-center text-decoration-none cursor-pointer">
                    <img src={config.imagepath + "appoinment.png"} alt="" />
                    <span className="d-block">{t("Reschedule")}</span>
                  </a>
                  <a className="col text-center text-decoration-none cursor-pointer" onClick={handleAppointmentDrawer}>
                    <img src={config.imagepath + "book-next.png"} alt="" />
                    <span className="d-block">{t("Book Next")}</span>
                  </a>
                  <a className="col text-center text-decoration-none cursor-pointer">
                    <img src={config.imagepath + "email.png"} alt="" />
                    <span className="d-block">{t("Email")}</span>
                  </a>
                  <a className="col text-center text-decoration-none cursor-pointer">
                    <img src={config.imagepath + "sms.png"} alt="" />
                    <span className="d-block">{t("SMS")}</span>
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="drawer-body pb-md-5 pb-3">
            <h3 className="mb-2">
              <Moment format="dddd, MMMM Do YYYY">{date}</Moment>
            </h3>
            <h5 className="mb-1 fw-normal">
              {service.name} - {cost}
            </h5>
            <h6 className="mb-1">{ucfirst(staff.first_name + " " + staff.last_name)}</h6>
            <h6 className="mb-1">
              <Moment format="hh:mm A">{date + "T" + start_time}</Moment> <span className="ms-1 me-1">-</span>
              <Moment format="hh:mm A">{date + "T" + end_time}</Moment>
            </h6>
            <div className="mt-3 mb-3">
              <label>{t("Status")}</label>
              {status && status === "Scheduled" ? (
                <select className="form-control" value={status} onChange={handleStatusUpdate}>
                  {statusdata.length > 0 &&
                    statusdata.map((item, i) => {
                      return (
                        <option key={i} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              ) : (
                <h5 className="">{status}</h5>
              )}
            </div>
            <p className="mb-2 text-jusitfy">{t("Client will be arriving early to be able to start before {{start_time}} if {{staff_name}} is available and will be needing to leave by {{end_time}} at the latest.", { start_time: "09:15Am", end_time: "10::00Pm", staff_name: "Amanda" })}</p>
          </div>
          <div className="drawer-footer text-center">
            <a className="btn btn-secondary btn-lg text-dark cursor-pointer me-3" onClick={handleDeleteAppointment}>
              <i className="fas fa-trash-alt p-0"></i>
            </a>
            <a className="btn btn-primary btn-lg cursor-pointer w-75">{t("Checkout")}</a>
          </div>
        </div>
      </div>
    </>
  );
};
AppointmentDetailDrawer.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default AppointmentDetailDrawer;
