import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, SwitchField, InputFieldImage, TextareaField, SelectField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";
import { BusinessUpdateApi, TimezoneApi } from "store/slices/businessSlice";
import { GetUser } from "store/slices/authSlice";

const BusinessDetailForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const business = currentUser.salon;

  useEffect(() => {
    dispatch(TimezoneApi());
    if (business.logo) {
      dispatch(selectImage({ name: business.logo, size: "", type: "", url: business.logo_url }));
    } else {
      dispatch(removeImage());
    }
  }, [business]);

  const timezone = useSelector((state) => state.business.isTimezone);
  const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const initialValues = {
    image: "",
    business_name: "",
    business_website: "",
    business_phone_number: "",
    business_address: "",
    salon_type: "",
    timezone: "",
  };

  const digitOnly = (value) => /^\d+$/.test(value);
  const decimalOnly = (value) => /^\d{1,6}(\.\d{1,2})?$/.test(value);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().nullable(),
    business_name: Yup.string().trim().max(100).label(t("Business Name")).required(),
    business_website: Yup.string().matches(regMatch, t("Website should be a valid URL")),
    business_address: Yup.string().trim().label(t("Business Location")).required(),
    salon_type: Yup.string().trim().label(t("Business Type")).required(),
    business_phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("Business Phone Number")).required(),
  });
  yupconfig();

  const handleSupplierSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(BusinessUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          dispatch(GetUser());
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
  let timezoneArray = [];
  if (timezone) {
    Object.keys(timezone).map(function (item) {
      timezoneArray.push({ value: item, label: timezone[item] });
    });
  }
  const businesstypeOption = [
    { value: "Unisex", label: t("Unisex") },
    { value: "Ladies", label: t("Ladies") },
    { value: "Gents", label: t("Gents") },
  ];
  const timezoneOption = timezoneArray;
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSupplierSubmit}>
          {(formik) => {
            useEffect(() => {
              if (business) {
                const fields = ["id", "business_name", "business_phone_number", "business_address", "salon_type", "timezone", "business_website"];
                fields.forEach((field) => {
                  formik.setFieldValue(field, business[field] ? business[field] : "", false);
                });
              }
            }, [business]);
            return (
              <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                <div className="input-field">
                  <div className="row">
                    <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                      <h4 className="fw-semibold mb-0">{t("Business Details")}</h4>
                      {/* <p>Add the name and general details of this product.</p> */}
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-8">
                      <div className="mb-3">
                        <InputField type="text" name="business_name" value={formik.values.business_name} label={t("Business Name")} controlId="businessForm-business_name" />
                      </div>
                      <div className="mb-3">
                        <InputField type="text" name="business_website" placeholder="www.thefamousgroup.com.au" value={formik.values.business_website} label={t("Business Website")} controlId="businessForm-business_website" />
                      </div>
                      <div className="mb-3">
                        <InputField type="text" name="business_phone_number" value={formik.values.business_phone_number} mask="999-999-9999" label={t("Business Phone Number")} controlId="businessForm-business_phone_number" />
                      </div>
                      <div className="mb-3">
                        <SelectField name="salon_type" placeholder={t("--Select--")} value={formik.values.salon_type} options={businesstypeOption} label={t("Business Type")} controlId="businessForm-salon_type" />
                      </div>
                      <div className="mb-3">
                        <InputField type="text" name="business_address" value={formik.values.business_address} label={t("Business Location")} controlId="businessForm-business_address" className="business-location" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <div className="row">
                    <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                      <h4 className="fw-semibold mb-0">{t("Localisation")}</h4>
                      {/* <p>Add the pricing details of this product.</p> */}
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-8">
                      <div className="row gx-2">
                        <div className="col-xl-6">
                          <div className="mb-3">
                            <SelectField name="timezone" placeholder={t("--Select--")} value={formik.values.timezone} options={timezoneOption} label={t("Time Zone")} controlId="businessForm-timezone" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <div className="row">
                    <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                      <h4 className="fw-semibold mb-0">{t("Logo")}</h4>
                      {/* <p>{t("Manage stock levels of this product.")}</p> */}
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-8">
                      <InputFieldImage name="logo" accept="image/*" label={t("Add Business Logo")} page="business-form" controlId="businessForm-logo" imagname="" imageurl={business && business.logo_url} />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Save")}
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </React.Fragment>
    </>
  );
};

export default BusinessDetailForm;
