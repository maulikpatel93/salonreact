import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../config";
import yupconfig from "../../../../yupconfig";

import PropTypes from "prop-types";
import { ClientnoteGridViewApi, clientnoteUpdateApi, closeAddNoteForm } from "store/slices/clientnoteSlice";
import { sweatalert } from "component/Sweatalert2";
import { TextareaField } from "component/form/Field";

const NoteUpdate = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const detail = props && props.detail;

  const initialValues = {
    note: "",
  };

  const validationSchema = Yup.object().shape({
    note: Yup.string().trim().label(t("Note")).required(),
  });
  yupconfig();
  
  const handleNoteSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    dispatch(clientnoteUpdateApi({...values , id: detail.id, client_id: detail.client_id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        resetForm();
        dispatch(ClientnoteGridViewApi({ client_id: detail.client_id }));
        dispatch(closeAddNoteForm());
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
    setLoading(false);
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleNoteSubmit}>
        {(formik) => {
          useEffect(() => {
            if(detail.note){
              formik.setFieldValue('note', detail.note, false);
            }
          }, [detail]);
          return (
            <>
              <form noValidate onSubmit={formik.handleSubmit} className="photoform">
                <TextareaField type="text" name="note" placeholder={t("For example, allergic to latex")} value={formik.values.note} label={t("Client Notes")} controlId="clientForm-note" />
                <button type="submit" className="btn btn-primary w-100 btn-md mt-3" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Update")}
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

NoteUpdate.propTypes = {
  detail:PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};

export default NoteUpdate;
