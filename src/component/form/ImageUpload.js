import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../config";
import yupconfig from "../../yupconfig";

import { clientphotoStoreApi } from "../../store/slices/clientphotoSlice";
// import { removeImage } from "../../store/slices/imageSlice";
import PropTypes from "prop-types";
import { ClientphotoGridViewApi } from "store/slices/clientphotoSlice";
import { sweatalert } from "component/Sweatalert2";

const ImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  //   const rightDrawerOpened = useSelector((state) => state.client.isOpenedAddForm);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const page = props.page;
  const initialValues = {
    photo: "",
  };

  const validationSchema = Yup.object().shape({
    //     first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
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
    dispatch(clientphotoStoreApi({ myFiles, client_id: props.client_id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(ClientphotoGridViewApi({ client_id: props.client_id }));
        sweatalert({ title: t("uploaded"), text: t("Uploaded successfully"), icon: "success" });
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
                {page === "client-addphotoform-circle" ? (
                  <a className="add-document cursor-pointer" onClick={handleClick}>
                    {props.label}
                  </a>
                ) : (
                  <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={handleClick}>
                    {props.label}
                  </button>
                )}
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
  page: PropTypes.string,
};

export default ImageUpload;
