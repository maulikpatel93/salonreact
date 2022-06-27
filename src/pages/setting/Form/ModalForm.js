import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import config from "../../../config";
import { OpenedEditHandleForm } from "store/slices/formSlice";

const ModalForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.form.isOpenedEditHandleForm);
  const HandleFormDetail = useSelector((state) => state.form.isHandleFormDetailData);

  console.log(HandleFormDetail);
  const modalshow = rightDrawerOpened ? "show" : "";
  const modaldisplay = rightDrawerOpened ? "block" : "none";

  const initialValues = {
    value: "",
  };
  const validationSchema = Yup.object().shape({
    value: Yup.string().trim().max(50).label(t("This Field")).required(),
  });
  yupconfig();

  const handleFormSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(FormStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          reset();
          dispatch(CloseAddFormForm());
          setStatus({ success: true });
          setLoading(false);
          // sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
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
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {(formik) => {
            // console.log(formik.errors);
            return (
              <div className={"modal Edit-modal black-backdrop edit-paradetails-modal " + modalshow} id="editParaDetailModal" style={{ display: modaldisplay }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <div className="modal-header border-0">
                        <h3 className="modal-title fw-semibold mb-2">{t("Edit")}</h3>
                      </div>
                      <div className="modal-body">
                        {HandleFormDetail.form_type === "text" && <InputField type="text" name="value" label={t(HandleFormDetail.name)} className="form-control" placeholder={t(HandleFormDetail.caption)} controlId="ModalForm-value" />}
                        {HandleFormDetail.form_type === "date" && <InputField type="date" name="value" label={t(HandleFormDetail.name)} className="form-control" placeholder={t(HandleFormDetail.caption)} controlId="ModalForm-value" />}
                        {HandleFormDetail.form_type === "textarea" && <TextareaField name="value" label={t(HandleFormDetail.name)} placeholder={t(HandleFormDetail.caption)} value={formik.values.reason} controlId="ModalForm-value" />}
                      </div>
                      <div className="modal-footer border-0">
                        <a
                          className="btn me-1 cursor-pointer btn-cancel"
                          onClick={() => {
                            dispatch(OpenedEditHandleForm(""));
                          }}
                        >
                          {t("Cancel")}
                        </a>
                        <button type="submit" className="save btn btn-primary fw-semibold" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Save")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    </>
  );
};

export default ModalForm;
