import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// import { InputField } from "component/form/Field";
import { PreviewStep } from "store/slices/signupSlice";
import config from "../../config";
import { ErrorMessage, Field } from "formik";

const Step4 = ({ loading, isSignupStep }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="row gx-md-5">
        <div className="col-md-6 mx-auto">
          <div className="signup-form">
            <h3 className="form-title">{t("How many staff do you have?")}</h3>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="staff-box">
                  <img src={`${config.imagepath}user-one.svg`} alt="" />
                  <label htmlFor="">{t("Just Me")}</label>
                  <Field type="radio" name="number_of_staff" value="Just Me" />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="staff-box">
                  <img src={`${config.imagepath}five-user.png`} alt="" />
                  <label htmlFor="">2-5</label>
                  <Field type="radio" name="number_of_staff" value="2-5" />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="staff-box">
                  <img src={`${config.imagepath}nine-user-svg.png`} alt="" />
                  <label htmlFor="">6-10</label>
                  <Field type="radio" name="number_of_staff" value="6-10" />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="staff-box">
                  <img src={`${config.imagepath}nineteen-svg.png`} alt="" />
                  <label htmlFor="">10+</label>
                  <Field type="radio" name="number_of_staff" value="10+" />
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <ErrorMessage name="number_of_staff" component="div" className="invalid-feedback d-block text-center" />
              </div>
              <div className="col-md-6 mb-md-0 mb-2">
                <button type="button" className="btn w-100 previous" onClick={() => dispatch(PreviewStep(isSignupStep))}>
                  {t("Back")}
                </button>
              </div>
              <div className="col-md-6">
                <button type="submit" className="btn w-100 next" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Next Step")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
Step4.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  isSignupStep: PropTypes.number,
};
export default Step4;
