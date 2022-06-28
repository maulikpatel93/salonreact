import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, getIn } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import config from "../../../config";
import { OpenedEditHandleForm, UpdateHandleFormData, UpdateHandleFormDataApi } from "store/slices/formSlice";

const ModalForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.form.isOpenedEditHandleForm);
  const HandleFormDetail = useSelector((state) => state.form.isHandleFormDetailData);

  const modalshow = rightDrawerOpened ? "show" : "";
  const modaldisplay = rightDrawerOpened ? "block" : "none";

  const initialValues = {
    form_type: "",
    caption: "",
    options: [{ optvalue: "" }],
  };
  const validationSchema = Yup.object().shape({
    form_type: Yup.string(),
    caption: Yup.string().trim().max(50).label(t("This field")).required(),
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
        .required("Must have friends")
        .min(1, "Minimum of 1 friends"),
      // otherwise: Yup.mixed().nullable(),
    }),
  });
  yupconfig();

  const handleFormSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      console.log(values);
      dispatch(UpdateHandleFormDataApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // reset();
          dispatch(OpenedEditHandleForm(""));
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
  console.log(HandleFormDetail);
  return (
    <>
      <React.Fragment>
        <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {(formik) => {
            useEffect(() => {
              if (HandleFormDetail) {
                let isOption = [];
                if (HandleFormDetail.form_type === "select" || HandleFormDetail.form_type === "multicheckbox") {
                  isOption = [{ optvalue: "" }];
                }
                if (HandleFormDetail.form_type === "radio") {
                  isOption = [{ optvalue: "Yes" }, { optvalue: "No" }];
                }
                let optvaluedata = HandleFormDetail.options && HandleFormDetail.options.length > 0 ? HandleFormDetail.options : isOption;
                formik.setFieldValue("id", HandleFormDetail.id);
                formik.setFieldValue("index", HandleFormDetail.index);
                formik.setFieldValue("caption", HandleFormDetail.caption);
                formik.setFieldValue("form_type", HandleFormDetail.form_type);
                formik.setFieldValue("options", optvaluedata);
              }
            }, [HandleFormDetail]);
            return (
              <div className={"modal Edit-modal black-backdrop edit-paradetails-modal " + modalshow} id="editParaDetailModal" style={{ display: modaldisplay }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <div className="modal-header border-0">
                        <h3 className="modal-title fw-semibold mb-2">{t("Edit")}</h3>
                      </div>
                      <div className="modal-body">
                        {(HandleFormDetail.form_type === "text" || HandleFormDetail.form_type === "checkbox") && <InputField type="text" name="caption" label={HandleFormDetail.name} className="form-control" placeholder={HandleFormDetail.captionholder} controlId="ModalForm-caption" />}
                        {HandleFormDetail.form_type === "date" && <InputField type="date" name="caption" label={t(HandleFormDetail.name)} value={formik.values.caption} className="form-control" placeholder={t(HandleFormDetail.captionholder)} controlId="ModalForm-caption" />}
                        {HandleFormDetail.form_type === "textarea" && <TextareaField name="caption" label={t(HandleFormDetail.name)} value={formik.values.caption} placeholder={t(HandleFormDetail.captionholder)} controlId="ModalForm-caption" />}
                        {(HandleFormDetail.form_type === "select" || HandleFormDetail.form_type === "multicheckbox" || HandleFormDetail.form_type === "radio") && (
                          <>
                            <div className="mb-3">
                              <InputField name="caption" label={t(HandleFormDetail.name)} value={formik.values.caption} placeholder={t(HandleFormDetail.captionholder)} controlId="ModalForm-caption" />
                            </div>
                            <FieldArray
                              name={`options`}
                              render={(arrayHelpers) => {
                                return (
                                  <>
                                    <div>
                                      {formik.values.options.length > 0 &&
                                        formik.values.options.map((option, index) => {
                                          let error = getIn(arrayHelpers.form.errors.options && arrayHelpers.form.errors.options[index], "optvalue");
                                          let touch = getIn(arrayHelpers.form.touched.options && arrayHelpers.form.touched.options[index], "optvalue");
                                          return (
                                            <div className="row mb-2" key={index}>
                                              <div className="col">
                                                {/* <label htmlFor={`options.${index}.optvalue`}>Name</label> */}
                                                <div className="input-group">
                                                  <span className="input-group-text">{index + 1}</span>
                                                  <Field name={`options.${index}.optvalue`} placeholder={t("option {{ no }}", { no: index + 1 })} type="text" className={(touch && error ? "is-invalid" : "") + " form-control"} />
                                                  {((HandleFormDetail.form_type === "radio" && index > 1) || (index > 0 && HandleFormDetail.form_type !== "radio")) && (
                                                    <span className="input-group-text cursor-pointer" id="basic-addon2" onClick={() => arrayHelpers.remove(index)}>
                                                      <i className="fas fa-times p-0"></i>
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                              {/* <ErrorMessage name={`options.${index}.optvalue`} component="div" className="invalid-feedback d-block mt-0" /> */}
                                            </div>
                                          );
                                        })}
                                      <div className="row mt-2">
                                        <div className="col-12 text-center">
                                          <a className="cursor-pointer btn btn-primary btn-sm" onClick={() => arrayHelpers.push({ optvalue: "" })}>
                                            <i className="fas fa-plus p-0"></i> {t("Add Option")}
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            />
                          </>
                        )}
                      </div>
                      <div className="modal-footer border-0">
                        <a
                          className="btn me-1 cursor-pointer btn-cancel btn-edit-modal"
                          onClick={() => {
                            dispatch(OpenedEditHandleForm(""));
                          }}
                        >
                          {t("Cancel")}
                        </a>
                        <button type="submit" className="save btn btn-primary btn-edit-modal fw-semibold" disabled={loading}>
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
