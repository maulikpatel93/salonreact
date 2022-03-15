import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// validation Formik
import config from "../../config";
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../yupconfig";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { NextStep, PreviewStep, SignupStoreApi } from "store/slices/signupSlice";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isSignupStep = useSelector((state) => state.signup.isSignupStep);

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmpassword: "",
    terms: false,
    business_name: "",
    business_address: "",
    salon_type: "",
    business_phone_number: "",
    number_of_staff: "",
    working_hours: [
      { dayoff: "", days: "Sunday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "1", days: "Monday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "1", days: "Tuesday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "1", days: "Wednesday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "1", days: "Thursday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "1", days: "Friday", start_time: "", end_time: "", break_time: [] },
      { dayoff: "", days: "Saturday", start_time: "", end_time: "", break_time: [] },
    ],
  };

  const Step1Schema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
    last_name: Yup.string().trim().max(50).label(t("Last Name")).required(),
    phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("Mobile")).required(),
  });
  const Step2Schema = Yup.object().shape({
    email: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
    password: Yup.string().min(6).max(16).label(t("Password")).required(),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .label(t("Confirm Password"))
      .required(),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });
  const Step3Schema = Yup.object().shape({
    business_name: Yup.string().trim().max(50).label(t("Business Name")).required(),
    business_address: Yup.string().trim().max(50).label(t("Business Location")).required(),
    salon_type: Yup.string().trim().label(t("Business Type")).required(),
    business_phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("Business Phone Number")).required(),
  });
  const Step4Schema = Yup.object().shape({
    number_of_staff: Yup.string().trim().max(50).label(t("First Name")).required(),
  });
  const Step5Schema = Yup.object().shape({
    working_hours: Yup.array().of(
      Yup.object().shape({
        days: Yup.string().trim().label(t("days")).required(),
        start_time: Yup.string()
          .trim()
          .nullable()
          .when("dayoff", {
            is: "1",
            then: Yup.string()
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
          }),
        end_time: Yup.string()
          .trim()
          .nullable()
          .when("dayoff", {
            is: "1",
            then: Yup.string()
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
          }),
        break_time: Yup.array().of(
          Yup.object().shape({
            break_title: Yup.string().trim().label(t("Break Title")).required(),
            break_start_time: Yup.string()
              .trim()
              .label(t("Break Start Time"))
              .required()
              .test("Break Start Time_test", (value, field) => {
                const { break_end_time } = field.parent;
                if (break_end_time !== undefined && value !== undefined) {
                  if (break_end_time > value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
            break_end_time: Yup.string()
              .trim()
              .label(t("Break End Time"))
              .required()
              .test("Break End Time_test", (value, field) => {
                const { break_start_time } = field.parent;
                if (break_start_time !== undefined && value !== undefined) {
                  if (break_start_time < value) {
                    return true;
                  } else {
                    return false;
                  }
                }
                return false;
              }),
          }),
        ),
      }),
    ),
  });

  const validationSchemaArray = [Step1Schema, Step2Schema, Step3Schema, Step4Schema, Step5Schema];
  yupconfig();

  const handleSignupSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);

    if (isSignupStep > 1 && isSignupStep < 5) {
      dispatch(PreviewStep(isSignupStep));
      dispatch(NextStep(isSignupStep));
      setLoading(false);
    }
    if (isSignupStep === 5) {
          console.log(values);
      setLoading(false);
      try {
        dispatch(SignupStoreApi(values)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            setStatus({ success: true });
            resetForm();
            sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
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
    }
  };

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchemaArray[isSignupStep - 1]} onSubmit={handleSignupSubmit}>
        {(formik) => {
          return (
            <>
              <form noValidate onSubmit={formik.handleSubmit}>
                {isSignupStep === 1 && (
                  <div className="steps step-one active">
                    <Step1 formik={formik} loading={loading} isSignupStep={isSignupStep} />
                  </div>
                )}
                {isSignupStep === 2 && (
                  <div className="steps step-two active">
                    <Step2 formik={formik} loading={loading} isSignupStep={isSignupStep} />
                  </div>
                )}
                {isSignupStep === 3 && (
                  <div className="steps step-three active">
                    <Step3 formik={formik} loading={loading} isSignupStep={isSignupStep} />
                  </div>
                )}
                {isSignupStep === 4 && (
                  <div className="steps step-four active">
                    <Step4 formik={formik} loading={loading} isSignupStep={isSignupStep} />
                  </div>
                )}
                {isSignupStep === 5 && (
                  <div className="steps step-five active">
                    <Step5 formik={formik} loading={loading} isSignupStep={isSignupStep} />
                  </div>
                )}
              </form>
            </>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default SignupForm;
