import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { InputField } from "component/form/Field";

const Step1 = ({ formik, loading }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="row gx-md-5">
        <div className="col-md-6 mb-md-0 mb-4">
          <h1>
            {t("Try Beauti")}
            <br />
            <b>{t("for free")}</b>
          </h1>
          <p className="">{t("Beauti is everything you need to run and grow your business: Appointment scheduling, client & staff management, product inventory, marketing and more Try it now for free.")}</p>
          <ul>
            <li>{t("14 day free trial")}</li>
            <li>{t("No contracts")}</li>
            <li>{t("No credit card required")}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <div className="signup-form">
            <h3 className="form-title">{t("Start your 14 day free trail now")}</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <InputField type="text" name="first_name" value={formik.values.first_name} label={t("First Name")} controlId="signupForm-first_name" />
              </div>
              <div className="col-md-6 mb-3">
                <InputField type="text" name="last_name" value={formik.values.last_name} label={t("Last Name")} controlId="signupForm-last_name" />
              </div>
              <div className="col-md-12 mb-4">
                <InputField type="text" name="phone_number" value={formik.values.phone_number} mask="999-999-9999" label={t("Mobile")} controlId="signupForm-phone_number" />
              </div>
              {formik.values.email_otp && <InputField type="text" name="email_otp" value={formik.values.email_otp} label={t("Email Otp")} controlId="signupForm-email_otp" />}
              
              <div className="col-md-12">
                <button type="submit" className="btn w-100 next btn-lg" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Get Started")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Step1.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
};
export default Step1;
