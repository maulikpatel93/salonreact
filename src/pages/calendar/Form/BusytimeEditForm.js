import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, ReactSelectField, SelectField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeEditBusytimeForm, busytimeUpdateApi, busytimeListViewApi, busytimeDeleteApi } from "../../../store/slices/busytimeSlice";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import { decimalOnly } from "../../../component/form/Validation";
import { appointmentListViewApi } from "store/slices/appointmentSlice";

const BusytimeEditForm = (props) => {
  const [loading, setLoading] = useState(false);

  const rightDrawerOpened = useSelector((state) => state.busytime.isOpenedEditForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const isRangeInfo = props.isRangeInfo;

  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const detail = useSelector((state) => state.busytime.isDetailData);

  const handlecloseEditBusytimeForm = () => {
    dispatch(closeEditBusytimeForm());
  };
  
  const initialValues = {
    staff_id: "",
    dateof: "",
    start_time: "",
    end_time: "",
    repeats: "",
    repeat_time: "",
    repeat_time_option: "",
    ending: "",
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Staff")).required())),
    dateof: Yup.date().label(t("Date")).required(),
    start_time: Yup.string()
      .trim()
      .label(t("Start Time"))
      .required()
      .test("Start Time_test", t("Start Time cannot be greater than the End Time"), (value, field) => {
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
    end_time: Yup.string()
      .trim()
      .label(t("End Time"))
      .required()
      .test("End Time_test", t("End Time cannot be less than the Start Time"), (value, field) => {
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
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    repeat_time: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time")).required(t("Required")).test("Digits only", t("Digits only"), decimalOnly),
      }),
    repeat_time_option: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time option")).required(t("Required")),
      }),
    ending: Yup.date()
      .label(t("Ending (Optional)"))
      .min(new Date(Date.now() - 86400000), t("Date cannot be in the past")),
    reason: Yup.string().trim().label(t("Reason")).required(),
  });
  yupconfig();

  const handleClientSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(busytimeUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeEditBusytimeForm());
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(busytimeListViewApi(isRangeInfo));
          }
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
            setStatus({ success: false });
          } else if (status === 410) {
            setStatus({ warning: action.payload && action.payload.message });
            setLoading(false);
          }
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

  const handleDeleteBusytime = (e) => {
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this appointment?"), message: "", confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(busytimeDeleteApi({ id })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          if (isRangeInfo) {
            dispatch(busytimeListViewApi(isRangeInfo));
            dispatch(closeEditBusytimeForm());
          }
        } else if (action.meta.requestStatus === "rejected") {
          if (action.payload.status === 422) {
            let error = action.payload;
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
          }
        }
      });
    }
  };

  const staffOptionsData = isStaffOption;
  const repeatsOptionsData = [
    { value: "No", label: t("No") },
    { value: "Yes", label: t("Yes") },
  ];
  const repeattimeOptionsData = [
    { value: "Weekly", label: t("Week(s)") },
    { value: "Monthly", label: t("Month(s)") },
    //{ value: "Yearly", label: t("Year(s)") },
  ];

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClientSubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              const fields = ["id", "staff_id", "dateof", "start_time", "end_time", "repeats", "repeat_time", "repeat_time_option", "ending", "reason"];
              fields.forEach((field) => {
                if (["dateof"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? moment(detail[field]).format("dddd, DD MMMM YYYY") : "", false);
                } else if (["start_time", "end_time"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? moment(detail["dateof"] + "T" + detail[field]).format("HH:mm") : "", false);
                } else if (["ending"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? moment(detail[field]).format("DD MMMM YYYY") : "", false);
                } else if (["repeats"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "No", false);
                } else {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                }
              });
            }
          }, [detail]);
          return (
            <>
              <div className={"drawer busytime-drawer " + rightDrawerOpened} id="addbusytime-drawer">
                <div className="drawer-wrp position-relative">
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Edit Busy Time")}</h2>
                    <a className="close-drawer cursor-pointer" onClick={handlecloseEditBusytimeForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body">
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <ReactSelectField name="staff_id" placeholder={t("Choose Staff")} value={formik.values.staff_id} options={staffOptionsData} label={t("Staff")} controlId="busytimeForm-staff_id" isMulti={false} />
                      </div>
                      <div className="mb-3">
                        <div className="mb-3">
                          {/* <InputField type="date" name="date" value={formik.values.date_of_birth} label={t("Date")} controlId="appointmentForm-date" placeholder={t("Select Date")}/> */}
                          <label htmlFor="">{t("Date")}</label>
                          <DatePicker
                            name="dateof"
                            id="busytimeForm-dateof"
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
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6 mb-3">
                          <InputField type="time" name="start_time" value={formik.values.start_time} label={t("Start Time")} controlId="busytimeForm-start_time" />
                        </div>
                        <div className="col-sm-6 mb-3">
                          <InputField type="time" name="end_time" value={formik.values.end_time} label={t("End Time")} controlId="busytimeForm-end_time" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <SelectField name="repeats" placeholder={t("--Select--")} value={formik.values.repeats} options={repeatsOptionsData} label={t("Repeats")} controlId="busytimeForm-repeats" />
                      </div>
                      {formik.values.repeats && formik.values.repeats === "Yes" && (
                        <div className="row mb-3">
                          <div className="col-6">
                            <div className="col-12">
                              <label className="mb-0">{t("Repeat this every")}</label>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <InputField type="text" name="repeat_time" value={formik.values.repeat_time} label={""} controlId="busytimeForm-repeat_time" />
                              </div>
                              <div className="col-md-8">
                                <SelectField name="repeat_time_option" placeholder={t("--Select--")} value={formik.values.repeat_time_option} options={repeattimeOptionsData} label={""} controlId="busytimeForm-repeat_time_option" />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <label htmlFor="">{t("Ending (Optional)")}</label>
                            <DatePicker
                              name="ending"
                              id="busytimeForm-ending"
                              value={formik.values.ending}
                              inputClass={"form-control ending"}
                              placeholder={t("Select Date")}
                              format={"DD MMMM YYYY"}
                              minDate={new Date()}
                              onChange={(e) => {
                                let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("DD MMMM YYYY") : "";
                                formik.setFieldValue("ending", getselectedDatePicker);
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="mb-3">
                        <TextareaField type="text" name="reason" placeholder={t("e.g. Training, lunch break etc")} value={formik.values.reason} label={t("Reason")} controlId="busytimeForm-reason" />
                      </div>
                      {formik.status && formik.status.warning && <p className="text-danger mb-2 pt-1 pb-1">{formik.status.warning}</p>}
                      <div className="row">
                        <div className="col-6"><a className="btn btn-dark w-100 btn-lg" onClick={handleDeleteBusytime}>{t("Remove")}</a></div>
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Save")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </>
  );
};
BusytimeEditForm.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default BusytimeEditForm;
