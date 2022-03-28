import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeRescheduleAppointmentForm, appointmentRescheduleApi, appointmentListViewApi, clientAppointmentListViewApi, appointmentDetailApi } from "../../../store/slices/appointmentSlice";
import { servicePriceApi } from "../../../store/slices/serviceSlice";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { Notify } from "component/Toastr";
import Moment from "react-moment";

const AppointmentRescheduleForm = (props) => {
  const [loading, setLoading] = useState(false);
  // const [clientId, setClientId] = useState("");
  const rightDrawerOpened = useSelector((state) => state.appointment.isOpenedRescheduleForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const isRangeInfo = props.isRangeInfo;
  const page = props.page;

  const detail = useSelector((state) => state.appointment.isDetailData);
  const handlecloseRescheduleAppointmentForm = () => {
    dispatch(closeRescheduleAppointmentForm());
  };

  const initialValues = {
    client_id: "",
    dateof: "",
    start_time: "",
  };

  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    dateof: Yup.date().label(t("Date")).required(),
    // .min(new Date(Date.now() - 86400000), t("Date cannot be in the past")),
    start_time: Yup.string().trim().label(t("Start Time")).required(),
  });
  yupconfig();

  const handleAppointmentSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      Swal.fire({
        title: `<h5 class="mb-0">${t("Are you sure want to reschedule appointment?")}</h5>`,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.value) {
          dispatch(appointmentRescheduleApi(values)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
              setStatus({ success: true });
              resetForm();
              dispatch(closeRescheduleAppointmentForm());
              dispatch(clientAppointmentListViewApi({ client: detail.client_id }));
              if (isRangeInfo) {
                dispatch(appointmentListViewApi(isRangeInfo));
                dispatch(appointmentDetailApi({ id: detail.id, client_id: detail.client_id }));
              }
              sweatalert({ title: t("Appointment reschedule successfully"), text: t("Appointment reschedule successfully"), icon: "success" });
            } else if (action.meta.requestStatus === "rejected") {
              const status = action.payload && action.payload.status;
              const errors = action.payload && action.payload.message && action.payload.message.errors;
              const response = action.payload && action.payload.message && action.payload.message;
              if (status === 422) {
                setErrors(errors);
              } else if (status === 410) {
                const NotifyContent = () => {
                  return (
                    <>
                      <p className="mb-2 text-white text-justify">{response && response.message}</p>
                      {response && response.booked && (
                        <ul className="list-unstyled">
                          {response.booked.map((a, n) => (
                            <li key={n} className="text-light form-text">
                              <Moment format="MMMM DD YYYY">{a.showdate}</Moment>, <Moment format="hh:mm A">{a.showdate + "T" + a.start_time}</Moment> - <Moment format="hh:mm A">{a.showdate + "T" + a.end_time}</Moment>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  );
                };
                Notify({ text: <NotifyContent />, title: response && response.message, type: "error" });
                setStatus({ warning: response && response.message, booked: response && response.booked });
                setLoading(false);
              }
              setStatus({ success: false });
              setSubmitting(false);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAppointmentSubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              const fields = ["id", "client_id", "dateof", "start_time"];
              fields.forEach((field) => {
                if (["dateof"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? moment(detail[field]).format("dddd, DD MMMM YYYY") : "", false);
                } else {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                }
              });
            }
          }, [detail]);
          return (
            <div className={"drawer client-rescheduleappoinment " + rightDrawerOpened} id="addappoinment-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Reschedule")}</h2>
                    <a
                      className={page && page === "calendar" ? "close-drawer cursor-pointer" : "close cursor-pointer"}
                      onClick={() => {
                        dispatch(servicePriceApi({ service_id: "" }));
                        handlecloseRescheduleAppointmentForm();
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
                        name="dateof"
                        id="appointmentForm-dateof"
                        value={formik.values.dateof}
                        inputClass={(formik.touched && formik.touched.dateof && formik.errors && formik.errors.dateof ? "is-invalid" : "") + " form-control date"}
                        placeholder={t("Select Date")}
                        format={"dddd, DD MMMM YYYY"}
                        minDate={new Date()}
                        onChange={(e) => {
                          let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("dddd, DD MMMM YYYY") : "";
                          formik.setFieldValue("dateof", getselectedDatePicker);
                        }}
                      />
                      {formik.touched && formik.touched.dateof && formik.errors && formik.errors.dateof && <div className="invalid-feedback d-block">{formik.errors.dateof}</div>}
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-4 mb-3">
                        <InputField type="time" name="start_time" value={formik.values.start_time} label={t("Start Time")} controlId="appointmentForm-start_time" />
                      </div>
                    </div>
                  </div>
                  <div className="drawer-footer">
                    <div className="row">
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Reschedule appointment")}
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
AppointmentRescheduleForm.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  page: PropTypes.string,
};
export default AppointmentRescheduleForm;
