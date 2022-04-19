import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, FieldArray, Field } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, InputFieldImage, SelectField, SwitchField, MapAddressField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
// import { decimalOnly } from "../../../component/form/Validation";
import { ucfirst } from "helpers/functions";
// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeEditStaffForm, staffUpdateApi, addonserviceAction } from "../../../store/slices/staffSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";
import Swal from "sweetalert2";
import moment from "moment";

const StaffEditForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.staff.isOpenedEditForm);

  const detail = useSelector((state) => state.staff.isDetailData);
  const isPriceTierOption = useSelector((state) => state.pricetier.isPriceTierOption);
  const isAddonServices = useSelector((state) => state.staff.isAddonServices);
  // const isWorkingHours = useSelector((state) => state.staff.isWorkingHours);
  const HourList = [
    { days: "Sunday", start_time: "", end_time: "", break_time: [] },
    { days: "Monday", start_time: "", end_time: "", break_time: [] },
    { days: "Tuesday", start_time: "", end_time: "", break_time: [] },
    { days: "Wednesday", start_time: "", end_time: "", break_time: [] },
    { days: "Thursday", start_time: "", end_time: "", break_time: [] },
    { days: "Friday", start_time: "", end_time: "", break_time: [] },
    { days: "Saturday", start_time: "", end_time: "", break_time: [] },
  ];

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const handleCloseEditStaffForm = () => {
    dispatch(closeEditStaffForm());
    dispatch(removeImage());
  };
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    calendar_booking: 0,
    price_tier_id: "",
    add_on_services: [],
    add_on_category: [],
    working_hours: [
      { dayoff: 0, days: "Sunday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 0, days: "Monday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 1, days: "Tuesday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 1, days: "Wednesday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 1, days: "Thursday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 1, days: "Friday", start_time: "", end_time: "", break_time: [] },
      { dayoff: 1, days: "Saturday", start_time: "", end_time: "", break_time: [] },
    ],
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
    last_name: Yup.string().trim().max(50).label(t("Last Name")).required(),
    profile_photo: Yup.mixed(),
    email: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
    phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("Mobile")).required(),
    address: Yup.string().trim().label(t("Address")),
    street: Yup.string().trim().label(t("Street")),
    suburb: Yup.string().trim().label(t("Suburb")),
    state: Yup.string().trim().label(t("State")),
    postcode: Yup.string().trim().max(12).label(t("Postcode")),
    description: Yup.string().trim().label(t("Description")),
    price_tier_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Price Tier")).required())),
    add_on_services: Yup.array(),
    working_hours: Yup.array().of(
      Yup.object().shape({
        days: Yup.string().trim().label(t("days")).required(),
        start_time: Yup.string()
          .trim()
          .nullable()
          .when("dayoff", {
            is: 1,
            then: Yup.string()
              .trim()
              .label(t("Start Time"))
              .required()
              .test("Start Time_test", (value, field) => {
                const { end_time } = field.parent;
                if (end_time !== undefined && value !== undefined) {
                  if (end_time > value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
          }),
        end_time: Yup.string()
          .trim()
          .nullable()
          .when("dayoff", {
            is: 1,
            then: Yup.string()
              .trim()
              .label(t("End Time"))
              .required()
              .test("End Time_test", (value, field) => {
                const { start_time } = field.parent;
                if (start_time !== undefined && value !== undefined) {
                  if (start_time < value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
          }),
        break_time: Yup.array().of(
          Yup.object().shape({
            break_title: Yup.string().trim().label(t("Break Title")).required(),
            break_start_time: Yup.string()
              .trim()
              .label(t("Break Start Time"))
              .required()
              .test("Break Start Time_test", (value, field) => {
                const { break_end_time } = field.parent;
                if (break_end_time !== undefined && value !== undefined) {
                  if (break_end_time > value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
            break_end_time: Yup.string()
              .trim()
              .label(t("Break End Time"))
              .required()
              .test("Break End Time_test", (value, field) => {
                const { break_start_time } = field.parent;
                if (break_start_time !== undefined && value !== undefined) {
                  if (break_start_time < value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
          }),
        ),
      }),
    ),
  });
  yupconfig();

  const handleStaffSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(staffUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeEditStaffForm());
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          const data = action.payload && action.payload.message && action.payload.message.appointmentMatchAll;
          if (status === 422) {
            setErrors(errors);
          } else if (status === 410) {
            setLoading(false);
            let htmlAppointmentMatchAll = "";
            if (data) {
              htmlAppointmentMatchAll += `<p class="text-danger text-justify">${t("You cannot remove / update this service because these staff services have already booked an appointment.")}</p><div class="table-respoinsive"><table class="table appointmentStaffList"><thead><tr><th class="text-start">${t("Service")}</th><th>${t("Total Appointment")}</th></tr></thead><tbody>`;
              Object.keys(data).map((item) => {
                let service_name = data[item].service.name;
                let appointmentcount = data[item].appointmentcount;
                htmlAppointmentMatchAll += `<tr><td class="text-start">${ucfirst(service_name)}</td><td>${appointmentcount}</td></tr>`;
              });
              htmlAppointmentMatchAll += "<tbody></tbody></table></div>";
            }
            Swal.fire({
              title: "Do you want to save the changes?",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Save",
              // denyButtonText: 'No',
              html: htmlAppointmentMatchAll,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                values.pagetype = "appointmentpopup";
                handleStaffSubmit(values, { setErrors, setStatus, setSubmitting, resetForm });
              }
            });
          }
          setStatus({ success: false });
          setSubmitting(false);
          setLoading(false);
        }
      });
      if (scriptedRef.current) {
        setLoading(false);
      }
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };

  const PriceTierOptionsData = isPriceTierOption;
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleStaffSubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              const fields = ["id", "price_tier_id", "first_name", "last_name", "email", "phone_number", "address", "street", "suburb", "state", "postcode", "calendar_booking"];
              fields.forEach((field) => {
                if (["calendar_booking"].includes(field)) {
                  formik.setFieldValue(field, parseInt(formik.values[field]) ? parseInt(formik.values[field]) : parseInt(detail[field]), false);
                } else {
                  let detail_field = detail[field] ? detail[field] : "";
                  formik.setFieldValue(field, formik.values[field] ? formik.values[field] : detail_field, false);
                }
              });
              const staffworkinghours = detail.staffworkinghours;
              if (staffworkinghours) {
                staffworkinghours.map((item, i) => {
                  let days = item.days;
                  let start_time = item.start_time;
                  let end_time = item.end_time;
                  let break_time = item.break_time;
                  let dayoff = item.dayoff;
                  formik.setFieldValue(`working_hours[${i}][days]`, days ? days : "");
                  formik.setFieldValue(`working_hours[${i}][start_time]`, start_time ? moment("2022-01-01T" + start_time).format("HH:mm") : "");
                  formik.setFieldValue(`working_hours[${i}][end_time]`, end_time ? moment("2022-01-01T" + end_time).format("HH:mm") : "", false);
                  formik.setFieldValue(`working_hours[${i}][dayoff]`, dayoff ? dayoff : "", false);
                  if (break_time) {
                    break_time.map((breakitem, j) => {
                      let break_title = breakitem.break_title;
                      let break_start_time = breakitem.break_start_time;
                      let break_end_time = breakitem.break_end_time;
                      formik.setFieldValue(`working_hours[${i}][break_time][${j}][break_title]`, break_title ? break_title : "", false);
                      formik.setFieldValue(`working_hours[${i}][break_time][${j}][break_start_time]`, break_start_time ? moment("2022-01-01T" + break_start_time).format("HH:mm") : "", false);
                      formik.setFieldValue(`working_hours[${i}][break_time][${j}][break_end_time]`, break_start_time ? moment("2022-01-01T" + break_end_time).format("HH:mm") : "", false);
                    });
                  }
                });
              }
            }
          }, [detail]);
          useEffect(() => {
            if (isAddonServices.length > 0) {
              Object.keys(isAddonServices).map((item) => {
                let addonservicesData = isAddonServices[item].services;
                // console.log(!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true));
                if (addonservicesData) {
                  Object.keys(addonservicesData).map((itemservice) => {
                    let service_id = addonservicesData[itemservice].id;
                    let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                    // let service_name = addonservicesData[itemservice].name;
                    // console.log(service_name + " " + addonservicesData[itemservice]?.isServiceChecked || false);
                    formik.setFieldValue("add_on_services[" + item + "][" + itemservice + "]", isServiceChecked ? service_id : "", false);
                  });
                }
              });
            }
          }, [isAddonServices]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 addstaff-member " : "") + rightDrawerOpened} id="addstaff-member-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-4 py-3">
                    <h1 className="pe-md-5 pe-3 mb-0">{t("Edit Staff Member")}</h1>
                    <a className="close-drawer cursor-pointer" onClick={handleCloseEditStaffForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body">
                    <div className="row mx-0">
                      <div className="col-xl-4 col-md-6 detail">
                        <h3 className="mb-2">{t("Details")}</h3>
                        <h6 className="subtitle">{t("Add your staff member’s details.")}</h6>
                        <div className="row gx-2">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <InputField type="text" name="first_name" value={formik.values.first_name} label={t("First Name")} controlId="staffForm-first_name" />
                            </div>
                            <div className="mb-3">
                              <InputField type="text" name="last_name" value={formik.values.last_name} label={t("Last Name")} controlId="staffForm-last_name" />
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <InputFieldImage name="profile_photo" accept="image/*" label={t("Add Staff Photo")} page="staff-form" controlId="staffForm-profile_photo" imagname="" imageurl="" />
                          </div>
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 mb-3">
                            <InputField type="text" name="phone_number" value={formik.values.phone_number} mask="999-999-9999" label={t("Mobile")} controlId="clientForm-phone_number" />
                          </div>
                          <div className="col-md-6 mb-3">
                            <InputField type="text" name="email" value={formik.values.email} label={t("Email Address")} controlId="clientForm-email" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <MapAddressField name="address" label={t("Address")} value={formik.values.address} placeholder={t("Start typing address")} controlId="clientForm-address" />
                        </div>
                        <div className="mb-3">
                          <InputField type="text" name="street" value={formik.values.street} label={t("Street")} controlId="clientForm-street" />
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 mb-md-4 mb-3">
                            <InputField type="text" name="suburb" value={formik.values.suburb} label={t("Suburb")} controlId="clientForm-suburb" />
                          </div>
                          <div className="col-md-3 col-6 mb-md-4 mb-3">
                            <InputField type="text" name="state" value={formik.values.state} label={t("State")} controlId="clientForm-state" />
                          </div>
                          <div className="col-md-3 col-6 mb-md-4 mb-3">
                            <InputField type="text" name="postcode" value={formik.values.postcode} label={t("Postcode")} controlId="clientForm-postcode" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <SwitchField
                            name="calendar_booking"
                            label={t("Allow calendar bookings")}
                            controlId="clientForm-calendar_booking"
                            value="1"
                            onChange={(e) => {
                              if (e.currentTarget.checked) {
                                setTimeout(() => {
                                  formik.setFieldValue("calendar_booking", 1, false);
                                }, 100);
                              } else {
                                setTimeout(() => {
                                  formik.setFieldValue("calendar_booking", 0, false);
                                }, 100);
                              }
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <SelectField name="price_tier_id" placeholder={t("--Select--")} value={formik.values.price_tier_id} options={PriceTierOptionsData} label={t("Price Tier")} controlId="staffForm-price_tier" />
                          <span className="info">
                            <img src={config.imagepath + "info.png"} className="me-2" alt="" />
                            <span className="align-middle">{t("Charge for services based on level of experience")}</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6 working-hrs">
                        <h3 className="mb-2">{t("Working Hours")}</h3>
                        <h6 className="subtitle">{t("Set the availability for this staff member.")}</h6>
                        <ul className="list-unstyled mb-0 p-0">
                          {HourList &&
                            HourList.map((item, i) => {
                              let days = item.days;
                              let errors_hour = formik.errors && formik.errors.working_hours && formik.errors.working_hours[i];
                              let dayoff = formik.values.working_hours && formik.values.working_hours[i] && formik.values.working_hours[i].dayoff === 1 ? 1 : 0;
                              return (
                                <li className="li" key={i}>
                                  <label htmlFor="">{days}</label>
                                  <div className="d-none">
                                    <Field type="hidden" name={`working_hours[${i}][days]`} value={days} className="form-control input" id={`staffForm-days-${i}`} />
                                  </div>
                                  <div className="me-3 form-check form-switch">
                                    <input
                                      type="checkbox"
                                      name={`working_hours[${i}][dayoff]`}
                                      value="1"
                                      className="form-check-input"
                                      id={`staffForm-dayoff-${i}`}
                                      onChange={(e) => {
                                        if (e.currentTarget.checked) {
                                          setTimeout(() => {
                                            formik.setFieldValue(`working_hours[${i}][dayoff]`, 1, false);
                                          }, 100);
                                        } else {
                                          setTimeout(() => {
                                            formik.setFieldValue(`working_hours[${i}][dayoff]`, 0, false);
                                            formik.setFieldValue(`working_hours[${i}][start_time]`, "", false);
                                            formik.setFieldValue(`working_hours[${i}][end_time]`, "", false);
                                            formik.setFieldValue(`working_hours[${i}][break_time]`, [], false);
                                          }, 100);
                                        }
                                        formik.handleChange(e);
                                      }}
                                      checked={dayoff ? "checked" : ""}
                                    />
                                    <div className="invalida-feedback"></div>
                                  </div>
                                  <Field type="time" name={`working_hours[${i}][start_time]`} className={(errors_hour && errors_hour.start_time ? "is-invalid" : "") + " form-control input"} id={`staffForm-start_time-${i}`} onChange={formik.handleChange} style={{ display: dayoff ? "block" : "none" }} />
                                  <span className="mx-2" style={{ display: dayoff ? "block" : "none" }}>
                                    {t("to")}
                                  </span>
                                  <Field type="time" name={`working_hours[${i}][end_time]`} className={(errors_hour && errors_hour.end_time ? "is-invalid" : "") + " form-control me-xxl-4 me-2 input"} id={`staffForm-end_time-${i}`} onChange={formik.handleChange} style={{ display: dayoff ? "block" : "none" }} />
                                  <FieldArray
                                    name={`working_hours.${i}.break_time`}
                                    render={(arrayHelpers) => {
                                      let break_time = formik.values.working_hours && formik.values.working_hours[i] && formik.values.working_hours[i].break_time;
                                      return (
                                        <>
                                          <a
                                            id={`addbreak-link-${i}`}
                                            className="cursor-pointer h6 mb-0 color-wine text-decoration-none"
                                            onClick={() =>
                                              arrayHelpers.push({
                                                break_title: "",
                                                break_start_time: "",
                                                break_end_time: "",
                                              })
                                            }
                                            style={{ display: dayoff ? "block" : "none" }}
                                          >
                                            <i className="fal fa-plus pe-1 small"></i>
                                            {t("Break")}
                                          </a>
                                          {break_time && break_time.length > 0
                                            ? break_time.map((bt, j) => {
                                                const errors_breaktime = formik.errors && formik.errors.working_hours && formik.errors.working_hours[i] && formik.errors.working_hours[i].break_time && formik.errors.working_hours[i].break_time[j];
                                                return (
                                                  <div key={i + j}>
                                                    <div className="add-break-time w-100 d-flex align-items-center mt-md-3 mt-2" id={`working_hours-break_time-${j}`}>
                                                      <label htmlFor={`staffForm-break_title-${i}-${item}`}>
                                                        <Field placeholder={"Title"} className={(errors_breaktime && errors_breaktime.break_title ? "is-invalid" : "") + " form-control input"} name={`working_hours[${i}][break_time][${j}][break_title]`} id={`staffForm-break_title-${i}-${j}`} onChange={formik.handleChange} />
                                                      </label>
                                                      <Field placeholder="" type="time" className={(errors_breaktime && errors_breaktime.break_start_time ? "is-invalid" : "") + " form-control input"} name={`working_hours[${i}][break_time][${j}][break_start_time]`} id={`staffForm-break_start_time-${i}-${j}`} onChange={formik.handleChange} />
                                                      <span className="mx-2">to</span>
                                                      <Field placeholder="" type="time" className={(errors_breaktime && errors_breaktime.break_end_time ? "is-invalid" : "") + " form-control input"} name={`working_hours[${i}][break_time][${j}][break_end_time]`} id={`staffForm-break_end_time-${i}-${j}`} onChange={formik.handleChange} />
                                                      <a className="close-breaktime ps-xxl-4 ps-2 cursor-pointer" onClick={() => arrayHelpers.remove(j)}>
                                                        <img src={config.imagepath + "close-icon.svg"} alt="" />
                                                      </a>
                                                    </div>
                                                    <div className="">
                                                      {/* <p className="mb-0"><ErrorMessage name={`working_hours[${i}][break_time][${j}][break_start_time]`} /></p>
                                                    <p className="mb-0"><ErrorMessage name={`working_hours[${i}][break_time][${j}][break_end_time]`} /></p> */}
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            : null}
                                        </>
                                      );
                                    }}
                                  />
                                  {/* {break_time &&
                                    break_time.map((breakitem, j) => {
                                      console.log(formik.errors.working_hours[i]);
                                      return (
                                        <div key={i + j} className="add-break-time w-100 d-flex align-items-center mt-md-3 mt-2" id={`working_hours-break_time-${j}`}>
                                          <label htmlFor={`staffForm-break_title-${item}`}>
                                            <input type="text" placeholder="" name={`working_hours[${i}][break_time][${j}][break_title]`} className={(formik.errors && formik.errors.working_hours && formik.errors.working_hours[i].end_time ? "is-invalid" : "") + " form-control"} id={`staffForm-break_title-${i}-${j}`} onChange={formik.handleChange} />
                                          </label>
                                          <input type="time" placeholder="--/--" name={`working_hours[${i}][break_time][${j}][break_start_time]`}    id={`staffForm-break_start_time-${i}-${j}`} onChange={formik.handleChange} />
                                          <span className="mx-2">to</span>
                                          <input type="time" placeholder="--/--" name={`working_hours[${i}][break_time][${j}][break_end_time]`} className={(formik.errors && formik.errors.working_hours && formik.errors.working_hours[i].end_time ? "is-invalid" : "") + " form-control"} id={`staffForm-break_end_time-${i}-${j}`} onChange={formik.handleChange} />
                                          <a className="close-breaktime ps-xxl-4 ps-2 cursor-pointer" onClick={() => handleRemoveBreakTime(i, j)}>
                                            <img src={config.imagepath + "close-icon.svg"} alt="" />
                                          </a>
                                        </div>
                                      );
                                    })} */}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-12 service" style={{ display: isAddonServices.length > 0 ? "block" : "none" }}>
                        <h3 className="mb-2">{t("Services")}</h3>
                        <h6 className="subtitle">{t("Select which services this staff member is able to perform.")}</h6>
                        <ul className="list-unstyled mb-0 p-0 m-0">
                          <li className="pt-3 pb-0 mt-0 all-staff">
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                checked={formik.values.add_on_all === 1}
                                value="1"
                                name="add_on_all"
                                onChange={(e) => {
                                  const { checked } = e.target;
                                  if (checked) {
                                    formik.setFieldValue("add_on_all", 1);
                                  } else {
                                    formik.setFieldValue("add_on_all", 0);
                                  }
                                  if (isAddonServices.length > 0) {
                                    Object.keys(isAddonServices).map((item) => {
                                      let addonservicesData = isAddonServices[item].services;
                                      let tempUser = addonservicesData.map((itemservice) => {
                                        return { ...itemservice, isServiceChecked: checked };
                                      });
                                      dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                    });
                                  }
                                }}
                              />
                              <label>{t("All Services")}</label>
                            </div>
                            <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                              {isAddonServices.length > 0 &&
                                Object.keys(isAddonServices).map((item) => {
                                  let category_id = isAddonServices[item].id;
                                  let category_name = isAddonServices[item].name;
                                  let addonservicesData = isAddonServices[item].services;
                                  return (
                                    <li className="pt-3 pb-3" key={item} data-id={category_id}>
                                      <div className="checkbox">
                                        <input
                                          type="checkbox"
                                          checked={!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true)}
                                          value={category_id}
                                          name={"add_on_category[" + item + "]"}
                                          onChange={(e) => {
                                            const { checked } = e.target;
                                            let tempUser = addonservicesData.map((itemservice) => {
                                              return { ...itemservice, isServiceChecked: checked };
                                            });
                                            dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                          }}
                                        />
                                        <label>
                                          <b>{ucfirst(category_name)}</b>
                                        </label>
                                      </div>
                                      <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                                        {addonservicesData &&
                                          Object.keys(addonservicesData).map((itemservice) => {
                                            let service_id = addonservicesData[itemservice].id;
                                            let service_name = addonservicesData[itemservice].name;
                                            // let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                                            return (
                                              <li className="pt-3 pb-3" key={itemservice} data-id={service_id}>
                                                <div className="checkbox">
                                                  <input
                                                    type="checkbox"
                                                    value={service_id}
                                                    // checked={formik.values.add_on_services[j] === service_id}
                                                    checked={addonservicesData[itemservice]?.isServiceChecked || false}
                                                    id={"add_on_services_" + item + "_" + itemservice}
                                                    name={"add_on_services[" + item + "][" + itemservice + "]"}
                                                    onChange={(e) => {
                                                      const { value, checked } = e.target;
                                                      let tempUser = addonservicesData.map((itemservice) => {
                                                        return parseInt(itemservice.id) === parseInt(value) ? { ...itemservice, isServiceChecked: checked } : itemservice;
                                                      });
                                                      dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                                    }}
                                                  />
                                                  <label>{ucfirst(service_name)}</label>
                                                </div>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </li>
                                  );
                                })}
                              {isAddonServices.length <= 0 ? <li>{t("No data found")}</li> : ""}
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="drawer-footer text-center">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Update Staff Member")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default StaffEditForm;
