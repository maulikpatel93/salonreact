import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SalonModule } from "pages";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { DashboardViewApi, UpcomingAppointmentListViewApi } from "store/slices/dashboardSlice";
import { ucfirst } from "helpers/Functions";
import Moment from "react-moment";
import config from "../../config";
import { checkaccess } from "helpers/Functions";

const Dashboard = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const isDashboard = useSelector((state) => state.dashboard.isDashboard);
  const isUpComingAppointment = useSelector((state) => state.dashboard.isUpComingAppointment);
  const isUpComingAppointmentObjectData = isUpComingAppointment && isUpComingAppointment.data ? isUpComingAppointment.data : isUpComingAppointment;
  const salonmodule = useSelector((state) => state.salonmodule.isListView);

  useEffect(() => {
    dispatch(UpcomingAppointmentListViewApi());
    dispatch(DashboardViewApi());
  }, []);

  const fetchUpcomingAppointmentList = () => {
    dispatch(UpcomingAppointmentListViewApi({ next_page_url: isUpComingAppointment.next_page_url }));
  };
  return (
    <>
      <div className="page-content dashboard-content">
        <div className="dashboard">
          <div className="row flex-xl-row flex-column-reverse">
            <div className="col-xl-3 left-col">
              <InfiniteScroll className="" dataLength={isUpComingAppointmentObjectData && isUpComingAppointmentObjectData.length ? isUpComingAppointmentObjectData.length : "0"} next={fetchUpcomingAppointmentList} scrollableTarget="page-content-ClosedDates" hasMore={isUpComingAppointment.next_page_url ? true : false} loader={<PaginationLoader />}>
                <div className="bg-white py-lg-4 py-3 px-3 box-common">
                  <h5 className="fw-semibold px-2">{t("Upcoming Appointments")}</h5>
                  <ul className="list-unstyled mb-0 px-2">
                    {isUpComingAppointmentObjectData.length > 0 &&
                      Object.keys(isUpComingAppointmentObjectData).map((item, i) => {
                        let id = isUpComingAppointmentObjectData[item].id;
                        let client = isUpComingAppointmentObjectData[item].client;
                        let service = isUpComingAppointmentObjectData[item].service;
                        let dateof = isUpComingAppointmentObjectData[item].dateof;
                        let start_time = isUpComingAppointmentObjectData[item].start_time;
                        let end_time = isUpComingAppointmentObjectData[item].end_time;
                        let cost = isUpComingAppointmentObjectData[item].cost;
                        // let start_date = isUpComingAppointmentObjectData[item].start_date;
                        // let end_date = isUpComingAppointmentObjectData[item].end_date;
                        // let reason = isUpComingAppointmentObjectData[item].reason;
                        return (
                          <li className="user-box d-flex py-lg-4 py-3" key={i}>
                            <div className="d-flex align-items-center pe-2">
                              {client.profile_photo_url ? (
                                <div className="user-initial me-xxl-3 me-2 text-uppercase">
                                  <img src={client.profile_photo_url} alt="" />
                                </div>
                              ) : (
                                <div className="user-initial me-xxl-3 me-2 text-uppercase">{client.first_name.charAt(0) + "" + client.last_name.charAt(0)}</div>
                              )}

                              <div className="user-id">
                                <h6 className="mb-1 fw-semibold">{ucfirst(client.first_name + " " + client.last_name)}</h6>
                                <div className="lh-sm time">
                                  {service.name}
                                  <br />
                                  <Moment format="hh:mm A">{dateof + "T" + start_time}</Moment> - <Moment format="hh:mm A">{dateof + "T" + end_time}</Moment>
                                </div>
                              </div>
                            </div>
                            <div className="text-end ms-auto">
                              <h6 className="fw-semibold mb-0">${cost}</h6>
                            </div>
                          </li>
                        );
                      })}
                    {isUpComingAppointmentObjectData.length === 0 && <div className="">{t("No data found")}</div>}
                  </ul>
                </div>
              </InfiniteScroll>
            </div>
            <div className="col-xl-9 right-col mb-xl-0 mb-4">
              <div className="row top-icons">
                {salonmodule &&
                  salonmodule.map((module, i) => {
                    let isCheckAccess = checkaccess({ role_id: role_id, module_id: module.id, controller: module.controller, name: "list", access });
                    if ((module.id === 9 || module.controller === "products") && isCheckAccess === false) {
                      isCheckAccess = checkaccess({ role_id: role_id, controller: "suppliers", name: "list", access });
                    }

                    if ((module.id === 7 || module.controller === "staff") && isCheckAccess === false) {
                      isCheckAccess = checkaccess({ role_id: role_id, controller: "pricetiers", name: "list", access });
                      if (isCheckAccess === false) {
                        isCheckAccess = checkaccess({ role_id: role_id, controller: "roster", name: "list", access });
                      }
                    }

                    if ((module.id === 8 || module.controller === "services") && isCheckAccess === false) {
                      isCheckAccess = checkaccess({ role_id: role_id, controller: "categories", name: "list", access });
                    }
                    if (isCheckAccess) {
                      if (module.controller === "calendar" || module.controller === "clients" || module.controller === "services" || module.controller === "products" || module.controller === "vouchers" || module.controller === "membership" || module.controller === "subscriptions" || module.controller === "reports") {
                        let imgModule = "";
                        if (module.controller === "calendar") {
                          imgModule = "calendarbold.png";
                        }
                        if (module.controller === "clients") {
                          imgModule = "userGroup.png";
                        }
                        if (module.controller === "services") {
                          imgModule = "SERVICESICON.png";
                        }
                        if (module.controller === "products") {
                          imgModule = "PRODUCTSICON.png";
                        }
                        if (module.controller === "vouchers") {
                          imgModule = "VOUCHERICON.png";
                        }
                        if (module.controller === "membership") {
                          imgModule = "star.png";
                        }
                        if (module.controller === "subscriptions") {
                          imgModule = "SUBSCRIPTIONICON.png";
                        }
                        if (module.controller === "reports") {
                          imgModule = "resports.png";
                        }
                        return (
                          <div className="box-col col-auto mb-md-4 mb-3" key={i}>
                            <div className="box-common text-center bg-white px-1 pt-4 pb-3 d-flex flex-column justify-content-between">
                              <NavLink to={config.basePath + "/" + module.controller} data-bs-toggle="tooltip" data-bs-placement="right" title={t(module.title)} className="mb-2">
                                <div className="mb-2">
                                  <img src={config.imagepath + imgModule} alt="" />
                                </div>
                                <span className="d-block fw-semibold">{t(module.title)}</span>
                              </NavLink>
                            </div>
                          </div>
                        );
                      }
                    }
                  })}
              </div>
              <div className="box-common p-md-4 p-3 bg-white mb-md-4 mb-3">
                <div className="row align-items-center">
                  <div className="col-7">
                    <h5 className="fw-semibold">Total Sales</h5>
                  </div>
                  <div className="col-5 text-end">
                    <a href="#" className="btn btn-outline small view-report px-2 py-1">
                      View report
                    </a>
                  </div>
                </div>
                <div className="chat-avg">
                  <h1>
                    <sup>$</sup>82.99
                    <span className="upvalue fw-semibold ms-md-3 ms-2">
                      <i className="far fa-arrow-up me-1"></i>2.6%
                    </span>
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-md-4 mb-3">
                  <div className="box-image-cover w-100 border-0 text-center m-0 p-xxl-4 p-3 pb-xxl-5 pb-md-4 pb-3 h-100">
                    <h5 className="fw-semibold mb-md-4 mb-3">{t("Appointments")}</h5>
                    <div className="user-box">
                      <div className="user-initial mx-auto fw-semibold d-flex align-items-center justify-content-center">
                        <h1 className="mb-0 color-wine fw-semibold">{isDashboard.appointments}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-md-4 mb-3">
                  <div className="box-image-cover w-100 border-0 text-center m-0 p-xxl-4 p-3 pb-xxl-5 pb-md-4 pb-3 h-100">
                    <h5 className="fw-semibold mb-md-4 mb-3">{t("Average Booking Value")}</h5>
                    <div className="user-box">
                      <div className="user-initial mx-auto fw-semibold d-flex align-items-center justify-content-center">
                        <h3 className="mb-0 color-wine fw-semibold">${isDashboard.averageBookingValue}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-md-4 mb-3">
                  <div className="box-image-cover w-100 border-0 text-center m-0 p-xxl-4 p-3 pb-xxl-5 pb-md-4 pb-3 h-100">
                    <h5 className="fw-semibold mb-md-4 mb-3">{t("Number Of Clients")}</h5>
                    <div className="user-box">
                      <div className="user-initial mx-auto fw-semibold d-flex align-items-center justify-content-center">
                        <h1 className="mb-0 color-wine fw-semibold">{isDashboard.numberofClients}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-md-4 mb-3">
                  <div className="box-image-cover w-100 border-0 text-center m-0 p-xxl-4 p-3 pb-xxl-5 pb-md-4 pb-3 h-100">
                    <h5 className="fw-semibold mb-md-4 mb-3">{t("Number Of New Clients")}</h5>
                    <div className="user-box">
                      <div className="user-initial mx-auto fw-semibold d-flex align-items-center justify-content-center">
                        <h1 className="mb-0 color-wine fw-semibold">{isDashboard.numberofNewClients}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
