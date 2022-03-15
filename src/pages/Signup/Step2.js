import React from "react";
import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { InputField } from "component/form/Field";
import { PreviewStep } from "store/slices/signupSlice";
import { ErrorMessage, Field } from "formik";

const Step2 = ({ formik, loading, isSignupStep }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log(formik.errors);
  return (
    <React.Fragment>
      <div className="row gx-md-5">
        <div className="col-md-6 mx-auto">
          <div className="signup-form">
            <h3 className="form-title">{t("Great, let’s create your account")}</h3>
            <div className="row">
              <div className="col-md-12 mb-3">
                <InputField type="text" name="email" value={formik.values.email} label={t("Email Address")} controlId="signupForm-email" />
              </div>
              <div className="col-md-12 mb-4">
                <InputField type="password" name="password" value={formik.values.password} label={t("Password")} controlId="signupForm-password" />
              </div>
              <div className="col-md-12 mb-4">
                <InputField type="password" name="confirmpassword" value={formik.values.confirmpassword} label={t("Confirm Password")} controlId="signupForm-confirmpassword" />
              </div>
              <div className="col-md-12 mb-md-5 mb-4">
                <div className="checkbox">
                  <Field
                    type="checkbox"
                    name="terms"
                    className=""
                    id="signupForm-terms"
                    onChange={(e) => {
                      formik.setFieldValue("terms", e.currentTarget.checked, true);
                    }}
                  />
                  <label htmlFor="signupForm-terms">
                    <Trans i18nKey="signupTermsText">
                      I agree to the <a>{{ terms: t("terms and conditions") }}</a> of use
                    </Trans>
                  </label>
                  <ErrorMessage name="terms" component="div" className="invalid-feedback d-block" />
                </div>
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
Step2.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  isSignupStep: PropTypes.number,
};
export default Step2;
