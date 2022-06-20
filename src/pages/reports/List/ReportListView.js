import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { OpenListModal, ReportListViewApi, ResetStaffFilter, StaffFilter } from "store/slices/reportSlice";
import { staffOptionsDropdown } from "../../../store/slices/staffSlice";
import { ucfirst } from "helpers/functions";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import PerformanceSummary from "./PerformanceSummary";
import SpinLoader from "component/SpinLoader";
import NoDataFound from "component/NoDataFound";
import Clientretention from "./Clientretention";
import CancelledAppointments from "./CancelledAppointments";
import AppointmentSchedule from "./AppointmentSchedule";

const ReportListView = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [state, setState] = useState({ start: "", end: "" });
  const { start, end } = state;

  const rightDrawerOpened = useSelector((state) => state.report.isOpenListModal);
  const isScreenReport = useSelector((state) => state.report.isScreenReport);
  const isStaffFilter = useSelector((state) => state.report.isStaffFilter);
  const isStaffOptionDropdown = useSelector((state) => state.staff.isStaffOptionDropdown);
  const labeldaterange = start && end ? start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD") : "";

  const [isLoaderList, setIsLoaderList] = useState(true);

  useEffect(() => {
    dispatch(staffOptionsDropdown({ dropdown: true }));
    if (isStaffFilter) {
      dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, staff_id: isStaffFilter.id, daterange: labeldaterange })).then(() => {
        setIsLoaderList(false);
      });
    } else {
      dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange })).then(() => {
        setIsLoaderList(false);
      });
    }
  }, [labeldaterange]);

  const handleCallback = (start, end) => {
    setState({ start, end });
  };

  const handleCancel = () => {
    //picker.element.val("");
    setState({ start: "", end: "" });
  };
  const ListView = useSelector((state) => state.report.isListView);

  const fetchDataList = () => {
    dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, next_page_url: ListView.next_page_url }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };
  return (
    <>
      <div className={rightDrawerOpened + " full-screen-drawer p-0 Reports-drawer"} id="PerformanceSummary-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
            <h3 className="mb-0 fw-semibold">{isScreenReport.title}</h3>
            <div className="ms-auto">
              <a className="close btn me-1 cursor-pointer btn-cancel" onClick={() => dispatch(OpenListModal(""))}>
                {t("Cancel")}
              </a>
            </div>
          </div>
          <div className="drawer-body">
            <div className="drawer-panel-header">
              <div className="row">
                <div className="col-md-7">
                  <div className="d-flex flex-wrap align-items-center">
                    <form action="" className="d-inline-block me-3">
                      <DateRangePicker
                        initialSettings={{
                          startDate: start ? start.toDate() : moment().subtract(29, "days"),
                          endDate: end ? end.toDate() : moment(),
                          locale: {
                            format: "Do MMMM YYYY",
                          },
                          // ranges: {
                          //   Today: [moment().toDate(), moment().toDate()],
                          //   Yesterday: [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()],
                          //   "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
                          //   "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
                          //   "This Month": [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
                          //   "Last Month": [moment().subtract(1, "month").startOf("month").toDate(), moment().subtract(1, "month").endOf("month").toDate()],
                          // },
                        }}
                        onCallback={handleCallback}
                        // onEvent={handleEvent}
                        onCancel={handleCancel}
                      >
                        <div className="input-group" id="reportrange">
                          <input type="text" className="form-control date" defaultValue={labeldaterange} />
                          <span className="input-group-text cursor-pointer" id="basic-addon1" onClick={handleCancel}>
                            <i className="fas fa-times"></i>
                          </span>
                        </div>
                      </DateRangePicker>
                    </form>
                    {isScreenReport.uniquename === "performance_summary" || isScreenReport.uniquename === "cancelled_appointments" || isScreenReport.uniquename === "appointment_schedule" ? (
                      <div className="col-sm-3">
                        <div className="dropdown staff-dropdown">
                          <div className="btn-group w-100">
                            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              {isStaffFilter ? isStaffFilter.name : t("All Staff")}
                            </button>
                            <span
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(ResetStaffFilter());
                                dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange }));
                              }}
                            >
                              x
                            </span>
                            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                              <ul className="p-0 m-0 list-unstyled">
                                {isStaffOptionDropdown &&
                                  Object.keys(isStaffOptionDropdown).map((item, i) => {
                                    let id = isStaffOptionDropdown[item].id;
                                    let first_name = isStaffOptionDropdown[item].first_name;
                                    let last_name = isStaffOptionDropdown[item].last_name;
                                    let image_url = isStaffOptionDropdown[item].profile_photo_url;
                                    let name = ucfirst(first_name) + " " + ucfirst(last_name);
                                    return (
                                      <li key={i} data-id={id}>
                                        <a
                                          className="d-flex align-items-center cursor-pointer"
                                          onClick={() => {
                                            dispatch(StaffFilter({ id, name }));
                                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, staff_id: id, daterange: labeldaterange }));
                                          }}
                                        >
                                          <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + last_name.charAt(0)}</div>}</div>
                                          <div className="user-id">
                                            <span className="user-name">{name}</span>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="text-end">
                    <a href="#" className="me-1 print-img" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Print Calendar">
                      <img src={config.imagepath + "print.png"} alt="" />
                    </a>
                    <div className="dropdown d-inline-block export-dropdown">
                      <button className="dropdown-toggle btn dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {t("Export")}
                      </button>
                      <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                        <ul className="p-0 m-0 list-unstyled">
                          <li>
                            <a id="addbusytime-drawer-link" className="d-flex align-items-center">
                              {t("Export to CSV")}
                            </a>
                          </li>
                          <li>
                            <a id="addappoinment-drawer-link" className="d-flex align-items-center">
                              {t("Export to Excel")}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drawer-panel-body mt-4">
              <InfiniteScroll dataLength={ListView && ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content-product" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />} style={{ overflow: ListView.next_page_url ? "auto" : "inherit" }}>
                {isLoaderList === true ? (
                  <SpinLoader />
                ) : (
                  <>
                    {isScreenReport.uniquename === "performance_summary" ? <PerformanceSummary view={ListView} /> : ""}
                    {isScreenReport.uniquename === "client_retention" ? <Clientretention view={ListView} /> : ""}
                    {isScreenReport.uniquename === "cancelled_appointments" ? <CancelledAppointments view={ListView} /> : ""}
                    {isScreenReport.uniquename === "appointment_schedule" ? <AppointmentSchedule view={ListView} /> : ""}
                  </>
                )}
                {!isFetching && ListView.next_page_url && (
                  <div className="col-2 m-auto p-3 text-center">
                    <button onClick={loadMoreItems} className="btn btn-primary">
                      {t("More")}
                    </button>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportListView;
