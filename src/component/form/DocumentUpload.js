import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../config";
import yupconfig from "../../yupconfig";

import { clientdocumentStoreApi } from "../../store/slices/clientdocumentSlice";
// import { removeImage } from "../../store/slices/imageSlice";
import PropTypes from "prop-types";
import { ClientdocumentGridViewApi } from "store/slices/clientdocumentSlice";
import { sweatalert } from "component/Sweatalert2";

const DocumentUpload = (props) => {
  const [loading, setLoading] = useState(false);
  //   const rightDrawerOpened = useSelector((state) => state.client.isOpenedAddForm);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const page = props.page;
  const initialValues = {
    photo: "",
  };

  const validationSchema = Yup.object().shape({
    //     first_name: Yup.string().trim().max(100).label(t("First Name")).required(),
  });
  yupconfig();

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }; // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    let myFiles = Array.from(fileUploaded);
    setLoading(true);
    dispatch(clientdocumentStoreApi({ myFiles, client_id: props.client_id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(ClientdocumentGridViewApi({ client_id: props.client_id }));
        sweatalert({ title: t("uploaded"), text: t("Uploaded successfully"), icon: "success" });
      } else if (action.meta.requestStatus === "rejected") {
        if (action.payload.status === 422) {
          let error = action.payload;
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          sweatalert({ title: message.errors.document[0], text: message.errors.document, icon: "error" });
        }
      }
    });
    setLoading(false);
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(formik) => {
          return (
            <>
              <form noValidate onSubmit={formik.handleSubmit} className="photoform">
                {page === "client-adddocumentform-circle" ? (
                  <a className="add-document cursor-pointer" onClick={handleClick}>
                    {props.label}
                  </a>
                ) : (
                  <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={handleClick}>
                    {props.label}
                  </button>
                )}

                <input type="file" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} multiple />
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

DocumentUpload.propTypes = {
  label: PropTypes.string,
  client_id: PropTypes.number,
  page: PropTypes.string,
};

export default DocumentUpload;
