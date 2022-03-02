import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";
import config from "../../../../config";
import { appointmentDetailApi, openEditAppointmentForm } from "store/slices/appointmentSlice";
import { serviceOptions } from "store/slices/serviceSlice";
import { staffOptions } from "store/slices/staffSlice";

const AppointmentListview = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;
  // const role_id = props.role_id;
  // const access = props.access;
  // const view = useSelector((state) => state.client.isView);
  const objectData = views && views.data ? views.data : views;

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          let id = objectData[item].id;
          let client_id = objectData[item].client_id;
          let service_id = objectData[item].service_id;
          let date = objectData[item].date;
          let start_time = objectData[item].start_time;
          let datetime = date + " " + start_time;
          let status = objectData[item].status;
          // let duration = objectData[item].duration;
          // let repeats = objectData[item].repeats;
          // let booking_notes = objectData[item].booking_notes;
          // let cancellation_reason = objectData[item].cancellation_reason;
          // let reschedule = objectData[item].reschedule;
          // let reschedule_at = objectData[item].reschedule_at;
          let service = objectData[item].service;
          let staff = objectData[item].staff;
          let service_name = service && service.name;
          let staff_first_name = staff && staff.first_name;
          let staff_last_name = staff && staff.last_name;

          let previousStatus = status;
          if (item > 0) {
            previousStatus = objectData[item - 1].status;
          }
          return (
            <div key={item}>
              <h4 className="mb-3">{item > 0 && previousStatus === status ? "" : status}</h4>
              <div
                className={(status === "Scheduled" && "cursor-pointer") + " text-decoration-none event-box"}
                onClick={() => {
                  if (status === "Scheduled") {
                    dispatch(appointmentDetailApi({ id, client_id })).then((action) => {
                      if (action.meta.requestStatus === "fulfilled") {
                        dispatch(openEditAppointmentForm());
                        dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
                        dispatch(staffOptions({ option: { valueField: "users.id", labelField: "CONCAT(users.last_name,' ',users.first_name)" }, service_id: service_id }));
                      } else if (action.meta.requestStatus === "rejected") {
                        if (action.payload.status === 422) {
                          let error = action.payload;
                          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                          sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
                        }
                      }
                    });
                  }
                }}
              >
                <h6 className="mb-1 color-wine fw-semibold d-flex align-items-start">
                  <Moment format="dddd, DD MMMM YYYY">{datetime}</Moment>
                  {status && status === "Completed" && (
                    <a className="ms-auto invoice-link">
                      <img src={config.imagepath + "past.png"} alt="" />
                    </a>
                  )}
                </h6>
                <h6 className="mb-1">
                  <Moment format="hh:mm A">{datetime}</Moment>
                </h6>
                <h6 className="mb-0">{t("{{service_name}} with {{staff_name}}", { service_name: service_name, staff_name: ucfirst(staff_first_name + " " + staff_last_name) })}</h6>
              </div>
            </div>
          );
        })}
      {objectData.length <= 0 ? (
        <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
          <div className="complete-box-wrp text-center">
            <img src={config.imagepath + "addphoto-box.png"} alt="" className="mb-md-4 mb-3" />
            <h5 className="mb-2 fw-semibold">{t("No data found")}</h5>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <div className="mb-lg-4">
        <h4 className="mb-3">Upcoming</h4>
        <a className="text-decoration-none event-box" id="addappoinment-drawer-link">
          <h6 className="mb-1 color-wine fw-semibold">Monday, August 17th 2021</h6>
          <h6 className="mb-1">10:00am</h6>
          <h6 className="mb-0">Haircut & Blow Dry with Amanda</h6>
        </a>
      </div>
      <div className="mb-lg-4">
        <h4 className="mb-3">Past </h4>
        <div className="event-box">
          <h6 className="mb-0 color-wine fw-semibold d-flex align-items-start">
            Monday, August 17th 2021
            <a className="ms-auto invoice-link">
              <img src="assets/images/past.png" alt="" />
            </a>
          </h6>
          <h6 className="mb-1">10:00am</h6>
          <h6 className="mb-0">Haircut & Blow Dry with Amanda</h6>
        </div>
      </div> */}
    </>
  );
};

AppointmentListview.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  role_id: PropTypes.number,
};

export default AppointmentListview;
