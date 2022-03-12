import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../yupconfig";
import { CheckboxField, FloatLabelInputField } from "../../component/form/Field";

//============================|| API JWT - LOGIN ||============================//
import { login } from "../../store/slices/authSlice";
import { clearMessage } from "../../store/slices/message";

const RestLogin = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
    remember_me: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().label("Email").email().required(),
    password: Yup.string().min(6).max(16).label("Password").required(),
    remember_me: Yup.bool(),
  });
  yupconfig();

  const handleLogin = (formValue) => {
    const { email, password, remember_me } = formValue;
    setLoading(true);
    try {
      dispatch(login({ email, password, remember_me })).then((action) => {
        if (action && action.meta && action.meta.requestStatus == "rejected") {
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
      {(formik) => (
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-row align-items-center justify-content-center mb-5">
            <h1 className="fw-normal mb-0 me-3">{t("Sign In")}</h1>
          </div>
          <div className="mb-3">
            <FloatLabelInputField name="email" type="text" placeholder="" label={t("Email Address")} controlId="login-email" />
          </div>
          <div className="mb-3">
            <FloatLabelInputField name="password" type="password" placeholder="" autoComplete="off" label={t("Password")} controlId="login-password" />
          </div>
          {message && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {message}
              <button type="button" className="btn-close" onClick={() => dispatch(clearMessage())} data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <CheckboxField
              name="remember_me"
              label={t("Remember me")}
              controlId="login-remember_me"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  // setTimeout(() => {
                  formik.setFieldValue("remember_me", 1, false);
                  // }, 100);
                } else {
                  // setTimeout(() => {
                  formik.setFieldValue("remember_me", "", false);
                  // }, 100);
                }
              }}
            />
            {/* <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                {t("Remember me")}
              </label>
            </div> */}
            <Link to="#!" className="text-body">
              {t("Forgot password?")}
            </Link>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              {t("Login")}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RestLogin;
