import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, MapAddressField, SelectField, TextareaField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

import { clientUpdateApi, clientDetailApi } from "../../../store/slices/clientSlice";
// import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const ClientEditForm = () => {
  const [loading, setLoading] = useState(false);

  const detail = useSelector((state) => state.client.isDetailData);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  // const handleCloseClientDetailModal = () => {
  //   dispatch(closeClientDetailModal());
  // };

  const initialValues = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    description: "",
    send_sms_notification: "",
    send_email_notification: "",
    recieve_marketing_email: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
    last_name: Yup.string().trim().max(50).label(t("Last Name")).required(),
    email: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
    phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("Mobile")).required(),
    date_of_birth: Yup.string().trim().label(t("Date Of Birth")),
    gender: Yup.string().trim().label(t("Gender")).required().nullable(),
    address: Yup.string().trim().label(t("Address")),
    street: Yup.string().trim().label(t("Street")),
    suburb: Yup.string().trim().label(t("Suburb")),
    state: Yup.string().trim().label(t("State")),
    postcode: Yup.string().trim().max(12).label(t("Postcode")),
    description: Yup.string().trim().label(t("Description")),
    send_sms_notification: Yup.mixed().nullable(),
    send_email_notification: Yup.mixed().nullable(),
    recieve_marketing_email: Yup.mixed().nullable(),
  });
  yupconfig();

  const handleClientSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    setLoading(true);
    try {
      dispatch(clientUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          dispatch(clientDetailApi({ id: action.payload.id }));
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
        } else if (action.meta.requestStatus == "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status == 422) {
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

  const genderOptions = [
    { value: "Male", label: t("Male") },
    { value: "Female", label: t("Female") },
    { value: "Other", label: t("Other") },
  ];

  return (
    <React.Fragment>
      <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClientSubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              const fields = ["id", "first_name", "last_name", "email", "phone_number", "date_of_birth", "gender", "address", "street", "suburb", "state", "postcode", "description", "send_sms_notification", "send_email_notification", "recieve_marketing_email"];
              fields.forEach((field) => {
                if (["send_sms_notification", "send_email_notification", "recieve_marketing_email"].includes(field)) {
                  formik.setFieldValue(field, parseInt(detail[field]), false);
                } else {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                }
              });
              // const checkboxfields = ["send_sms_notification", "send_email_notification", "recieve_marketing_email"];
              // checkboxfields.forEach((field) => setFieldValue(field, detail[field], false));
            }
          }, [detail]);
          return (
            <form noValidate onSubmit={formik.handleSubmit} className="px-1">
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <InputField type="text" name="first_name" value={formik.values.first_name} label={t("First Name")} controlId="clientForm-first_name" />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputField type="text" name="last_name" value={formik.values.last_name} label={t("Last Name")} controlId="clientForm-last_name" />
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <InputField type="text" name="phone_number" value={formik.values.phone_number} mask="999-999-9999" label={t("Mobile")} controlId="clientForm-phone_number" />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputField type="text" name="email" value={formik.values.email} label={t("Email Address")} controlId="clientForm-email" />
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <InputField type="date" name="date_of_birth" value={formik.values.date_of_birth} label={t("Date Of Birth")} controlId="clientForm-date_of_birth" />
                </div>
                <div className="col-sm-6 mb-3">
                  <SelectField name="gender" label={t("Gender")} options={genderOptions} placeholder={t("--Select--")} controlId="clientForm-gender" />
                </div>
              </div>
              <div className="mb-3">
              <MapAddressField name="address" label={t("Address")} value={formik.values.address} placeholder={t("Start typing address")} controlId="clientForm-address" />
              </div>
              <div className="row gx-2">
                <div className="mb-3">
                  <InputField type="text" name="street" value={formik.values.street} label={t("Street")} controlId="clientForm-street" />
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <InputField type="text" name="suburb" value={formik.values.suburb} label={t("Suburb")} controlId="clientForm-suburb" />
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <InputField type="text" name="state" value={formik.values.state} label={t("State")} controlId="clientForm-state" />
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <InputField type="text" name="postcode" value={formik.values.postcode} label={t("Postcode")} controlId="clientForm-postcode" />
                </div>
              </div>
              <div className="mb-3">
                <TextareaField type="text" name="description" placeholder={t('client_note_placeholder')} value={formik.values.description} label={t("Client Notes")} controlId="clientForm-description" />
              </div>
              <div className="mb-3">
                <label htmlFor="">{t("Notifications")}</label>
                <SwitchField
                  name="send_sms_notification"
                  label={t("Send SMS notifications to client")}
                  controlId="clientForm-send_sms_notification"
                  value="1"
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setTimeout(() => {
                        formik.setFieldValue("send_sms_notification", 1, false);
                      }, 100);
                    } else {
                      setTimeout(() => {
                        formik.setFieldValue("send_sms_notification", "", false);
                      }, 100);
                    }
                    formik.handleChange(e);
                  }}
                />
                <SwitchField
                  name="send_email_notification"
                  label={t("Send email notifications to client")}
                  controlId="clientForm-send_email_notification"
                  value="1"
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setTimeout(() => {
                        formik.setFieldValue("send_email_notification", 1, false);
                      }, 100);
                    } else {
                      setTimeout(() => {
                        formik.setFieldValue("send_email_notification", "", false);
                      }, 100);
                    }
                    formik.handleChange(e);
                  }}
                />
                <SwitchField
                  name="recieve_marketing_email"
                  label={t("Client agrees to receive marketing emails")}
                  controlId="clientForm-recieve_marketing_email"
                  value="1"
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setTimeout(() => {
                        formik.setFieldValue("recieve_marketing_email", 1, false);
                      }, 100);
                    } else {
                      setTimeout(() => {
                        formik.setFieldValue("recieve_marketing_email", "", false);
                      }, 100);
                    }
                    formik.handleChange(e);
                  }}
                />
              </div>
              <div className="col-md-12 pe-2">
                <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Update Client")}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ClientEditForm;
