import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../yupconfig";
import { FloatLabelInputField } from "../../component/form/Field";
//============================|| API JWT - LOGIN ||============================//
import { Forgotpassowrdsubmit } from "../../store/slices/authSlice";
import useScriptRef from "../../hooks/useScriptRef";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().label("Email").email().required(),
  });
  yupconfig();

  const handleForgotSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(Forgotpassowrdsubmit(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          resetForm();
          setStatus({ success: action.payload.status });
          setLoading(false);
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
            setStatus({ errors: action.payload.message && action.payload.message.email });
          }
          setSubmitting(false);
          setLoading(false);
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

  return (
    <React.Fragment>
      <div className="signup-content">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="container">
          <div className="row gx-md-5 justify-content-center">
            <div className="col-md-4 mb-md-0 mb-4 text-center">
              <h4 className="form-title">{t("Forgot Password")}</h4>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleForgotSubmit}>
                {(formik) => {
                  return (
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <FloatLabelInputField name="email" type="text" placeholder="" label={t("Email Address")} controlId="login-email" />
                        {formik.status && formik.status.errors && <div className="alert alert-danger p-2 mt-2" role="alert">{formik.status.errors}</div>}
                        {formik.status && formik.status.success && <div className="alert alert-success p-2 mt-2" role="alert">{formik.status.success}</div>}
                      </div>
                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Submit")}
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
