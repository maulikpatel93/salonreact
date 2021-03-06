import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import config from "../../config";
import { checkaccess, ucfirst } from "helpers/Functions";
import { ClientSearchName, ClientSearchObj, CloseClientSearchList, OpenAddClientForm } from "../../store/slices/clientSlice";
import { busytimeDetailApi, busytimeListViewApi, closeAddBusytimeForm, closeEditBusytimeForm, openAddBusytimeForm, openEditBusytimeForm } from "store/slices/busytimeSlice";
import { appointmentDetailApi, appointmentListViewApi, closeAddAppointmentForm, closeAppointmentDetailModal, closeEditAppointmentForm, closeRescheduleAppointmentForm, openAddAppointmentForm, openAppointmentDetailModal } from "store/slices/appointmentSlice";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import AppointmentAddForm from "./Form/AppointmentAddForm";
import BusytimeAddForm from "./Form/BusytimeAddForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { staffOptions, staffOptionsDropdown } from "store/slices/staffSlice";
//Calender
// import { Tooltip } from "bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DatePicker from "react-multi-date-picker";
import FullCalendar from "@fullcalendar/react";
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
// import rrulePlugin from "@fullcalendar/rrule";
import moment from "moment";
import { calendarTabDayView, calendarTabWeekView, calendarRangeInfo, calendarStaffList, calendarResetStaffFilter, calendarStaffFilter } from "store/slices/calendarSlice";
import { openAddSaleForm } from "store/slices/saleSlice";
import AppointmentEditForm from "./Form/AppointmentEditForm";
import AppointmentRescheduleForm from "./Form/AppointmentRescheduleForm";
import AppointmentDetailDrawer from "./AppointmentDetailDrawer";
import BusytimeEditForm from "./Form/BusytimeEditForm";
import SaleDrawer from "pages/sales/SaleDrawer";
import SaleCompleted from "pages/sales/Drawer/SaleCompleted";
// import InfiniteScroll from "react-infinite-scroll-component";
// import PaginationLoader from "component/PaginationLoader";

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
  const working_hours = currentUser.salon && currentUser.salon.working_hours;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const saleIsOpenedAddForm = useSelector((state) => state.sale.isOpenedAddForm);
  const clientIsOpenedAddForm = useSelector((state) => state.client.isOpenedAddForm);
  const appointmentIsOpenedAddForm = useSelector((state) => state.appointment.isOpenedAddForm);
  const appointmentIsOpenedEditForm = useSelector((state) => state.appointment.isOpenedEditForm);
  const appointmentIsOpenedRescheduleForm = useSelector((state) => state.appointment.isOpenedRescheduleForm);
  const appointmentIsOpenedDetailModal = useSelector((state) => state.appointment.isOpenedDetailModal);
  const busytimeIsOpenedAddForm = useSelector((state) => state.busytime.isOpenedAddForm);
  const busytimeIsOpenedEditForm = useSelector((state) => state.busytime.isOpenedEditForm);
  const dateAppointmentListView = useSelector((state) => state.appointment.isListView);
  const dateBusytimeListView = useSelector((state) => state.busytime.isListView);
  const isStaffOptionDropdown = useSelector((state) => state.staff.isStaffOptionDropdown);
  const isCalendarStaffList = useSelector((state) => state.calendar.isCalendarStaffList);
  const isRangeInfo = useSelector((state) => state.calendar.isRangeInfo);
  const calendarTab = useSelector((state) => state.calendar.isTabView);
  const isStaffFilter = useSelector((state) => state.calendar.isStaffFilter);
  const isOpenedSaleCompleted = useSelector((state) => state.sale.isOpenedSaleCompleted);

  useEffect(() => {
    dispatch(staffOptionsDropdown({ dropdown: true }));
    dispatch(calendarStaffList());
    if (isStaffFilter) {
      dispatch(calendarRangeInfo({ ...isRangeInfo, staff_id: isStaffFilter && isStaffFilter.id }));
      //dispatch(appointmentListViewApi({ ...isRangeInfo, staff_id: isStaffFilter && isStaffFilter.id }));
    }
    //dispatch(calendarResetStaffFilter());
  }, []);

  const MergeListview = [...dateAppointmentListView, ...dateBusytimeListView];
  const events = [];
  const staffs = [];
  const resources = [];
  const businessHours = [];
  MergeListview &&
    Object.keys(MergeListview).map((item) => {
      let listview = MergeListview[item].listview;
      let id = MergeListview[item].id;
      let dateof = MergeListview[item].dateof;
      let showdate = MergeListview[item].showdate;
      let start_time = MergeListview[item].start_time && MergeListview[item].start_time;
      let end_time = MergeListview[item].end_time && MergeListview[item].end_time;
      let status = MergeListview[item].status;
      let staff = MergeListview[item].staff;
      let sale = MergeListview[item].sale;
      staffs.push(staff);
      if (listview === "Appointment") {
        let service = MergeListview[item].service && MergeListview[item].service;
        let client = MergeListview[item].client && MergeListview[item].client;
        let title = client && client.first_name + " " + client.last_name;
        let backgroundColor = "#8f807d";
        let borderColor = "#8f807d";
        if (status === "Scheduled") {
          backgroundColor = "#8f807d";
          borderColor = "#8f807d";
        } else if (status === "Confirmed") {
          backgroundColor = "#ecd078";
          borderColor = "#ecd078";
        } else if (status === "Cancelled") {
          backgroundColor = "#c02942";
          borderColor = "#c02942";
        }
        if (sale && sale.status === "Paid") {
          backgroundColor = "#59ba41";
          borderColor = "#59ba41";
        }
        events.push({
          resourceId: staff.id,
          start: showdate + "T" + start_time,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          title: title,
          extendedProps: {
            listview: listview,
            appointment: { id, status },
            client: client,
            service: service,
            staff: staff,
          },
        });
      } else if (listview === "BusyTime") {
        let reason = MergeListview[item].reason;
        // let repeats = MergeListview[item].repeats;
        // let repeat_time = MergeListview[item].repeat_time;
        // let repeat_time_option = MergeListview[item].repeat_time_option;
        // let ending = MergeListview[item].ending;
        // let dateof = MergeListview[item].dateof;
        let showdate = MergeListview[item].showdate;
        events.push({
          resourceId: staff.id,
          start: showdate + "T" + start_time,
          end: showdate + "T" + end_time,
          backgroundColor: "#A2A7AE",
          borderColor: "#A2A7AE",
          title: t("Busy Time"),
          extendedProps: {
            listview: listview,
            busytime: { id, reason },
            staff: staff,
          },
        });
        // console.log(isRangeInfo);
        // if (repeats === "Yes" && repeat_time && repeat_time_option) {
        //   let endingRule = "";
        //   if (ending) {
        //     endingRule = {
        //       freq: repeat_time_option,
        //       interval: repeat_time,
        //       dtstart: dateof + "T" + start_time,
        //       until: ending,
        //     };
        //   } else {
        //     endingRule = {
        //       freq: repeat_time_option,
        //       interval: repeat_time,
        //       dtstart: dateof + "T" + start_time,
        //     };
        //   }
        //   events.push({
        //     resourceId: staff.id,
        //     groupId: id,
        //     backgroundColor: "#A2A7AE",
        //     borderColor: "#A2A7AE",
        //     title: t("Busy Time"),
        //     rrule: endingRule,
        //     exrule: {
        //       // will also accept an array of these objects
        //       freq: repeat_time_option,
        //       dtstart: moment(isRangeInfo.start_date).format("YYYY-MM-DD"),
        //       until: moment(isRangeInfo.end_date).format("YYYY-MM-DD"),
        //     },
        //     extendedProps: {
        //       listview: listview,
        //       busytime: { id, reason },
        //       staff: staff,
        //     },
        //   });
        // } else {
        //   events.push({
        //     resourceId: staff.id,
        //     start: showdate + "T" + start_time,
        //     end: showdate + "T" + end_time,
        //     backgroundColor: "#A2A7AE",
        //     borderColor: "#A2A7AE",
        //     title: t("Busy Time"),
        //     extendedProps: {
        //       listview: listview,
        //       busytime: { id, reason },
        //       staff: staff,
        //     },
        //   });
        // }
      }
    });
  // const uniquestaff = uniqueArrayofObject(staffs, ["id"]);
  // const uniquestaff = isStaffList && isStaffList.data;
  const uniquestaff = Array.isArray(isCalendarStaffList) === false ? [isCalendarStaffList] : isCalendarStaffList;
  uniquestaff &&
    Object.keys(uniquestaff).map((item) => {
      let id = uniquestaff[item].id;
      let first_name = uniquestaff[item].first_name;
      let last_name = uniquestaff[item].last_name;
      let profile_photo_url = uniquestaff[item].profile_photo_url;
      let profile_photo_content = profile_photo_url ? '<img class="" src="' + profile_photo_url + '" alt=""/>' : '<div class="user-initial">' + first_name.charAt(0) + "" + last_name.charAt(0) + "</div>";
      // resources.push({ id: id, title: first_name + " " + last_name });
      resources.push({
        id: id,
        html: '<div class="calenderProfileImg">' + profile_photo_content + '<div class="image-content">' + first_name + " " + last_name + "</div></div>",
      });
    });

  working_hours &&
    Object.keys(working_hours).map((item) => {
      let dayoff = working_hours[item].dayoff;
      let days = working_hours[item].days;
      let start_time = working_hours[item].start_time;
      let end_time = working_hours[item].end_time;
      if (dayoff === "1") {
        businessHours.push({
          daysOfWeek: [moment().day(days).days()],
          startTime: start_time,
          endTime: end_time,
        });
      }
    });
  const handleBusytimeDrawer = () => {
    dispatch(openAddBusytimeForm());
    dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
  };
  const handleAppointmentDrawer = () => {
    dispatch(openAddAppointmentForm());
    dispatch(ClientSearchName(""));
    dispatch(CloseClientSearchList());
    dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
    // dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
  };
  const handleClientDrawer = () => {
    dispatch(OpenAddClientForm());
  };
  const handleSaleDrawer = () => {
    dispatch({ type: "sale/reset" });
    dispatch(ClientSearchName(""));
    dispatch(ClientSearchObj(""));
    dispatch(openAddSaleForm());
  };

  const renderEventContent = (eventInfo) => {
    if (eventInfo.event) {
      let listview = eventInfo.event.extendedProps && eventInfo.event.extendedProps.listview;
      let staff = eventInfo.event.extendedProps && eventInfo.event.extendedProps.staff;
      let client = eventInfo.event.extendedProps && eventInfo.event.extendedProps.client;
      let service = eventInfo.event.extendedProps && eventInfo.event.extendedProps.service;
      if (listview === "Appointment" && client && service && staff) {
        let status = eventInfo.event.extendedProps && eventInfo.event.extendedProps.appointment && eventInfo.event.extendedProps.appointment.status;
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
                <li className={status === "Confirmed" ? "text-dark" : ""}>
                  <b>{eventInfo.event.title}</b>
                </li>
                <li className={status === "Confirmed" ? "text-dark" : ""}>{eventInfo.view && eventInfo.view.type === "timeGridWeek" ? t("{{service}} with {{staff}}", { service: service.name, staff: ucfirst(staff.first_name + " " + staff.last_name) }) : service.name}</li>
                <li className={status === "Confirmed" ? "text-dark align-self-center" : "align-self-center"}>
                  <i className="far fa-clock me-1"></i> <b>{eventInfo.timeText}</b>
                </li>
              </ul>
            </OverlayTrigger>
          </>
        );
      } else if (listview === "BusyTime" && staff) {
        let reason = eventInfo.event.extendedProps && eventInfo.event.extendedProps.busytime && eventInfo.event.extendedProps.busytime.reason;
        let popover = `<div class="text-start">${eventInfo.event.title}<br>${reason} <br><i class="far fa-clock me-1"></i> ${eventInfo.timeText}`;
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
                <li className={""}>
                  <b>{eventInfo.event.title}</b>
                </li>
                <li className={""}>{reason}</li>
                <li className={"align-self-center"}>
                  <i className="far fa-clock me-1"></i> <b>{eventInfo.timeText}</b>
                </li>
              </ul>
            </OverlayTrigger>
          </>
        );
      }
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
    dispatch(calendarRangeInfo({ start_date: rangeInfo.startStr, end_date: rangeInfo.endStr, timezone: timezone, type: type, staff_id: isStaffFilter && isStaffFilter.id }));
    dispatch(appointmentListViewApi({ start_date: rangeInfo.startStr, end_date: rangeInfo.endStr, timezone: timezone, type: type, staff_id: isStaffFilter && isStaffFilter.id }));
    dispatch(busytimeListViewApi({ start_date: rangeInfo.startStr, end_date: rangeInfo.endStr, timezone: timezone, type: type, staff_id: isStaffFilter && isStaffFilter.id }));
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
    dispatch(closeAddBusytimeForm());
    dispatch(closeEditBusytimeForm());
    dispatch(closeAddAppointmentForm());
    dispatch(closeEditAppointmentForm());
    dispatch(closeRescheduleAppointmentForm());
    dispatch(closeAppointmentDetailModal());
    someMethod();
  }

  function handleClickWeek() {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek");
    dispatch(calendarTabWeekView());
    someMethod();
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event && clickInfo.event.extendedProps) {
      let listview = clickInfo.event.extendedProps.listview && clickInfo.event.extendedProps.listview;
      let showdate = moment(clickInfo.event.start).format("YYYY-MM-DD");
      if (listview === "Appointment") {
        let id = clickInfo.event.extendedProps.appointment && clickInfo.event.extendedProps.appointment.id;
        let client_id = clickInfo.event.extendedProps.client && clickInfo.event.extendedProps.client.id;
        dispatch(closeAddAppointmentForm());
        dispatch(closeAddBusytimeForm());
        dispatch(closeEditBusytimeForm());
        dispatch(appointmentDetailApi({ id, client_id, showdate: showdate })).then((action) => {
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
      } else if (listview === "BusyTime") {
        let id = clickInfo.event.extendedProps.busytime && clickInfo.event.extendedProps.busytime.id;
        dispatch(closeAddAppointmentForm());
        dispatch(closeEditAppointmentForm());
        dispatch(closeRescheduleAppointmentForm());
        dispatch(closeAppointmentDetailModal());
        dispatch(closeAddBusytimeForm());
        dispatch(busytimeDetailApi({ id, showdate: showdate })).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            dispatch(openEditBusytimeForm());
            dispatch(staffOptions({ option: { valueField: "id", labelField: "CONCAT(last_name,' ',first_name)" } }));
          } else if (action.meta.requestStatus === "rejected") {
            if (action.payload.status === 422) {
              let error = action.payload;
              const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
              sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
            }
          }
        });
      }

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

  function handleEventAdd() {
    // this.props.createEvent(addInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   addInfo.revert();
    // });
  }

  function handleEventChange() {
    // this.props.updateEvent(changeInfo.event.toPlainObject()).catch(() => {
    //   reportNetworkError();
    //   changeInfo.revert();
    // });
  }

  function handleEventRemove() {
    // this.props.deleteEvent(removeInfo.event.id).catch(() => {
    //   reportNetworkError();
    //   removeInfo.revert();
    // });
  }

  function handleDateSelect(selectInfo) {
    let calendarApi = selectInfo.view.calendar;
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
        let weekpicker = calendarApi.view.title.split(" ??? ");
        setSelectedDateRange(weekpicker);
        setSelectedType("week");
      }
    }
  }

  const getselectedDatePicker = selectedDate;
  const getselectedDatePickerRange = selectedDateRange;

  let handlePrintContent = () => {
    var printContents = document.getElementById("calendarsection").innerHTML;
    console.log(printContents);
    var winprint = window.open("", "_blank");
    winprint.document.open();
    winprint.document.write("<html>");
    winprint.document.write(`<title>Print Calender</title><head><style></style>`);
    winprint.document.write('</head><body onload="window.focus(); window.print(); window.close()"><h4>Calender</h4>');
    winprint.document.write(printContents);
    winprint.document.write("</body></html>");
    winprint.document.close();
    winprint.focus();
  };
  return (
    <>
      <div className="page-content">
        <section className="calendar">
          <div className="calendar-header sticky-top bg-white">
            <div className="container" id="calendarsection">
              <div className="row">
                <div className="col-sm-auto col-12 pt-lg-4 pt-md-3 pt-2">
                  <div className="dropdown staff-dropdown">
                    <div className="btn-group w-100">
                      <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {isStaffFilter ? isStaffFilter.name : t("All Staff")}
                      </button>
                      <span
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch(calendarResetStaffFilter());
                          dispatch(calendarRangeInfo({ ...isRangeInfo, staff_id: "" }));
                          dispatch(calendarStaffList());
                          dispatch(appointmentListViewApi({ ...isRangeInfo, staff_id: "" }));
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
                                      dispatch(calendarStaffFilter({ id, name }));
                                      dispatch(calendarRangeInfo({ ...isRangeInfo, staff_id: id }));
                                      dispatch(calendarStaffList({ id }));
                                      dispatch(appointmentListViewApi({ ...isRangeInfo, staff_id: id }));
                                      // let dateYMD = moment(isRangeInfo.start_date).format("YYYY-MM-DD");
                                      // let calendarApi = calendarRef.current.getApi();
                                      // calendarApi.gotoDate(dateYMD);
                                      // dispatch(rosterListViewApi({ id }));
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
                  <a className="btn btn-secondary me-1 print-img cursor-pointer" onClick={handlePrintContent}>
                    <img src={config.imagepath + "print.png"} alt="" />
                  </a>
                  <div className="dropdown d-inline-block create-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none btn btn-primary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fal fa-plus"></i>
                      {t("Create")}
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
                        {checkaccess({ name: "create", role_id: role_id, controller: "sale", access }) && (
                          <li>
                            <a id="addsale-drawer-link" className="d-flex align-items-center cursor-pointer" onClick={handleSaleDrawer}>
                              {t("Add Sale")}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            {/* <InfiniteScroll className="row" dataLength={isStaffList.data && isStaffList.data.length ? isStaffList.data.length : "0"} next={fetchDataGrid} scrollableTarget="fc-timegrid-body" hasMore={calendarTab && calendarTab === "day" && isStaffList.next_page_url ? true : false} loader={<PaginationLoader />}> */}
            <FullCalendar
              ref={calendarRef}
              schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
              plugins={[scrollGridPlugin, momentPlugin, resourceTimeGridPlugin, interactionPlugin]}
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
              slotLabelInterval="60"
              slotMinutes="60"
              snapDuration="01:00:00"
              slotDuration={"00:15:00"}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
              }}
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }}
              businessHours={businessHours}
              height="auto"
              dayMinWidth={calendarTab && calendarTab === "week" ? "100" : "300"}
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
              resourceLabelClassNames={function () {
                // let staff_id = isStaffFilter && isStaffFilter.id;
                // if (arg.resource.id == staff_id) {
                //   return ["active"];
                // } else {
                //   return [];
                // }
                return [];
              }}
            />
            {/* </InfiniteScroll> */}
          </div>
        </section>
        {checkaccess({ name: "view", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedDetailModal ? <AppointmentDetailDrawer isRangeInfo={isRangeInfo} /> : ""}
        {checkaccess({ name: "update", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedEditForm ? <AppointmentEditForm isRangeInfo={isRangeInfo} page={"calendar"} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedAddForm ? <AppointmentAddForm isRangeInfo={isRangeInfo} /> : ""}
        {checkaccess({ name: "reschedule", role_id: role_id, controller: "appointment", access }) && appointmentIsOpenedRescheduleForm ? <AppointmentRescheduleForm isRangeInfo={isRangeInfo} page={"calendar"} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "busytime", access }) && busytimeIsOpenedAddForm ? <BusytimeAddForm isRangeInfo={isRangeInfo} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "busytime", access }) && busytimeIsOpenedEditForm ? <BusytimeEditForm isRangeInfo={isRangeInfo} page={"calendar"} /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && clientIsOpenedAddForm ? <ClientAddForm /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "sale", access }) && saleIsOpenedAddForm ? <SaleDrawer isRangeInfo={isRangeInfo} page={"calendar"} /> : ""}

        {isOpenedSaleCompleted && <SaleCompleted />}
      </div>
    </>
  );
};

export default Calendar;
