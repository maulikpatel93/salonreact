import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, Field } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { sweatalert } from "../../../component/Sweatalert2";
import { rosterListViewApi, rosterUpdateApi, closeAddRosterForm, closeEditRosterForm, openDeleteModal, resetStaffFilter } from "../../../store/slices/rosterSlice";
import useScriptRef from "../../../hooks/useScriptRef";
import PropTypes from "prop-types";
import { checkaccess } from "helpers/functions";

const EditTimeForm = (props) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const staff_id = props.staff_id;
  const date = props.date;
  const roster = props.roster;
  const role_id = props.role_id;
  const access = props.access;

  const initialValues = {
    staff_id: "",
    date: "",
    start_time: "",
    end_time: "",
    away: "",
  };

  const validationSchema = Yup.object().shape({
    staff_id: Yup.string().trim().required(),
    date: Yup.string().trim().required(),
    start_time: Yup.string()
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
    end_time: Yup.string()
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
  });
  yupconfig();
  const handleRosterSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    setLoading(true);
    try {
      dispatch(rosterUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(rosterListViewApi());
          dispatch(resetStaffFilter());
          dispatch(closeAddRosterForm());
          dispatch(closeEditRosterForm());
          setStatus({ success: true });
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
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

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRosterSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("staff_id", staff_id);
            formik.setFieldValue("date", date);
            if (roster) {
              const fields = ["id", "start_time", "end_time", "away"];
              fields.forEach((field) => {
                formik.setFieldValue(field, roster[field] ? roster[field] : "", false);
              });
            }
          }, [staff_id, date, roster]);
          return (
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className="p-md-4 p-3">
                <h6 className="fw-semibold text-start mb-3">{t("Set start and end time")}</h6>
                <Field type="hidden" className={(formik.errors && formik.errors.start_time ? "is-invalid" : "") + " form-control"} name="staff_id" onChange={formik.handleChange} />
                <Field type="hidden" className={(formik.errors && formik.errors.start_time ? "is-invalid" : "") + " form-control"} name="date" onChange={formik.handleChange} />
                <Field type="hidden" className="form-control" name="away" onChange={formik.handleChange} />
                <div className="d-flex align-items-center">
                  <Field type="time" className={(formik.errors && formik.errors.start_time ? "is-invalid" : "") + " start-time form-control"} name="start_time" onChange={formik.handleChange} />
                  <span className="px-md-2 px-1">to</span>
                  <Field type="time" className={(formik.errors && formik.errors.end_time ? "is-invalid" : "") + " end-time form-control"} name="end_time" onChange={formik.handleChange} />
                  <button type="submit" className="btn btn-primary ms-md-3 ms-1" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    {t("Update")}
                  </button>
                </div>
              </div>
              <div className="popup-footer d-flex text-center">
                {roster.away === "0" ? (
                  <button type="submit" id="mark-away" className="col-6 bg-transparent border-1" onClick={() => formik.setFieldValue("away", "1")}>
                    {t("Mark as Away")}
                  </button>
                ) : (
                  <button type="submit" id="mark-not-away" className="col-6 bg-transparent border-1" onClick={() => formik.setFieldValue("away", "0")}>
                    {t("Mark as Not Away")}
                  </button>
                )}
                {checkaccess({ name: "delete", role_id: role_id, controller: "roster", access }) && (
                  <button type="button" id="removetime" className="col-6 bg-transparent border-1" data-obj={JSON.stringify(roster)} onClick={(e) => dispatch(openDeleteModal(e.currentTarget.getAttribute("data-obj")))}>
                    {t("Remove Shift")}
                  </button>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
EditTimeForm.propTypes = {
  roster: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  staff_id: PropTypes.number,
  role_id: PropTypes.number,
  date: PropTypes.string,
};

export default EditTimeForm;
