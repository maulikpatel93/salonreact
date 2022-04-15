import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { CloseAddStripeForm, StripeSetupApi } from "store/slices/stripeSlice";

const StripeSetupForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.stripe.isOpenedAddForm);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email().label(t("Email")).required(),
  });
  yupconfig();

  const handlestripeSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(StripeSetupApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          const stripedetail = action.payload;
          const stripeAccountLink = stripedetail.stripeAccountLink;
          const stripe_account_id = stripedetail.stripe_account_id;
          console.log(stripeAccountLink.url);
          window.location.href = stripeAccountLink.url;
          // sweatalert({ title: t("Setup"), text: t("Stripe Setup Successfully"), icon: "success" });
          dispatch(CloseAddStripeForm());
          if (scriptedRef.current) {
            setLoading(false);
          }
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
          setSubmitting(false);
          if (scriptedRef.current) {
            setLoading(false);
          }
        }
      });
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };
  const handleCloseAddStripeForm = () => {
    dispatch(CloseAddStripeForm());
  };

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlestripeSubmit}>
        {(formik) => {
          return (
            <div className={rightDrawerOpened + " full-screen-drawer p-0 stripe-drawer"} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="integration-stripe">
                    <div className="row mx-0">
                      <div className="col-lg-4 text-white content-block">
                        <h2 className="mb-4 pb-xxl-2">{t("Beauti partners with Stripe for secure payments.")}</h2>
                        <a className="cursor-pointer" onClick={handleCloseAddStripeForm}>
                          <i className="fas fa-long-arrow-left me-2"></i>
                          {t("Return to Beauti")}
                        </a>
                      </div>
                      <div className="col-lg-8 form-block">
                        <h2>{t("Get started with Stripe")}</h2>
                        <p>{t("If you’re completing this form on behalf of a business, it must be completed by the business owner or someone with signficant management responsibility of that business.")}</p>

                        <div className="mb-4 pb-xxl-2">
                          <InputField type="text" name="email" value={formik.values.email} placeholder="me@example.com" label={t("Email")} controlId="stripesetupForm-email" />
                        </div>
                        <button type="submit" className="w-100 btn btn-primary" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Continue")} <i className="fas fa-long-arrow-right ms-2"></i>
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
    </React.Fragment>
  );
};

// StripeSetupForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default StripeSetupForm;
