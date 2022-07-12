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
import { CloseEditCancellationreasonForm, CancellationreasonUpdateApi, reset } from "store/slices/cancellationreasonSlice";
import moment from "moment";

const CancellationreasonEditForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.cancellationreason.isOpenedEditForm);
  const detail = useSelector((state) => state.cancellationreason.isDetailData);

  const initialValues = {
    reason: "",
  };
  const validationSchema = Yup.object().shape({
    reason: Yup.string().trim().max(100).label(t("Reason")).required(),
  });
  yupconfig();

  const handleClosedDateSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(CancellationreasonUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          reset();
          dispatch(CloseEditCancellationreasonForm());
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
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClosedDateSubmit}>
          {(formik) => {
            useEffect(() => {
              if (detail) {
                const fields = ["id", "reason"];
                fields.forEach((field) => {
                  // if (["start_date", "end_date"].includes(field)) {
                  //   let detail_field = detail[field] ? moment(detail[field]).format("dddd, DD MMMM YYYY") : "";
                  //   formik.setFieldValue(field, formik.values[field] ? formik.values[field] : detail_field, false);
                  // } else {
                  //   formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                  // }
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                });
              }
            }, [detail]);
            return (
              <div className={"full-screen-drawer p-0 addcancellationreason-drawer " + rightDrawerOpened} id="addcancellationreason-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                    <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                      <h3 className="mb-0 fw-semibold">{t("Add Closed Date")}</h3>
                      <div className="ms-auto">
                        <a className="close btn me-1 cursor-pointer" onClick={() => dispatch(CloseEditCancellationreasonForm())}>
                          {t("Cancel")}
                        </a>
                      </div>
                    </div>
                    <div className="drawer-body px-md-4 px-3 pt-2">
                      <div className="row align-content-center">
                        <div className="mb-4 col-md-12">
                          <TextareaField type="text" name="reason" placeholder={t("Add an explanation, for example “Public Holiday")} value={formik.values.reason} label={t("Reason for Closure")} controlId="clientForm-reason" />
                        </div>
                        <div>
                          <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Update Closed Date")}
                          </button>
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

export default CancellationreasonEditForm;
