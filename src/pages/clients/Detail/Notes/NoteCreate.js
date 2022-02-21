import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../config";
import yupconfig from "../../../../yupconfig";

import PropTypes from "prop-types";
import { clientnoteGridViewApi, clientnoteStoreApi, closeAddNoteForm } from "store/slices/clientnoteSlice";
import { sweatalert } from "component/Sweatalert2";
import { TextareaField } from "component/form/Field";

const NoteCreate = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    note: "",
  };

  const validationSchema = Yup.object().shape({
    note: Yup.string().trim().max(50).label(t("Note")).required(),
  });
  yupconfig();
  
  const handleNoteSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    dispatch(clientnoteStoreApi({...values , client_id: props.client_id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        resetForm();
        dispatch(clientnoteGridViewApi({ client_id: props.client_id }));
        dispatch(closeAddNoteForm());
        sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
      } else if (action.meta.requestStatus === "rejected") {
        const status = action.payload && action.payload.status;
        const errors = action.payload && action.payload.message && action.payload.message.errors;
        if (status == 422) {
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
          return (
            <>
              <form noValidate onSubmit={formik.handleSubmit} className="photoform">
                <TextareaField type="text" name="note" placeholder={t('client_note_placeholder')} value={formik.values.note} label={t("Client Notes")} controlId="clientForm-note" />
                <button type="submit" className="btn btn-primary w-100 btn-md mt-3" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Add")}
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

NoteCreate.propTypes = {
  label: PropTypes.string,
  client_id: PropTypes.number,
};

export default NoteCreate;
