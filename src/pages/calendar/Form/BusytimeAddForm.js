import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, ReactSelectField, SelectField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeAddBusytimeForm, busytimeStoreApi } from "../../../store/slices/busytimeSlice";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

const BusytimeAddForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.busytime.isOpenedAddForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const isStaffOption = useSelector((state) => state.staff.isStaffOption);

  const handlecloseAddBusytimeForm = () => {
    dispatch(closeAddBusytimeForm());
  };

  const initialValues = {
    staff_id: "",
    date: "",
    start_time: "",
    end_time: "",
    repeats: "",
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Staff")).required())),
    date: Yup.date().label(t("Date")).required(),
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
    reason: Yup.string().trim().label(t("Reason")).required(),
  });
  yupconfig();

  const handleClientSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(busytimeStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddBusytimeForm());
          sweatalert({ title: t("Added"), text: t("Added Successfully"), icon: "success" });
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

  const staffOptionsData = isStaffOption;
  const repeatsOptionsData = [
    { value: "No", label: t("No") },
    { value: "Yes", label: t("Yes") },
  ];

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClientSubmit}>
        {(formik) => {
          return (
            <>
              <div className={"drawer busytime-drawer " + rightDrawerOpened} id="addbusytime-drawer">
                <div className="drawer-wrp position-relative">
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Add Busy Time")}</h2>
                    <a className="close-drawer cursor-pointer" onClick={handlecloseAddBusytimeForm}>
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
                            name="date"
                            id="busytimeForm-date"
                            value={formik.values.date}
                            inputClass={(formik.errors && formik.errors.date ? "is-invalid" : "") + " form-control date"}
                            placeholder={t("Select Date")}
                            format={"dddd, DD MMMM YYYY"}
                            minDate={new Date()}
                            onChange={(e) => {
                              let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("dddd, DD MMMM YYYY") : "";
                              formik.setFieldValue("date", getselectedDatePicker);
                            }}
                          />
                          {formik.errors && formik.errors.date && <div className="invalid-feedback d-block">{formik.errors.date}</div>}
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
                      <div className="mb-3 error">
                        <TextareaField type="text" name="reason" placeholder={t("e.g. Training, lunch break etc")} value={formik.values.reason} label={t("Reason")} controlId="busytimeForm-reason" />
                      </div>
                      <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Save")}
                      </button>
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

export default BusytimeAddForm;
