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
import { NotifcationUpdateApi, OpenNotificationForm, reset, SetNotifyPreview } from "store/slices/notificationSlice";
import NotifyPreview from "../List/NotifyPreview";

const NotificationForm = () => {
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState({ chars_left: 500, max_char: 500 });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.notification.isOpenNotificationForm);
  const isNotifyDetail = useSelector((state) => state.notification.isNotifyDetail);
  const isNotifyPreview = useSelector((state) => state.notification.isNotifyPreview);

  const getformValues = (values) => {
    useEffect(() => {
      dispatch(SetNotifyPreview(values));
    }, [values]);
  };

  const initialValues = {
    appointment_times_description: "",
    cancellation_description: "",
  };
  const validationSchema = Yup.object().shape({
    appointment_times_description: Yup.string().trim().max(500).label(t("Appointment times")).required(),
    cancellation_description: Yup.string().trim().max(500).label(t("Cancellation description")).required(),
  });
  yupconfig();

  const handleNotifySubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(NotifcationUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          reset();
          dispatch(OpenNotificationForm(""));
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

  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleNotifySubmit}>
          {(formik) => {
            getformValues(formik.values);
            return (
              <div className={"full-screen-drawer p-0 addnotification-drawer " + rightDrawerOpened} id="addnotification-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                    <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                      <h3 className="mb-0 fw-semibold">{isNotifyDetail.title}</h3>
                      <div className="ms-auto">
                        <a className="close btn btn-cancel me-1 cursor-pointer" onClick={() => dispatch(OpenNotificationForm(""))}>
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
                        <div className="col-xxl-6 col-xl-8 add-form px-0 py-4">
                          <div className="row mx-0 px-xxl-5 px-md-4 px-3 border-bottom mb-4 pb-4">
                            <div className="col-md-6 mb-md-0 mb-3 ps-4 pe-4">
                              <h4 className="fw-semibold mb-2">{t("Appointment Times")}</h4>
                              <p>{t("The information that will appear under Appointment Times")}</p>
                            </div>
                            <div className="col-md-6 ps-4 pe-4">
                              <div className="">
                                <TextareaField type="text" name="appointment_times_description" placeholder={t("For example, allergic to latex")} value={formik.values.appointment_times_description} label={""} controlId="notifyForm-appointment_times_description" />
                                {/* <textarea rows="3" name="terms_and_conditions" placeholder="Terms and Conditions" id="voucherForm-terms_and_conditions" className="form-control p-3 textarea-lg small lh-base">
                                  You must arrive on time to ensure you receive the full service you have booked in for. If you are running late, please let us know – we will do everything we can to accommodate you, however, please keep in mind that we may have to reschedule your appointment, or may not have time to complete the whole service, in which case you will need to make another booking.
                                </textarea> */}
                                <p className="mb-0 mt-3">Characters left: 20</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mx-0 px-xxl-5 px-md-4 px-3">
                            <div className="col-md-6 mb-md-0 mb-3 ps-4 pe-4">
                              <h4 className="fw-semibold mb-2">{t("Cancellations")}</h4>
                              <p>{t("The information that will appear under Cancellations")}</p>
                            </div>
                            <div className="col-md-6 ps-4 pe-4">
                              <div className="">
                                <TextareaField type="text" name="cancellation_description" placeholder={t("For example, allergic to latex")} value={formik.values.cancellation_description} label={""} controlId="notifyForm-cancellation_description" />
                                {/* <textarea rows="3" name="terms_and_conditions" placeholder="Terms and Conditions" id="voucherForm-terms_and_conditions" className="form-control p-3 textarea-lg small lh-base">
                                  Any cancellations made prior to 24 hours of your appointment time can be rescheduled. If you cancel your scheduled appointment within 24hrs you will forfeit any deposit paid.
                                </textarea> */}
                                <p className="mb-0 mt-3">Characters left: 120</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-xl-4 border-left px-xxl-5 px-md-4 px-3 py-4">
                          <NotifyPreview preview={isNotifyPreview} currentUser={currentUser} />
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

export default NotificationForm;
