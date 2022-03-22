import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { sweatalert } from "../../../component/Sweatalert2";
import { saleStoreApi } from "../../../store/slices/saleSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const SaleAddForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  
  const initialValues = {
    first_name: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(saleStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddsaleForm());
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
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
          useEffect(() => {}, []);
          return (
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className="drawer-footer text-center">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Create sale Member")}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default SaleAddForm;
