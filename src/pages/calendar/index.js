import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import config from "../../config";
import { checkaccess } from "helpers/functions";
import { clientSearchName, closeClientSearchList, openAddClientForm } from "../../store/slices/clientSlice";
import { openAddBusytimeForm } from "store/slices/busytimeSlice";
import { openAddAppointmentForm } from "store/slices/appointmentSlice";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import AppointmentAddForm from "./Form/AppointmentAddForm";
import BusytimeAddForm from "./Form/BusytimeAddForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { staffOptions } from "store/slices/staffSlice";

const Calendar = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const clientIsOpenedAddForm = useSelector((state) => state.client.isOpenedAddForm);
  const appointmentIsOpenedAddForm = useSelector((state) => state.appointment.isOpenedAddForm);
  const busytimeIsOpenedAddForm = useSelector((state) => state.busytime.isOpenedAddForm);

  const handleBusytimeDrawer = () => {
    dispatch(openAddBusytimeForm());
    dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
  };
  const handleAppointmentDrawer = () => {
    dispatch(openAddAppointmentForm());
    dispatch(clientSearchName(""));
    dispatch(closeClientSearchList());
    dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
  };
  const handleClientDrawer = () => {
    dispatch(openAddClientForm());
  };
  return (
    <>
      <div className="page-content">
        <section className="calendar">
          <div className="calendar-header">
            <div className="container">
              <div className="row">
                <div className="col-sm-auto col-12 pt-lg-4 pt-md-3 pt-2">
                  <div className="dropdown staff-dropdown">
                    <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      {t("All Staff")}
                    </button>
                    <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath + "Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Whitney Blessing</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath + "Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath + "Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2">
                  <div className="date">
                    <div className="input-group">
                      <span className="input-group-text icon">
                        <i className="fal fa-chevron-left"></i>
                      </span>
                      <input type="text" className="form-control" defaultValue="August 19, 2021" placeholder="date" />
                      <span className="input-group-text day">Today</span>
                      <span className="input-group-text icon">
                        <i className="fal fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2">
                  <div className="list-group custom-tab mb-sm-0 mb-2" id="myList" role="tablist">
                    <a className="list-group-item list-group-item-action active" data-bs-toggle="list" href="#day" role="tab">
                      Day
                    </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#week" role="tab">
                      Week
                    </a>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2 text-end ms-auto">
                  <a href="#" className="btn btn-secondary me-1 print-img" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Print Calendar">
                    <img src={config.imagepath + "print.png"} alt="" />
                  </a>
                  <div className="dropdown d-inline-block create-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none btn btn-primary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fal fa-plus"></i>Create
                    </button>
                    <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                      <ul className="p-0 m-0 list-unstyled">
                        {checkaccess({ name: "create", role_id: role_id, controller: "busytime", access }) && (
                          <li>
                            <a id="addbusytime-drawer-link" className="d-flex align-items-center cursor-pointer" onClick={handleBusytimeDrawer}>
                              {t("Add Busy Time")}
                            </a>
                          </li>
                        )}
                        {checkaccess({ name: "create", role_id: role_id, controller: "appointment", access }) && (
                          <li>
                            <a id="addappoinment-drawer-link" className="d-flex align-items-center cursor-pointer" onClick={handleAppointmentDrawer}>
                              {t("Add Appointment")}
                            </a>
                          </li>
                        )}
                        {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && (
                          <li>
                            <a id="addclient-drawer-link" className="d-flex align-items-center cursor-pointer" onClick={handleClientDrawer}>
                              {t("Add Client")}
                            </a>
                          </li>
                        )}
                        <li>
                          <a id="addsale-drawer-link" className="d-flex align-items-center">
                            {t("Add Sale")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="tab-content py-lg-5 py-3">
              <div className="tab-pane active" id="day" role="tabpanel">
                plugin
              </div>
              <div className="tab-pane" id="week" role="tabpanel">
                plugin............
              </div>
            </div>
          </div>
        </section>
        {checkaccess({ name: "create", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedAddForm ? <AppointmentAddForm /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "busytime", access }) && busytimeIsOpenedAddForm ? <BusytimeAddForm /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && clientIsOpenedAddForm ? <ClientAddForm /> : ""}
      </div>
    </>
  );
};

export default Calendar;
