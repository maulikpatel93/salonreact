import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { PreviewStep } from "store/slices/signupSlice";
import { Field } from "formik";

const Step5 = ({ formik, loading, isSignupStep }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const HourList = [
    { days: "Sunday", start_time: "", end_time: "", break_time: [] },
    { days: "Monday", start_time: "", end_time: "", break_time: [] },
    { days: "Tuesday", start_time: "", end_time: "", break_time: [] },
    { days: "Wednesday", start_time: "", end_time: "", break_time: [] },
    { days: "Thursday", start_time: "", end_time: "", break_time: [] },
    { days: "Friday", start_time: "", end_time: "", break_time: [] },
    { days: "Saturday", start_time: "", end_time: "", break_time: [] },
  ];

  return (
    <React.Fragment>
      <div className="stepsbox mx-auto">
        <div className="signup-form opening-hours">
          <h3 className="form-title">What are your opening hours?</h3>
          <div className="form-body">
            {HourList &&
              HourList.map((item, i) => {
                let days = item.days;
                let errors_hour = formik.errors && formik.errors.working_hours && formik.errors.working_hours[i];
                let dayoff = formik.values.working_hours && formik.values.working_hours[i] && formik.values.working_hours[i].dayoff;
                return (
                  <div className="hours-box" key={i}>
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            name={`working_hours[${i}][dayoff]`}
                            value="1"
                            className="form-check-input"
                            id={`staffForm-dayoff-${i}`}
                            onChange={(e) => {
                              if (e.currentTarget.checked) {
                                setTimeout(() => {
                                  formik.setFieldValue(`working_hours[${i}][dayoff]`, "1", false);
                                }, 100);
                              } else {
                                setTimeout(() => {
                                  formik.setFieldValue(`working_hours[${i}][dayoff]`, "", false);
                                  formik.setFieldValue(`working_hours[${i}][start_time]`, "", false);
                                  formik.setFieldValue(`working_hours[${i}][end_time]`, "", false);
                                  formik.setFieldValue(`working_hours[${i}][break_time]`, [], false);
                                }, 100);
                              }
                              formik.handleChange(e);
                            }}
                            checked={dayoff ? "checked" : ""}
                          />
                          <span>{days}</span>
                          <div className="d-none">
                            <Field type="hidden" name={`working_hours[${i}][days]`} value={days} className="form-control input" id={`staffForm-days-${i}`} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7 d-flex align-items-center">
                        <Field type="time" name={`working_hours[${i}][start_time]`} className={(errors_hour && errors_hour.start_time ? "is-invalid" : "") + " form-control input"} id={`staffForm-start_time-${i}`} style={{ display: dayoff ? "block" : "none" }} />
                        <span className="mx-2" style={{ display: dayoff ? "block" : "none" }}>
                          {t("to")}
                        </span>
                        <Field type="time" name={`working_hours[${i}][end_time]`} className={(errors_hour && errors_hour.end_time ? "is-invalid" : "") + " form-control input me-xxl-4 me-2 "} id={`staffForm-end_time-${i}`} style={{ display: dayoff ? "block" : "none" }} />
                      </div>
                    </div>
                    {/* <div className="row align-items-center">
                      <div className="col-md-12 text-end">
                        <ErrorMessage name={`working_hours[${i}][start_time]`} component="div" className="invalid-feedback d-block" />
                        <ErrorMessage name={`working_hours[${i}][end_time]`} component="div" className="invalid-feedback d-block" />
                      </div>
                    </div> */}
                  </div>
                );
              })}
          </div>
          <div className="row px-4">
            <div className="col-md-6 mb-md-0 mb-2">
              <button type="button" className="btn previous" onClick={() => dispatch(PreviewStep(isSignupStep))}>
                {t("Back")}
              </button>
            </div>
            <div className="col-md-6 text-md-end">
              <button type="submit" className="btn next" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                {t("Finish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
Step5.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  isSignupStep: PropTypes.number,
};
export default Step5;
