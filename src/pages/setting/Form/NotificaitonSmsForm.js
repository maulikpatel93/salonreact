import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, ReactSelectField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import { NotifyDetailUpdateApi, OpenNotificaitonSmsForm, reset, SetNotifySmsPreview } from "store/slices/notificationSlice";
import NotifySmsPreview from "../List/NotifySmsPreview";
import { FormOptions } from "store/slices/formSlice";

const NotificaitonSmsForm = () => {
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState({ chars_left: 500, max_char: 500 });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.notification.isOpenNotificaitonSmsForm);
  const isNotifyDetail = useSelector((state) => state.notification.isNotifyDetail);
  const isNotifySmsPreview = useSelector((state) => state.notification.isNotifySmsPreview);
  const isFormOption = useSelector((state) => state.form.isFormOption);

  useEffect(() => {
    dispatch(FormOptions({ option: { valueField: "id", labelField: "title" } }));
  }, []);

  const getformValues = (values) => {
    useEffect(() => {
      dispatch(SetNotifySmsPreview(values));
    }, [values]);
  };

  const initialValues = {
    form_id: "",
    sms_template: "",
  };
  const validationSchema = Yup.object().shape({
    form_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Form")).required())),
    sms_template: Yup.string().trim().max(500).label(t("Message")).required(),
  });
  yupconfig();

  const handleNotifySubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(false);
    try {
      dispatch(NotifyDetailUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          reset();
          dispatch(OpenNotificaitonSmsForm(""));
          setStatus({ success: true });
          setLoading(false);
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
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
  const formOptionsData = isFormOption.length > 0 ? isFormOption : null;
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleNotifySubmit}>
          {(formik) => {
            useEffect(() => {
              if (isNotifyDetail) {
                const fields = ["id", "title", "nofify", "type", "short_description", "appointment_times_description", "cancellation_description", "sms_template", "form_id"];
                fields.forEach((field) => {
                  formik.setFieldValue(field, isNotifyDetail[field] ? isNotifyDetail[field] : "", false);
                });
              }
            }, [isNotifyDetail]);
            getformValues(formik.values);
            return (
              <div className={"full-screen-drawer p-0 addnotification-drawer " + rightDrawerOpened} id="addnotification-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                    <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                      <h3 className="mb-0 fw-semibold">{isNotifyDetail.title}</h3>
                      <div className="ms-auto">
                        <a className="close btn btn-cancel me-1 cursor-pointer" onClick={() => dispatch(OpenNotificaitonSmsForm(""))}>
                          {t("Cancel")}
                        </a>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Save")}
                        </button>
                      </div>
                    </div>
                    <div className="drawer-body px-md-4 px-3 pt-2">
                      <div className="row mx-0">
                        <div className="col-xl-4 p-xxl-5 p-4">
                          <div className="alert d-flex align-items-start">
                            <img src="assets/images/alert-wine.png" alt="" />
                            <div className="ms-md-4 ms-2">
                              <h6 className="mb-2 fw-semibold">{t("Please note that the cost of the mesage will depend on it’s length.")}</h6>
                              <h6 className="mb-2 fw-semibold">{t("Up to 81 characters 1 SMS credit")}</h6>
                              <h6 className="mb-2 fw-semibold">{t("Up to 227 characters: 2 SMS credits")}</h6>
                              <h6 className="mb-2 fw-semibold">{t("Up to 380 characters: 3 SMS credits")}</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 p-xxl-5 p-4 add-form  border-left border-right">
                          <div className="mb-4 pb-xxl-2">
                            <h4 className="fw-semibold mb-2">{t("Consultation Form")}</h4>
                            <p className="mb-4">{t("If you would you like to attach an online consultation form to this message, please select it here.")}</p>
                            <ReactSelectField name="form_id" placeholder={t("Choose Consultation Form")} value={formik.values.form_id} options={formOptionsData} label={t("Consultation Form")} controlId="notifyForm-form_id" isMulti={false} />
                            {/* <select name="" id="" className="form-control">
                                <option selected value="Covid-19 Health Agreement">
                                  Covid-19 Health Agreement
                                </option>
                                <option value="">Covid-19 Health Agreement</option>
                              </select> */}
                          </div>
                          <div className="mb-4 pb-xxl-2t">
                            <h4 className="fw-semibold mb-2">{t("Message")}</h4>
                            <p className="mb-4">{t("Create your message here using the placeholders below to personalise the message.")}</p>
                            <TextareaField type="text" name="sms_template" placeholder={t("For example, allergic to latex")} value={formik.values.sms_template} label={""} controlId="notifyForm-sms_template" />
                            <h6 className="mb-0 mt-3">{t("Approx. 123 characters used with 2 SMS credits used")}</h6>
                          </div>
                          <div className="mb-4">
                            <h4 className="fw-semibold mb-2">{t("Placeholders")}</h4>
                            <p className="mb-4">{t("Copy and paste the below placeholders to include dynamic content in your message.")}</p>
                            <h6 className="f-18 lh-base">
                              BUSINESS_NAME
                              <br />
                              BUSINESS_TELEPHONE
                              <br />
                              CLIENT_FIRST_NAME
                              <br />
                              CLIENT_NAME
                              <br />
                              STAFF_FIRST_NAME
                              <br />
                              STAFF_LAST_NAME
                              <br />
                              BOOKING_DATE
                              <br />
                              BOOKING_TIME
                            </h6>
                          </div>
                        </div>
                        <div className="col-xl-4 p-xxl-5 p-4">
                          <NotifySmsPreview preview={isNotifySmsPreview} currentUser={currentUser} />
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

export default NotificaitonSmsForm;
