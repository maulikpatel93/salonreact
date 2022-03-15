import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { InputField, SelectField } from "component/form/Field";
import { PreviewStep } from "store/slices/signupSlice";

const Step3 = ({ formik, loading, isSignupStep }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const businesstypeOption = [
    { value: "Unisex", label: t("Unisex") },
    { value: "Ladies", label: t("Ladies") },
    { value: "Gents", label: t("Gents") },
  ];

  return (
    <React.Fragment>
      <div className="row gx-md-5">
        <div className="col-md-6 mx-auto">
          <div className="signup-form">
            <h3 className="form-title">{t("Tell us a bit about your business")}</h3>
            <div className="row">
              <div className="col-md-12 mb-3">
                <InputField type="text" name="business_name" value={formik.values.business_name} label={t("Business Name")} controlId="signupForm-business_name" />
              </div>
              <div className="col-md-12 mb-4">
                <InputField type="text" name="business_address" value={formik.values.business_address} label={t("Business Location")} controlId="signupForm-business_address" className="business-location" />
              </div>
              <div className="col-md-12 mb-4">
                <SelectField name="salon_type" placeholder={t("--Select--")} value={formik.values.salon_type} options={businesstypeOption} label={t("Business Type")} controlId="signupForm-salon_type" />
              </div>
              <div className="col-md-12 mb-4">
                <InputField type="text" name="business_phone_number" value={formik.values.business_phone_number} mask="999-999-9999" label={t("Business Phone Number")} controlId="signupForm-business_phone_number" />
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
Step3.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  isSignupStep: PropTypes.number,
};
export default Step3;
