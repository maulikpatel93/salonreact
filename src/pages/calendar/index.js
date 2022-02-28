import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import config from "../../config";
import { checkaccess, ucfirst, uniqueArrayofObject } from "helpers/functions";
import { clientSearchName, closeClientSearchList, openAddClientForm } from "../../store/slices/clientSlice";
import { openAddBusytimeForm } from "store/slices/busytimeSlice";
import { appointmentDetailApi, appointmentListViewApi, closeAddAppointmentForm, openAddAppointmentForm, openAppointmentDetailModal, openEditAppointmentForm } from "store/slices/appointmentSlice";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import AppointmentAddForm from "./Form/AppointmentAddForm";
import BusytimeAddForm from "./Form/BusytimeAddForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { staffOptions } from "store/slices/staffSlice";
//Calender
// import { Tooltip } from "bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DatePicker from "react-multi-date-picker";
import FullCalendar from "@fullcalendar/react";
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import moment from "moment";
import { calendarTabDayView, calendarTabWeekView, calendarRangeInfo } from "store/slices/calendarSlice";
import AppointmentEditForm from "./Form/AppointmentEditForm";
import AppointmentDetailDrawer from "./AppointmentDetailDrawer";
const Calendar = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calendarRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [selectedType, setSelectedType] = useState("day");

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const clientIsOpenedAddForm = useSelector((state) => state.client.isOpenedAddForm);
  const appointmentIsOpenedAddForm = useSelector((state) => state.appointment.isOpenedAddForm);
  const appointmentIsOpenedEditForm = useSelector((state) => state.appointment.isOpenedEditForm);
  const appointmentIsOpenedDetailModal = useSelector((state) => state.appointment.isOpenedDetailModal);
  const busytimeIsOpenedAddForm = useSelector((state) => state.busytime.isOpenedAddForm);
  const dateAppointmentListView = useSelector((state) => state.appointment.isListView);
  const isRangeInfo = useSelector((state) => state.calendar.isRangeInfo);
  const calendarTab = useSelector((state) => state.calendar.isTabView);

  const events = [];
  const clients = [];
  const resources = [];
  dateAppointmentListView &&
    Object.keys(dateAppointmentListView).map((item) => {
      // console.log(dateAppointmentListView[item]);
      let id = dateAppointmentListView[item].id;
      let date = dateAppointmentListView[item].date;
      let start_time = dateAppointmentListView[item].start_time;
      let status = dateAppointmentListView[item].status;
      let client = dateAppointmentListView[item].client;
      let service = dateAppointmentListView[item].service;
      let staff = dateAppointmentListView[item].staff;
      let client_name = client.first_name + " " + client.last_name;
      clients.push(client);
      events.push({
        resourceId: client.id,
        start: date + "T" + start_time,
        backgroundColor: "#8f807d",
        borderColor: "#8f807d",
        title: client_name,
        extendedProps: {
          appointment: { id, status },
          client: client,
          service: service,
          staff: staff,
        },
      });
    });
  const uniqueclients = uniqueArrayofObject(clients, ["id"]);
  uniqueclients &&
    Object.keys(uniqueclients).map((item) => {
      let id = uniqueclients[item].id;
      let first_name = uniqueclients[item].first_name;
      let last_name = uniqueclients[item].last_name;
      let profile_photo_url = uniqueclients[item].profile_photo_url;
      let profile_photo_content = profile_photo_url ? '<img class="" src="' + profile_photo_url + '" alt=""/>' : '<div class="user-initial">' + first_name.charAt(0) + "" + last_name.charAt(0) + "</div>";
      // resources.push({ id: id, title: first_name + " " + last_name });
      resources.push({ id: id, html: '<div class="calenderProfileImg">' + profile_photo_content + '<div class="image-content">' + first_name + " " + last_name + "</div></div>" });
    });
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

  const renderEventContent = (eventInfo) => {
    let client = eventInfo.event.extendedProps && eventInfo.event.extendedProps.client;
    let service = eventInfo.event.extendedProps && eventInfo.event.extendedProps.service;
    let staff = eventInfo.event.extendedProps && eventInfo.event.extendedProps.staff;
    if (client && service && staff) {
      let popover = `<div class="text-start">${eventInfo.event.title}<br>${t("{{service_name}} with {{staff_name}}", { service_name: service.name, staff_name: ucfirst(staff.first_name + " " + staff.last_name) })} <br><i class="far fa-clock me-1"></i> ${eventInfo.timeText}`;
      return (
        <>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
              <Tooltip id="Description__tooltip" {...props}>
                <div dangerouslySetInnerHTML={{ __html: popover }} />
              </Tooltip>
            )}
          >
            <ul className="list-unstyled p-2 calendar_event_content cursor-pointer">
              <li className="">
                <b>{eventInfo.event.title}</b>
              </li>
              <li className="">{t("{{service_name}} with {{staff_name}}", { service_name: service.name, staff_name: ucfirst(staff.first_name + " " + staff.last_name) })}</li>
              <li className="align-self-center">
                <i className="far fa-clock me-1"></i> <b>{eventInfo.timeText}</b>
              </li>
            </ul>
          </OverlayTrigger>
        </>
      );
    }
    return (
      <>
        <b>{eventInfo.timeText}</b>
      </>
    );
  };

  function handleDates(rangeInfo) {
    let timezone = rangeInfo.view && rangeInfo.view.dateEnv && rangeInfo.view.dateEnv.timeZone;
    let type = calendarTab;
    if (rangeInfo.view && rangeInfo.view.type === "resourceTimeGridDay") {
      type = "day";
    } else if (rangeInfo.view && rangeInfo.view.type === "timeGridWeek") {
      type = "week";
    }
    dispatch(appointmentListViewApi({ start_date: rangeInfo.startStr, end_date: rangeInfo.endStr, timezone: timezone, type: type })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(calendarRangeInfo({ start_date: rangeInfo.startStr, end_date: rangeInfo.endStr, timezone: timezone, type: type }));
      } else if (action.meta.requestStatus === "rejected") {
        if (action.payload.status === 422) {
        }
      }
    });
  }

  function handleClickPrev() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    someMethod();
  }

  function handleClickNext() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    someMethod();
  }

  function handleClickToday() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.today();
    someMethod();
  }

  function handleClickDay() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("resourceTimeGridDay");
    dispatch(calendarTabDayView());
    someMethod();
  }

  function handleClickWeek() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek");
    dispatch(calendarTabWeekView());
    someMethod();
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event.extendedProps) {
      let id = clickInfo.event.extendedProps.appointment && clickInfo.event.extendedProps.appointment.id;
      let status = clickInfo.event.extendedProps.appointment && clickInfo.event.extendedProps.appointment.status;
      let client_id = clickInfo.event.extendedProps.client && clickInfo.event.extendedProps.client.id;
      dispatch(closeAddAppointmentForm());
      dispatch(appointmentDetailApi({ id, client_id })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(openAppointmentDetailModal());
        } else if (action.meta.requestStatus === "rejected") {
          if (action.payload.status === 422) {
            let error = action.payload;
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
          }
        }
      });
      // if (status === "Scheduled") {
      //   dispatch(appointmentDetailApi({ id, client_id })).then((action) => {
      //     if (action.meta.requestStatus === "fulfilled") {
      //       dispatch(openEditAppointmentForm());
      //       dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
      //       dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
      //     } else if (action.meta.requestStatus === "rejected") {
      //       if (action.payload.status === 422) {
      //         let error = action.payload;
      //         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      //         sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
      //       }
      //     }
      //   });
      // }
    }
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove(); // will render immediately. will call handleEventRemove
    // }
  }

  function handleEventAdd(addInfo) {
    // this.props.createEvent(addInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   addInfo.revert();
    // });
  }

  function handleEventChange(changeInfo) {
    // this.props.updateEvent(changeInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   changeInfo.revert();
    // });
  }

  function handleEventRemove(removeInfo) {
    // this.props.deleteEvent(removeInfo.event.id).catch(() => {
    //   reportNetworkError();
    //   removeInfo.revert();
    // });
  }

  function handleDateSelect(selectInfo) {
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
  }

  useEffect(() => {
    someMethod();
  }, []);

  function someMethod() {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      if (calendarApi.view.type === "resourceTimeGridDay") {
        setSelectedDate(calendarApi.view.title);
        setSelectedType("day");
      } else if (calendarApi.view.type === "timeGridWeek") {
        let weekpicker = calendarApi.view.title.split(" – ");
        setSelectedDateRange(weekpicker);
        setSelectedType("week");
      }
    }
  }
  const getselectedDatePicker = selectedDate;
  const getselectedDatePickerRange = selectedDateRange;
  function reportNetworkError() {
    alert("This action could not be completed");
  }
  return (
    <>
      <div className="page-content">
        <section className="calendar">
          <div className="calendar-header sticky-top bg-white">
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
                      <span className="input-group-text icon cursor-pointer" onClick={handleClickPrev}>
                        <i className="fal fa-chevron-left"></i>
                      </span>
                      {selectedType === "day" ? (
                        <DatePicker
                          value={getselectedDatePicker}
                          inputClass="form-control"
                          id="datepicker"
                          placeholder="August 19, 2021"
                          format={"MMMM DD, YYYY"}
                          onChange={(e) => {
                            let date = moment(e?.toDate?.().toString()).format("MMMM DD, YYYY");
                            let dateYMD = moment(e?.toDate?.().toString()).format("YYYY-MM-DD");
                            setSelectedDate(date);
                            let calendarApi = calendarRef.current.getApi();
                            calendarApi.gotoDate(dateYMD);
                          }}
                        />
                      ) : (
                        <DatePicker
                          value={getselectedDatePickerRange}
                          inputClass="form-control"
                          id="datepicker"
                          range
                          weekPicker
                          format={"MMM DD, YYYY"}
                          onChange={(dateObjects) => {
                            let start_date = moment(dateObjects[0]?.toDate?.().toString()).format("MMM DD, YYYY");
                            let end_date = moment(dateObjects[1]?.toDate?.().toString()).format("MMM DD, YYYY");
                            let dateYMD = moment(dateObjects[0]?.toDate?.().toString()).format("YYYY-MM-DD");
                            setSelectedDateRange(dateObjects);
                            let calendarApi = calendarRef.current.getApi();
                            calendarApi.gotoDate(dateYMD);
                          }}
                        />
                      )}
                      <span className="input-group-text day cursor-pointer" onClick={handleClickToday}>
                        {t("Today")}
                      </span>
                      <span className="input-group-text icon cursor-pointer" onClick={handleClickNext}>
                        <i className="fal fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2">
                  <div className="list-group custom-tab mb-sm-0 mb-2" id="myList" role="tablist">
                    <a className={"list-group-item list-group-item-action cursor-pointer" + (calendarTab && calendarTab === "day" ? " active" : "")} onClick={handleClickDay}>
                      {t("Day")}
                    </a>
                    <a className={"list-group-item list-group-item-action cursor-pointer" + (calendarTab && calendarTab === "week" ? " active" : "")} onClick={handleClickWeek}>
                      {t("Week")}
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
          <div className="container mt-4">
            <FullCalendar
              ref={calendarRef}
              schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
              plugins={[momentPlugin, resourceTimeGridPlugin, interactionPlugin]}
              headerToolbar={false}
              buttonText={{ today: t("Today"), week: t("Week"), day: t("Day") }}
              initialView={calendarTab && calendarTab === "week" ? "timeGridWeek" : "resourceTimeGridDay"}
              views={{
                week: {
                  titleFormat: "MMMM D, YYYY",
                  dayHeaderFormat: "DD ddd",
                },
              }}
              formatRange={false}
              slotDuration={"00:15:00"}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
              }}
              height="auto"
              nowIndicator={true}
              allDaySlot={false}
              editable={true}
              eventStartEditable={false}
              eventDurationEditable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              // weekends={props.weekendsVisible}
              datesSet={handleDates}
              select={handleDateSelect}
              events={events}
              resources={resources}
              // eventDidMount={function (eventInfo, element) {
              //   console.log(element);
              //   let client = eventInfo.event.extendedProps && eventInfo.event.extendedProps.client;
              //   let service = eventInfo.event.extendedProps && eventInfo.event.extendedProps.service;
              //   let staff = eventInfo.event.extendedProps && eventInfo.event.extendedProps.staff;
              //   let description = "";
              //   if (client && service && staff) {
              //     description = `<div class="text-start">${eventInfo.event.title}<br>${t("{{service_name}} with {{staff_name}}", { service_name: service.name, staff_name: ucfirst(staff.first_name + " " + staff.last_name) })} <br><i class="far fa-clock me-1"></i> ${eventInfo.timeText}`;
              //   }
              //   var tooltip = (props) => (
              //     <Tooltip id="button-tooltip" {...props}>
              //       {description}
              //     </Tooltip>
              //   )
              //   // var tooltip = new Tooltip(eventInfo.el, {
              //   //   title: description,
              //   //   // placement: "bottom",
              //   //   trigger: "hover",
              //   //   container: false,
              //   //   html: true,
              //   // });
              // }}
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
          </div>
        </section>
        {checkaccess({ name: "view", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedDetailModal ? <AppointmentDetailDrawer isRangeInfo={isRangeInfo} /> : ""}
        {checkaccess({ name: "update", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedEditForm ? <AppointmentEditForm isRangeInfo={isRangeInfo} page={"calendar"} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedAddForm ? <AppointmentAddForm isRangeInfo={isRangeInfo} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "busytime", access }) && busytimeIsOpenedAddForm ? <BusytimeAddForm /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && clientIsOpenedAddForm ? <ClientAddForm /> : ""}
      </div>
    </>
  );
};

export default Calendar;
