import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess, ucfirst } from "helpers/functions";
import Moment from "react-moment";
import config from "../../../../config";

const AppointmentListview = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.client.isView);
  const objectData = views && views.data ? views.data : views;

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let date = objectData[item].date;
          let start_time = objectData[item].start_time;
          let datetime = date + " " + start_time;
          let duration = objectData[item].duration;
          let repeats = objectData[item].repeats;
          let booking_notes = objectData[item].booking_notes;
          let status = objectData[item].status;
          let cancellation_reason = objectData[item].cancellation_reason;
          let reschedule = objectData[item].reschedule;
          let reschedule_at = objectData[item].reschedule_at;
          let service = objectData[item].service;
          let staff = objectData[item].staff;
          let service_name = service && service.name;
          let staff_first_name = staff && staff.first_name;
          let staff_last_name = staff && staff.last_name;
          return (
            <div className="event-box" key={i}>
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
          );
        })}
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
