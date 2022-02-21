import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeEditCategoryForm, categoryUpdateApi } from "../../../store/slices/categorySlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const CategoryEditForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.category.isOpenedEditForm);
  const detail = useSelector((state) => state.category.isDetailData);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseEditCategoryForm = () => {
    dispatch(closeEditCategoryForm());
    dispatch({ type: "category/detail/rejected" });
  };
  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("Category_name")).required(),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(categoryUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeEditCategoryForm());
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
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

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              if (detail.logo) {
                dispatch(selectImage({ name: detail.logo, size: "", type: "", url: detail.logo_url }));
              }
              const fields = ["id", "name"];
              fields.forEach((field) => {
                formik.setFieldValue(field, detail[field], false);
              });
            }
          }, [detail]);
          return (
            <div className={rightDrawerOpened ? "modal fade show" : "modal fade"} id="edit-category" tabIndex="-1" aria-labelledby="editcategoryModalLabel" aria-hidden="true" style={{ display: rightDrawerOpened ? "block" : "none" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                  <button type="button" className="close me-md-4 me-3 mt-md-4 mt-3" onClick={handleCloseEditCategoryForm}>
                    <img src={config.imagepath + "close-icon.svg"} alt="" />
                  </button>
                  <div className="modal-body p-md-4 p-3">
                    <h4 className="mb-2">{t("Edit_category")}</h4>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <InputField type="text" name="name" value={formik.values.name} label={t("Category_name")} controlId="categoryForm-name" />
                      <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Save")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default CategoryEditForm;
