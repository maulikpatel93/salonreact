import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import { FormStoreApi } from "store/slices/formSlice";
import config from "../../../config";
import ModalForm from "./ModalForm";
import PreviewForm from "./PreviewForm";
import { MailChimpSubscribeApi, OpenMailchimpForm } from "store/slices/settingSlice";

const MailchimpForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.setting.isOpenedMailchimpForm);

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
    first_name: Yup.string().trim().max(100).label(t("First Name")).required(),
    last_name: Yup.string().trim().max(100).label(t("Last Name")).required(),
  });
  yupconfig();

  const handleFormSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(false);
    try {
      dispatch(MailChimpSubscribeApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(OpenMailchimpForm(""));
          setStatus({ success: true });
          setLoading(false);
          sweatalert({ title: t("Subscribed"), text: t("Subscribed Successfully"), icon: "success" });
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
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {(formik) => {
            return (
              <div className={rightDrawerOpened + " full-screen-drawer p-0 stripe-drawer"} id="addproduct-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="integration-stripe">
                      <div className="row mx-0">
                        <div className="col-lg-4 text-white content-block">
                          <h2 className="mb-4 pb-xxl-2">{t("Beauti partners with Mailchimp subscription.")}</h2>
                          <a className="cursor-pointer" onClick={() => dispatch(OpenMailchimpForm(""))}>
                            <i className="fas fa-long-arrow-left me-2"></i>
                            {t("Return to Beauti")}
                          </a>
                        </div>
                        <div className="col-lg-8 form-block">
                          <div id="mc_embed_signup">
                            <h2>{t("Get started with Mailchimp")}</h2>
                            <p>{t("If you’re completing this form on behalf of a business, it must be completed by the business owner or someone with signficant management responsibility of that business.")}</p>
                            <div className="mb-4 pb-xxl-2">
                              <div hidden={true}>
                                <input type="hidden" name="tags" value="2141222" />
                              </div>
                              <div className="row mb-3">
                                <div className="col-6">
                                  <InputField type="text" name="first_name" value={formik.values.first_name} placeholder={t("First Name")} label={t("First Name")} controlId="stripesetupForm-email" />
                                </div>
                                <div className="col-6">
                                  <InputField type="text" name="last_name" value={formik.values.last_name} placeholder={t("Last Name")} label={t("Last Name")} controlId="stripesetupForm-email" />
                                </div>
                              </div>
                              <InputField type="text" name="email" value={formik.values.email} placeholder="me@example.com" label={t("Email")} controlId="stripesetupForm-email" />
                            </div>
                            <button type="submit" className="w-100 btn btn-primary" disabled={loading}>
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Continue")} <i className="fas fa-long-arrow-right ms-2"></i>
                            </button>
                          </div>
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
    </>
  );
};

export default MailchimpForm;
