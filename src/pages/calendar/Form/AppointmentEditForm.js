import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, ReactSelectField, SelectField, TextareaField, SwitchField } from "../../../component/form/Field";
import { swalConfirm, sweatalert } from "../../../component/Sweatalert2";
import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeEditAppointmentForm, appointmentUpdateApi, appointmentListViewApi, clientAppointmentListViewApi, appointmentDetailApi } from "../../../store/slices/appointmentSlice";
import { servicePriceApi } from "../../../store/slices/serviceSlice";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import { MinutesToHours, getHours, getMinutes } from "helpers/functions";
import { decimalOnly } from "../../../component/form/Validation";
import { busytimeListViewApi } from "store/slices/busytimeSlice";

const AppointmentEditForm = (props) => {
  const [loading, setLoading] = useState(false);
  // const [clientId, setClientId] = useState("");
  const rightDrawerOpened = useSelector((state) => state.appointment.isOpenedEditForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const isRangeInfo = props.isRangeInfo;
  const page = props.page;

  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const isServicePrice = useSelector((state) => state.service.isServicePrice);
  const detail = useSelector((state) => state.appointment.isDetailData);

  const handlecloseEditAppointmentForm = () => {
    dispatch(closeEditAppointmentForm());
  };

  const initialValues = {
    client_id: "",
    service_id: "",
    staff_id: "",
    date: "",
    start_time: "",
    duration: "",
    cost: "",
    repeats: "",
    booking_notes: "",
    status: "",
    status_manage: "",
  };

  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    service_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Service")).required())),
    staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Staff")).required())),
    date: Yup.date().label(t("Date")).required(),
    // .min(new Date(Date.now() - 86400000), t("Date cannot be in the past")),
    start_time: Yup.string().trim().label(t("Start Time")).required(),
    duration: Yup.string().trim().matches(config.duration_pattern, t(config.duration_HM_error)).label(t("Duration")).required(),
    cost: Yup.string().trim().label(t("Cost")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    booking_notes: Yup.string().trim().label(t("Booking Notes")),
  });
  yupconfig();

  const handleAppointmentSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(appointmentUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(servicePriceApi({ service_id: "" }));
          dispatch(closeEditAppointmentForm());
          dispatch(clientAppointmentListViewApi({ client: detail.client_id }));
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(appointmentDetailApi({ id: detail.id, client_id: detail.client_id }));
            dispatch(busytimeListViewApi(isRangeInfo));
          }
          sweatalert({ title: t("Appointment booking Updated"), text: t("Appointment Booked Successfully"), icon: "success" });
        } else if (action.meta.requestStatus == "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status == 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
          setSubmitting(false);
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

  const serviceOptionsData = isServiceOption;
  const staffOptionsData = isStaffOption.length > 0 ? isStaffOption : null;
  const repeatsOptionsData = [
    { value: "No", label: t("No") },
    { value: "Yes", label: t("Yes") },
  ];
  const statusmanageOptionsData = [
    { value: "Not Started", label: t("Not Started") },
    { value: "Started", label: t("Started") },
  ];
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAppointmentSubmit}>
        {(formik) => {
          useEffect(() => {
            if (typeof isServicePrice !== "undefined" && Array.isArray(isServicePrice) && isServicePrice.length === 0 && detail) {
              const fields = ["id", "client_id", "service_id", "staff_id", "date", "start_time", "duration", "cost", "repeats", "booking_notes", "status", "status_manage"];
              fields.forEach((field) => {
                if (["date"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? moment(detail[field]).format("dddd, DD MMMM YYYY") : "", false);
                } else if (["duration"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? MinutesToHours(detail[field]) : "", false);
                } else if (["status_manage"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "Not Started", false);
                } else if (["status"].includes(field)) {
                  if (detail[field] === "Confirmed") {
                    formik.setFieldValue(field, 1, false);
                  } else {
                    formik.setFieldValue(field, "", false);
                  }
                } else {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                }
              });
            } else if (isServicePrice) {
              let duration = isServicePrice.duration ? MinutesToHours(isServicePrice.duration) : "";
              let cost = isServicePrice.serviceprice && isServicePrice.serviceprice.filter((item) => item.name == "General");
              formik.setFieldValue("service_id", isServicePrice.id);
              formik.setFieldValue("duration", duration);
              formik.setFieldValue("cost", cost ? cost[0].price : "");
              formik.setFieldValue("staff_id", "", false);
            }
          }, [detail, isServicePrice]);
          return (
            <div className={"drawer client-editappoinment " + rightDrawerOpened} id="addappoinment-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Edit Appointment")}</h2>
                    <a
                      className={page && page === "calendar" ? "close-drawer cursor-pointer" : "close cursor-pointer"}
                      onClick={() => {
                        dispatch(servicePriceApi({ service_id: "" }));
                        handlecloseEditAppointmentForm();
                      }}
                    >
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body pymd-5 py-3">
                    <div className="mb-3">
                      {/* <InputField type="date" name="date" value={formik.values.date_of_birth} label={t("Date")} controlId="appointmentForm-date" placeholder={t("Select Date")}/> */}
                      <label htmlFor="">{t("Date")}</label>
                      <DatePicker
                        name="date"
                        id="appointmentForm-date"
                        value={formik.values.date}
                        inputClass={(formik.touched && formik.touched.date && formik.errors && formik.errors.date ? "is-invalid" : "") + " form-control date"}
                        placeholder={t("Select Date")}
                        format={"dddd, DD MMMM YYYY"}
                        minDate={new Date()}
                        onChange={(e) => {
                          let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("dddd, DD MMMM YYYY") : "";
                          formik.setFieldValue("date", getselectedDatePicker);
                        }}
                      />
                      {formik.touched && formik.touched.date && formik.errors && formik.errors.date && <div className="invalid-feedback d-block">{formik.errors.date}</div>}
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-4 mb-3">
                        <InputField type="time" name="start_time" value={formik.values.start_time} label={t("Start Time")} controlId="appointmentForm-start_time" />
                      </div>
                      <div className="col-sm-8 mb-3">
                        <ReactSelectField name="service_id" placeholder={t("Choose Service")} value={formik.values.service_id} options={serviceOptionsData} label={t("Service")} controlId="appointmentForm-service_id" isMulti={false} />
                      </div>
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-6 mb-3">
                        <ReactSelectField name="staff_id" placeholder={t("Choose Staff")} value={formik.values.staff_id} options={staffOptionsData} label={t("Staff")} controlId="appointmentForm-staff_id" isMulti={false} />
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <InputField name="duration" value={formik.values.duration} label={t("Duration")} mask="99:99" controlId="appointmentForm-duration" placeholder="--:--" />
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <InputField name="cost" value={formik.values.cost} label={t("Cost")} controlId="appointmentForm-cost" placeholder="$" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <SelectField name="repeats" value={formik.values.repeats} options={repeatsOptionsData} label={t("Repeats")} controlId="appointmentForm-repeats" />
                      {/* <a href="#" className="btn btn-outline-primary mt-3">
                        Add Another Service
                      </a> */}
                    </div>
                    <div className="mb-3">
                      <TextareaField type="text" name="booking_notes" placeholder={t("Add any notes about the appointment")} value={formik.values.booking_notes} label={t("Booking notes")} controlId="appointmentForm-booking_notes" />
                    </div>
                  </div>
                  <div className="drawer-footer pt-0">
                    <div className="row gx-2 align-items-center footer-top">
                      <div className="col-md-6 mb-md-0 mb-3">
                        <SwitchField
                          name="status"
                          label={t("Confirmed")}
                          controlId="appointmentForm-status"
                          value="1"
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              // setTimeout(() => {
                              formik.setFieldValue("status", 1, false);
                              // }, 100);
                            } else {
                              // setTimeout(() => {
                              formik.setFieldValue("status", "", false);
                              // }, 100);
                            }
                            //formik.handleChange(e);
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <SelectField name="status_manage" placeholder={""} value={formik.values.status_manage} options={statusmanageOptionsData} label={"0"} controlId="appointmentForm-status_manage" />
                      </div>
                    </div>
                    <div className="row justify-content-between mt-3 mb-lg-2">
                      <div className="col-auto h5 mb-3 fw-semibold">{(getHours(formik.values.duration, "H:m") || getMinutes(formik.values.duration, "H:m")) && t("Total of {{hour}}hr {{minute}}minutes", { hour: getHours(formik.values.duration, "H:m"), minute: getMinutes(formik.values.duration, "H:m") })}</div>
                      <div className="col-auto h5 mb-3 fw-semibold float-end">${formik.values.cost ? formik.values.cost : "00.00"}</div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-danger w-100 btn-lg"
                          disabled={loading}
                          onClick={(e) => {
                            let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure you want to cancel the appointment?"), message: "", confirmButtonText: t("Yes, cancelled it!") });
                            if (confirmbtn == true) {
                              dispatch(appointmentUpdateApi({ id: formik.values.id, client_id: formik.values.client_id, status: "Cancelled", clickEvent: "statusupdate" })).then((action) => {
                                if (action.meta.requestStatus == "fulfilled") {
                                  formik.setStatus({ success: true });
                                  formik.resetForm();
                                  dispatch(servicePriceApi({ service_id: "" }));
                                  dispatch(closeEditAppointmentForm());
                                  dispatch(clientAppointmentListViewApi({ client: detail.id }));
                                  if (isRangeInfo) {
                                    dispatch(appointmentListViewApi(isRangeInfo));
                                    dispatch(appointmentDetailApi({ id: detail.id, client_id: detail.client_id }));
                                  }
                                  sweatalert({ title: t("Appointment booking Cancelled"), text: t("Appointment booking Cancelled"), icon: "success" });
                                }
                              });
                            }
                          }}
                        >
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Cancel Appointment")}
                        </button>
                      </div>
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Save Appointment")}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
AppointmentEditForm.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  page: PropTypes.string,
};
export default AppointmentEditForm;
