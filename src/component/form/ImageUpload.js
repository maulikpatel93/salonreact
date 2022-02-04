import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../config";
import yupconfig from "../../yupconfig";
import { sweatalert } from "component/Sweatalert2";

import { clientphotoStoreApi } from "../../store/slices/clientSlice";
// import { removeImage } from "../../store/slices/imageSlice";
import useScriptRef from "../../hooks/useScriptRef";
import PropTypes from "prop-types";

const ImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  //   const rightDrawerOpened = useSelector((state) => state.client.isOpenedAddForm);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const initialValues = {
    photo: "",
  };

  const validationSchema = Yup.object().shape({
    //     first_name: Yup.string().trim().max(50).label(t("first_name")).required(),
  });
  yupconfig();

  const handleClientSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(clientStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("uploaded"), text: t("uploaded_successfully"), icon: "success" });
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

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }; // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    let myFiles = Array.from(fileUploaded);
//     console.log(myFiles);
    dispatch(clientphotoStoreApi({ fileUploaded: fileUploaded, id: props.client_id }));
//     console.log(event.target.files);
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClientSubmit}>
        {(formik) => {
          return (
            <>
              <form noValidate onSubmit={formik.handleSubmit} className="photoform">
                <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={handleClick}>
                  {props.label}
                </button>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} multiple />
                <button type="submit" className="btn btn-primary w-100 btn-lg d-none" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  {t("Upload")}
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  client_id: PropTypes.number,
};

export default ImageUpload;
