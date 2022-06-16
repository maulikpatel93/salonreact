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
import { CloseAddConsultationForm, ConsultationStoreApi, HandleFormData, HandleFormDataDelete, OpenedEditHandleForm, reset } from "store/slices/consultationSlice";
import config from "../../../config";

const ConsultationAddForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.consultation.isOpenedAddForm);
  const isHandleFormData = useSelector((state) => state.consultation.isHandleFormData);

  const initialValues = {
    title: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().max(50).label(t("Title")).required(),
  });
  yupconfig();

  const handleConsultationSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(ConsultationStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          reset();
          dispatch(CloseAddConsultationForm());
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

  let clientDetailObj = [
    {
      uniqueName: "first_name",
      title: t("First Name"),
      image: config.imagepath + "User-Name.png",
      inputype: "text",
    },
    {
      uniqueName: "last_name",
      title: t("Last Name"),
      image: config.imagepath + "User-Name.png",
      inputype: "text",
    },
    {
      uniqueName: "email",
      title: t("Email"),
      image: config.imagepath + "Email.png",
      inputype: "email",
    },
    {
      uniqueName: "mobile",
      title: t("Mobile"),
      image: config.imagepath + "Mobile.png",
      inputype: "text",
    },
    {
      uniqueName: "address",
      title: t("Address Name"),
      image: config.imagepath + "Address.png",
      inputype: "textarea",
    },
    {
      uniqueName: "birthday",
      title: t("Birthday"),
      image: config.imagepath + "Birthday.png",
      inputype: "date",
    },
  ];

  let formsectionObj = [
    {
      uniqueName: "Heading",
      title: t("Heading"),
      image: config.imagepath + "Heading.png",
    },
    {
      uniqueName: "text_block",
      title: t("Text Block"),
      image: config.imagepath + "Text-Block.png",
    },
    {
      uniqueName: "drop_down",
      title: t("Drop Down"),
      image: config.imagepath + "Drop-Down.png",
    },
    {
      uniqueName: "multiple_choice",
      title: t("Multiple-Choice"),
      image: config.imagepath + "Multiple-Choice.png",
    },
    {
      uniqueName: "short_answer",
      title: t("Short Answer"),
      image: config.imagepath + "Short-Answer.png",
    },
    {
      uniqueName: "long_answer",
      title: t("Long Answer"),
      image: config.imagepath + "Long-Answer.png",
    },
    {
      uniqueName: "yes_or_no",
      title: t("Yes or No"),
      image: config.imagepath + "Yes-or-No.png",
    },
    {
      uniqueName: "checkbox",
      title: t("Checkbox"),
      image: config.imagepath + "Checkbox.png",
    },
  ];

  const handleFormData = (obj) => {
    dispatch(HandleFormData(obj));
  };
  console.log(isHandleFormData);
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleConsultationSubmit}>
          {(formik) => {
            // console.log(formik.errors);
            return (
              <div className={"full-screen-drawer p-0 editconsulationform-drawer " + rightDrawerOpened} id="editconsulationform-drawer">
                <div className="drawer-wrp position-relative">
                  <form noValidate onSubmit={formik.handleSubmit} className="position-relative">
                    <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                      <h3 className="mb-0 fw-semibold">{t("Create Consultation Form")}</h3>
                      <div className="ms-auto">
                        <a className="close btn btn-secondary me-1 cursor-pointer" onClick={() => dispatch(CloseAddConsultationForm())}>
                          {t("Cancel")}
                        </a>
                        <a href="#ConsultationPreviewModal" data-bs-toggle="modal" data-bs-target="#ConsultationPreviewModal" className="preview btn me-1 cursor-pointer btn-preview">
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
                                  let title = clientDetailObj[item].title;
                                  let image = clientDetailObj[item].image;
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
                                  let title = formsectionObj[item].title;
                                  let image = formsectionObj[item].image;
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
                              <InputField type="text" name="title" className="form-control" placeholder={t("Title")} />
                              {/* <div className="form-header"><h3 className="mb-0">Consent Form for Beauty Records</h3></div> */}
                            </div>
                            <div className="form-body">
                              {isHandleFormData.length > 0 &&
                                Object.keys(isHandleFormData).map((item, i) => {
                                  let title = isHandleFormData[item].title;
                                  let uniqueName = isHandleFormData[item].uniqueName;
                                  let inputype = isHandleFormData[item].inputype;
                                  return (
                                    <div className="drawer-form-box  mb-3" key={i}>
                                      <div className="drawer-box-wrapper">
                                        <div className="drawer-box-header">
                                          <div className="row align-items-center">
                                            <div className="col-xxl-8 col-md-8 col-6 drawer-box-heading">
                                              <label className="form-label">{title}</label>
                                            </div>
                                            <div className="col-xxl-4 col-md-4 col-6 text-end">
                                              <a className="edit me-1 cursor-pointer" onClick={() => dispatch(OpenedEditHandleForm("open"))}>
                                                {t("Edit")}
                                              </a>
                                              <a className="delete cursor-pointer" onClick={() => dispatch(HandleFormDataDelete(uniqueName))}>
                                                <i className="fas fa-trash-alt text-sm"></i>
                                              </a>
                                            </div>
                                          </div>
                                          {/* <div className="drawer-box-detail">
                                            <h2 className="mb-0 mt-2">Add a heading for the section</h2>
                                          </div> */}
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

        <div className="modal Edit-modal black-backdrop edit-paradetails-modal" id="editParaDetailModal">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-0">
                <h3 className="modal-title fw-semibold mb-2">Edit</h3>
                <p>Add a paragraph of text</p>
                <p className="para-box">We take your privacy seriously. For the safety of our clients, we maintain records of any health or medical conditions which may indicate that a particular service or treatment should not go ahead (eg allergies, pregnancy, skin conditions) or a particular product should not be used (eg products containing nuts, fish oils etc). These health records are not used for any other purpose. Client records are held securely within our salon software system and can only be seen by members of the salon team.</p>
              </div>
              <div className="ms-auto mt-4">
                <a className="btn me-1 cursor-pointer btn-cancel" data-bs-dismiss="modal">
                  Cancel
                </a>
                <a className="save btn btn btn-primary">Save</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default ConsultationAddForm;
