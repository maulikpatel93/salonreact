import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import yupconfig from "../../../yupconfig";
import useScriptRef from "../../../hooks/useScriptRef";
import { SaleEmailInvoiceApi } from "store/slices/saleSlice";
import { sweatalert } from "../../../component/Sweatalert2";

const SaleEmailInvoice = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const SaleCompletedData = props.isSaleCompletedData;
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(SaleEmailInvoiceApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Invoice Sent"), text: t("Invoice Sent Successfully"), icon: "success" });
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
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("SaleCompletedData", SaleCompletedData && JSON.stringify(SaleCompletedData));
          }, [SaleCompletedData]);
          return (
            <form noValidate onSubmit={formik.handleSubmit} className="w-100 mt-lg-0 mt-2">
              <div className="d-flex align-items-end">
                <div className="w-100">
                  <label htmlFor="">{t("Email Invoice")}</label>
                  <Field type="text" name="email" value={formik.values.email} placeholder="josmith@gmail.com" label={t("Email Invoice")} className={formik.touched.email && formik.errors.email ? "form-control is-invalid p-3" : "form-control p-3"} />
                </div>
                <button type="submit" className="btn btn-dark ms-3 p-3 fo" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Send")}
                </button>
              </div>
              <div className="invalid-feedback d-block">
                <ErrorMessage name="email" />
              </div>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
SaleEmailInvoice.propTypes = {
  isSaleCompletedData: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default SaleEmailInvoice;
