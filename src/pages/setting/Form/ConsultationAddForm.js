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
import { CloseAddFormForm, FormStoreApi, HandleFormData, HandleFormDataDelete, HandleFormDetailData, OpenedEditHandleForm, reset } from "store/slices/formSlice";
import config from "../../../config";
import ModalForm from "./ModalForm";

const ConsultationAddForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.form.isOpenedAddForm);
  const isHandleFormData = useSelector((state) => state.form.isHandleFormData);
  const isFormElementTypeObjectData = useSelector((state) => state.form.isFormElementTypeListView);
  const clientDetailObj = isFormElementTypeObjectData.length > 0 ? isFormElementTypeObjectData.filter((item) => item.section_type === "ClientDetail") : "";
  const formsectionObj = isFormElementTypeObjectData.length > 0 ? isFormElementTypeObjectData.filter((item) => item.section_type === "FormSection") : "";
  const modalform = useSelector((state) => state.form.isOpenedEditHandleForm);

  const initialValues = {
    title: "",
    formdata: [],
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().max(50).label(t("Title")).required(),
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

  const handleFormData = (obj) => {
    dispatch(HandleFormData(obj));
  };
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {(formik) => {
            useEffect(() => {
              {
                isHandleFormData.length > 0 &&
                  Object.keys(isHandleFormData).map((item, i) => {
                    let id = isHandleFormData[item].id;
                    let title = isHandleFormData[item].name;
                    let section_type = isHandleFormData[item].section_type;
                    let caption = isHandleFormData[item].caption;
                    formik.setFieldValue("formdata[" + i + "][form_element_type_id]", id);
                    formik.setFieldValue("formdata[" + i + "][section_type]", section_type);
                    formik.setFieldValue("formdata[" + i + "][title]", title);
                  });
              }
            }, [isHandleFormData]);
            console.log(formik.values);
            return (
              <div className={"full-screen-drawer p-0 editconsulationform-drawer " + rightDrawerOpened} id="editconsulationform-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                    <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                      <h3 className="mb-0 fw-semibold">{t("Create Consultation Form")}</h3>
                      <div className="ms-auto">
                        <a className="close btn btn-secondary me-1 cursor-pointer" onClick={() => dispatch(CloseAddFormForm())}>
                          {t("Cancel")}
                        </a>
                        <a href="#FormPreviewModal" data-bs-toggle="modal" data-bs-target="#FormPreviewModal" className="preview btn me-1 cursor-pointer btn-preview">
                          {t("Preview")}
                        </a>
                        <button type="submit" className="save btn btn-primary fw-semibold" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Save")}
                        </button>
                      </div>
                    </div>
                    <div className="drawer-body">
                      <div className="row mx-0">
                        <div className="col-xl-3 left-content bg-white text-md-start text-center">
                          <div className="box-wrapper col-12">
                            <h4 className="fw-semibold mb-2">{t("Client Details")}</h4>
                            <h6>{t("Select which details you wish the client to enter")}</h6>
                            <div className="row">
                              {clientDetailObj.length > 0 &&
                                Object.keys(clientDetailObj).map((item, i) => {
                                  let title = clientDetailObj[item].name;
                                  let image = config.imagepath + clientDetailObj[item].icon;
                                  //console.log(clientDetailObj[item]);
                                  return (
                                    <div className="col-sm-4 col-6" key={i}>
                                      <a className="box-image-cover cursor-pointer" onClick={() => handleFormData(clientDetailObj[item])}>
                                        <div className="tabs-image">
                                          <img src={image} alt="" />
                                        </div>
                                        <div className="image-content">
                                          <span>{title}</span>
                                        </div>
                                      </a>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div className="box-wrapper col-12 mt-2">
                            <h4 className="fw-semibold mb-2">{t("Form Sections")}</h4>
                            <h6 className="mb-4">{t("Add sections to your form")}</h6>
                            <div className="row">
                              {formsectionObj.length > 0 &&
                                Object.keys(formsectionObj).map((item, i) => {
                                  let title = formsectionObj[item].name;
                                  let image = config.imagepath + formsectionObj[item].icon;
                                  return (
                                    <div className="col-sm-4 col-6" key={i}>
                                      <a className="box-image-cover cursor-pointer" onClick={() => handleFormData(formsectionObj[item])}>
                                        <div className="tabs-image">
                                          <img src={image} alt="" />
                                        </div>
                                        <div className="image-content">
                                          <span>{title}</span>
                                        </div>
                                      </a>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-9 right-content">
                          <div className="mx-auto col-xxl-6 col-lg-8">
                            <div className="drawer-form-box mb-3">
                              <InputField type="text" name="title" className="form-control" placeholder={t("Consent Form for a Beauty Records")} />
                              {/* <div className="form-header"><h3 className="mb-0">Consent Form for Beauty Records</h3></div> */}
                            </div>
                            <div className="form-body">
                              {isHandleFormData.length > 0 &&
                                Object.keys(isHandleFormData).map((item, i) => {
                                  let id = isHandleFormData[item].id;
                                  let title = isHandleFormData[item].name;
                                  let section_type = isHandleFormData[item].section_type;
                                  let caption = isHandleFormData[item].caption;

                                  return (
                                    <div className="drawer-form-box  mb-3" key={i}>
                                      <div className="drawer-box-wrapper">
                                        <div className="drawer-box-header">
                                          <div className="row align-items-center">
                                            <div className="col-xxl-8 col-md-8 col-6 drawer-box-heading">
                                              <label className="form-label">{title}</label>
                                            </div>
                                            <div className="col-xxl-4 col-md-4 col-6 text-end">
                                              {section_type === "FormSection" && (
                                                <a
                                                  className="edit me-1 cursor-pointer"
                                                  onClick={() => {
                                                    dispatch(HandleFormDetailData(isHandleFormData[item]));
                                                    dispatch(OpenedEditHandleForm("open"));
                                                  }}
                                                >
                                                  {t("Edit")}
                                                </a>
                                              )}
                                              <a className="delete cursor-pointer" onClick={() => dispatch(HandleFormDataDelete({id, i}))}>
                                                <i className="fas fa-trash-alt text-sm"></i>
                                              </a>
                                            </div>
                                          </div>
                                          {/* <div className="drawer-box-detail">
                                            <h2 className="mb-0 mt-2">Add a heading for the section</h2>
                                          </div> */}
                                        </div>
                                        <div className="drawer-box-detail">
                                          <h2 className="mb-0 mt-2">{caption}</h2>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              {isHandleFormData.length === 0 && (
                                <div className="drawer-form-nofound">
                                  <img src={config.imagepath + "consulatation_nofound.png"} className="mb-2" />
                                  <h3 className="mb-0 fw-bold">Add your first section</h3>
                                  <h6 className="mb-0">Select your first section to add to the form</h6>
                                </div>
                              )}
                            </div>
                          </div>
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
      {modalform && <ModalForm />}
    </>
  );
};

export default ConsultationAddForm;
