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
import { CloseAddFormForm, FormElementDelete, FormUpdateApi, HandleFormData, HandleFormDataDelete, HandleFormDetailData, OpenedEditHandleForm, OpenedPreviewForm, reset } from "store/slices/formSlice";
import config from "../../../config";
import ModalForm from "./ModalForm";
import PreviewForm from "./PreviewForm";

const ConsultationEditForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.form.isOpenedEditForm);
  const isHandleFormData = useSelector((state) => state.form.isHandleFormData);
  const isFormElementTypeObjectData = useSelector((state) => state.form.isFormElementTypeListView);
  const clientDetailObj = isFormElementTypeObjectData.length > 0 ? isFormElementTypeObjectData.filter((item) => item.section_type === "ClientDetail") : "";
  const formsectionObj = isFormElementTypeObjectData.length > 0 ? isFormElementTypeObjectData.filter((item) => item.section_type === "FormSection") : "";
  const modalform = useSelector((state) => state.form.isOpenedEditHandleForm);
  const detail = useSelector((state) => state.form.isDetailData);
  const isFormElementDelete = useSelector((state) => state.form.isFormElementDelete);
  const previewform = useSelector((state) => state.form.isOpenedPreviewForm);

  const initialValues = {
    title: "",
    formdata: [],
    delete_form_element_id: [],
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().max(50).label(t("Title")).required(),
    formdata: Yup.array()
      .of(
        Yup.object().shape({
          form_element_type_id: Yup.string().required(t("Required")), // these constraints take precedence
          section_type: Yup.string().required(t("Required")), // these constraints take precedence
          title: Yup.string().required(t("Required")), // these constraints take precedence
          is_edit: Yup.bool().required(t("Required")), // these constraints take precedence
          form_type: Yup.string().required(t("Required")), // these constraints take precedence
          question: Yup.string().when(["is_edit"], {
            is: true,
            then: Yup.string().required(t("Question Or Text")), // these constraints take precedence
          }),
          options: Yup.array().when(["form_type"], {
            is: (sck) => {
              if (sck === "select" || sck === "multicheckbox" || sck === "radio") {
                return true;
              }
              return false;
            },
            then: Yup.array()
              .of(
                Yup.object().shape({
                  optvalue: Yup.string().required(t("Required")), // these constraints take precedence
                }),
              )
              .required(t("Must have options"))
              .min(1, t("Minimum of 1 options")),
            // otherwise: Yup.mixed().nullable(),
          }),
        }),
      )
      .min(1, t("Required")),
  });
  yupconfig();

  const handleFormSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(FormUpdateApi(values)).then((action) => {
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
  // console.log(clientDetailObj);
  // console.log(detail);
  // console.log(isHandleFormData);
  const handleFormData = (obj) => {
    dispatch(HandleFormData(obj));
  };

  // useEffect(() => {
  //   if (detail) {
  //     let formelementObj = detail.form_element;
  //     if (formelementObj.length > 0) {
  //       Object.keys(formelementObj).map((item) => {
  //         let obj = { ...formelementObj[item].form_element_type, question: formelementObj[item].question, options: formelementObj[item].form_element_options };
  //         dispatch(HandleFormData(obj));
  //       });
  //     }
  //   }
  // }, [detail]);
  //console.log(isHandleFormData);
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {(formik) => {
            useEffect(() => {
              if (detail) {
                const fields = ["id", "title"];
                fields.forEach((field) => {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                });
                let formelementObj = detail.form_element;
                if (formelementObj.length > 0) {
                  Object.keys(formelementObj).map((item) => {
                    let obj = { ...formelementObj[item].form_element_type, question: formelementObj[item].question, options: formelementObj[item].form_element_options, form_element_id: formelementObj[item].id, form_id: formelementObj[item].form_id };
                    dispatch(HandleFormData(obj));
                  });
                }
              }
            }, [detail]);
            useEffect(() => {
              if (isHandleFormData.length > 0) {
                Object.keys(isHandleFormData).map((item, i) => {
                  let id = isHandleFormData[item].id;
                  let title = isHandleFormData[item].name;
                  let section_type = isHandleFormData[item].section_type;
                  let question = isHandleFormData[item].question ? isHandleFormData[item].question : "";
                  let form_id = isHandleFormData[item].form_id ? isHandleFormData[item].form_id : "";
                  let form_element_id = isHandleFormData[item].form_id ? isHandleFormData[item].form_element_id : "";
                  let is_edit = isHandleFormData[item].is_edit;
                  let form_type = isHandleFormData[item].form_type;
                  let options = isHandleFormData[item].options ? isHandleFormData[item].options : [];
                  if (question) {
                    setTimeout(() => {
                      formik.setFieldTouched("formdata[" + i + "][question]", true);
                    }, 100);
                  }
                  if (options.length > 0) {
                    setTimeout(() => {
                      formik.setFieldTouched("formdata[" + i + "][options]", true);
                    }, 100);
                  }
                  formik.setFieldValue("formdata[" + i + "][form_element_type_id]", id);
                  formik.setFieldValue("formdata[" + i + "][section_type]", section_type);
                  formik.setFieldValue("formdata[" + i + "][title]", title);
                  formik.setFieldValue("formdata[" + i + "][is_edit]", is_edit);
                  formik.setFieldValue("formdata[" + i + "][form_type]", form_type);
                  formik.setFieldValue("formdata[" + i + "][question]", question);
                  formik.setFieldValue("formdata[" + i + "][form_id]", form_id);
                  formik.setFieldValue("formdata[" + i + "][form_element_id]", form_element_id);
                  formik.setFieldValue("formdata[" + i + "][options]", options.length > 0 ? options : []);
                });
              }
            }, [isHandleFormData]);

            useEffect(() => {
              if (isFormElementDelete) {
                formik.setFieldValue("delete_form_element_id", isFormElementDelete.length > 0 ? isFormElementDelete : [], false);
              }
            }, [isFormElementDelete]);

            // console.log(formik.values);
            // console.log(typeof formik.errors.formdata);
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
                        <a className="preview btn me-1 cursor-pointer btn-preview" onClick={() => dispatch(OpenedPreviewForm("open"))}>
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
                                  let form_type = isHandleFormData[item].form_type;
                                  let is_edit = isHandleFormData[item].is_edit;
                                  let form_id = isHandleFormData[item].form_id ? isHandleFormData[item].form_id : "";
                                  let form_element_id = isHandleFormData[item].form_id ? isHandleFormData[item].form_element_id : "";

                                  let question = isHandleFormData[item].question ? isHandleFormData[item].question : isHandleFormData[item].questionholder;
                                  let options = isHandleFormData[item].options ? isHandleFormData[item].options : [];
                                  let question_error = formik.errors.formdata && formik.errors.formdata[i] && formik.errors.formdata[i].question;
                                  let options_error = formik.errors.formdata && formik.errors.formdata[i] && formik.errors.formdata[i].options;

                                  let errormsg = "";
                                  if (question_error && options_error) {
                                    errormsg = t("Please add {{ question_error }} and {{ options_error }}", { question_error: question_error, options_error: options_error });
                                  } else if (question_error && !options_error) {
                                    errormsg = t("Please add {{ question_error }}", { question_error: question_error });
                                  } else if (!question_error && options_error) {
                                    errormsg = t("Please add {{ options_error }}", { options_error: options_error });
                                  }
                                  return (
                                    <div className="drawer-form-box  mb-3" key={i}>
                                      <div className="drawer-box-wrapper">
                                        <div className="drawer-box-header">
                                          <div className="row align-items-center">
                                            <div className="col-xxl-8 col-md-8 col-6 drawer-box-heading">
                                              <label className="form-label">{title}</label>
                                              {/* <InputField type="text" name={"formdata[" + i + "][form_element_type_id]"} className="form-control" value={formik.values.formdata[i] && formik.values.formdata[i].form_element_type_id} />
                                              <InputField type="text" name={"formdata[" + i + "][is_edit]"} className="form-control" value={formik.values.formdata[i] && formik.values.formdata[i].is_edit} />
                                              <InputField type="text" name={"formdata[" + i + "][form_type]"} className="form-control" value={formik.values.formdata[i] && formik.values.formdata[i].form_type} />
                                              <InputField type="text" name={"formdata[" + i + "][question]"} className="form-control" value={formik.values.formdata[i] && formik.values.formdata[i].question} /> */}
                                            </div>
                                            <div className="col-xxl-4 col-md-4 col-6 text-end">
                                              {is_edit === 1 && (
                                                <a
                                                  className="edit me-1 cursor-pointer"
                                                  onClick={() => {
                                                    dispatch(HandleFormDetailData({ ...isHandleFormData[item], index: i }));
                                                    dispatch(OpenedEditHandleForm("open"));
                                                  }}
                                                >
                                                  {t("Edit")}
                                                </a>
                                              )}
                                              <a
                                                className="delete cursor-pointer"
                                                onClick={() => {
                                                  // console.log("values", formik.values);
                                                  dispatch(HandleFormDataDelete({ id, i }));
                                                  dispatch(FormElementDelete({ form_element_id, form_id }));
                                                  formik.setValues({ ...formik.values, formdata: formik.values.formdata ? formik.values.formdata.filter((newE, j) => j !== i) : [] });
                                                }}
                                              >
                                                <i className="fas fa-trash-alt text-sm"></i>
                                              </a>
                                            </div>
                                          </div>
                                          {/* <div className="drawer-box-detail">
                                            <h2 className="mb-0 mt-2">Add a heading for the section</h2>
                                          </div> */}
                                        </div>
                                        <div className="drawer-box-detail">
                                          <h2 className="mb-0 mt-2">{question}</h2>
                                          {errormsg && <p className="mb-0 invalid-feedback d-block">{errormsg}</p>}
                                          {options.length > 0 && (
                                            <div className="row d-flex flex-wrap align-items-center">
                                              <div className="col-auto">
                                                <p className="mb-0 mt-2">{t("Option List")}</p>
                                              </div>
                                              <div className="col-auto">
                                                {form_type === "select" && (
                                                  <select className="form-select mt-3">
                                                    {Object.keys(options).map((item, j) => {
                                                      return (
                                                        <option value={options[item].optvalue} key={j}>
                                                          {options[item].optvalue}
                                                        </option>
                                                      );
                                                    })}
                                                  </select>
                                                )}
                                                {form_type === "multicheckbox" && (
                                                  <div className="mt-3">
                                                    {Object.keys(options).map((item, j) => {
                                                      return (
                                                        <div className="form-check" key={j}>
                                                          <input className="form-check-input" disabled type="checkbox" value={options[item].optvalue} id="flexCheckDefault" />
                                                          <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            {options[item].optvalue}
                                                          </label>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                )}
                                                {form_type === "radio" && (
                                                  <div className="mt-3">
                                                    {Object.keys(options).map((item, j) => {
                                                      return (
                                                        <div className="form-check" key={j}>
                                                          <input className="form-check-input" disabled type="radio" value={options[item].optvalue} id="flexCheckDefault" />
                                                          <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            {options[item].optvalue}
                                                          </label>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              {isHandleFormData.length === 0 && (
                                <div className="drawer-form-nofound">
                                  <img src={config.imagepath + "consulatation_nofound.png"} className="mb-2" />
                                  <h3 className="mb-0 fw-bold">{t("Add your first section")}</h3>
                                  <h6 className="mb-0">{t("Select your first section to add to the form")}</h6>
                                  {formik.errors && typeof formik.errors.formdata === "string" ? <p className="mb-0 invalid-feedback d-block">{formik.errors.formdata}</p> : ""}
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
      {previewform && <PreviewForm />}
    </>
  );
};

export default ConsultationEditForm;
