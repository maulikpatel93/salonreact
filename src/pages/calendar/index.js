import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import config from "../../config";
import { checkaccess, uniqueArrayofObject } from "helpers/functions";
import { clientSearchName, closeClientSearchList, openAddClientForm } from "../../store/slices/clientSlice";
import { openAddBusytimeForm } from "store/slices/busytimeSlice";
import { appointmentListViewApi, openAddAppointmentForm } from "store/slices/appointmentSlice";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import AppointmentAddForm from "./Form/AppointmentAddForm";
import BusytimeAddForm from "./Form/BusytimeAddForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { staffOptions } from "store/slices/staffSlice";
//Calender
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import moment from "moment";

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
  const dateAppointmentListView = useSelector((state) => state.appointment.isListView);

  const events = [];
  const clients = [];
  const resources = [];
  dateAppointmentListView &&
    Object.keys(dateAppointmentListView).map((item) => {
      let id = dateAppointmentListView[item].id;
      let date = dateAppointmentListView[item].date;
      let start_time = dateAppointmentListView[item].start_time;
      let duration = dateAppointmentListView[item].duration;
      let client = dateAppointmentListView[item].client;
      // console.log(dateAppointmentListView[item]);
      // console.log(moment(date + "T" + start_time).format("h:mm a"));
      // resources.push({ id: "a", title: "Room A" });
      clients.push(client);
      events.push({ resourceId: client.id, start: date + "T" + start_time, backgroundColor: "#8f807d", borderColor: "#8f807d" });
    });
  const uniqueclients = uniqueArrayofObject(clients, ["id"]);
  uniqueclients &&
    Object.keys(uniqueclients).map((item) => {
      let id = uniqueclients[item].id;
      let first_name = uniqueclients[item].first_name;
      let last_name = uniqueclients[item].last_name;
      let profile_photo_url = uniqueclients[item].profile_photo_url;
      // resources.push({ id: id, title: first_name + " " + last_name });
      resources.push({ id: id, html: first_name + " <br> " + last_name });
    });

  // const unique = [...new Set(clients.map(item => item.id))];
  // console.log(resources);
  // const events = [
  //   { start: "2022-02-24T12:30:00Z" }, // already in UTC, so won't shift
  //   { start: "2022-02-24T12:30:00+XX:XX" }, // will shift to 00:00 offset
  //   { start: "2022-02-24T12:30:00" }, // will be parsed as if it were '2018-09-01T12:30:00Z'
  // ];

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

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    // console.log(selectInfo);
    // let title = prompt("Please enter a new title for your event");
    calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent(
    //     {
    //       // will render immediately. will call handleEventAdd
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay,
    //     },
    //     true,
    //   ); // temporary=true, will get overwritten when reducer gives new events
    // }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove(); // will render immediately. will call handleEventRemove
    }
  };
  const handleDates = (rangeInfo) => {
    dispatch(appointmentListViewApi({ date: rangeInfo.startStr }));
    // this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr).catch(reportNetworkError);
  };

  const handleEventAdd = (addInfo) => {
    // this.props.createEvent(addInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   addInfo.revert();
    // });
  };

  const handleEventChange = (changeInfo) => {
    // this.props.updateEvent(changeInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   changeInfo.revert();
    // });
  };

  const handleEventRemove = (removeInfo) => {
    // this.props.deleteEvent(removeInfo.event.id).catch(() => {
    //   reportNetworkError();
    //   removeInfo.revert();
    // });
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (plainEventObject) => {
    return (
      <li key={plainEventObject.id}>
        <b>
          {formatDate(plainEventObject.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{plainEventObject.title}</i>
      </li>
    );
  };

  function reportNetworkError() {
    alert("This action could not be completed");
  }
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
            <FullCalendar
              schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
              plugins={[resourceTimeGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridDay,timeGridWeek",
              }}
              buttonText={{ today: t("Today"), week: t("Week"), day: t("Day") }}
              // initialView="timeGridDay"
              initialView="resourceTimeGridDay"
              resources={resources}
              slotDuration={"00:15:00"}
              allDaySlot={false}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // weekends={props.weekendsVisible}
              datesSet={handleDates}
              select={handleDateSelect}
              events={events}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange} // called for drag-n-drop/resize
              eventRemove={handleEventRemove}
              timeZone={currentUser.salon && currentUser.salon.timezone}
              timeFormat={"H:mm"}
              resourceLabelContent={function (arg) {
                return { html: arg.resource.extendedProps.html };
              }}
            />
            {/* <div className="tab-content py-lg-5 py-3">
              <div className="tab-pane active" id="day" role="tabpanel">
                plugin
              </div>
              <div className="tab-pane" id="week" role="tabpanel">
                plugin............
              </div>
            </div> */}
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
