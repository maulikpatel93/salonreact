import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { InputField, TextareaField } from "../../../component/form/Field";
import { OpenedPreviewForm } from "store/slices/formSlice";

const PreviewForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.form.isOpenedPreviewForm);
  const isHandleFormData = useSelector((state) => state.form.isHandleFormData);

  const modalshow = rightDrawerOpened ? "show" : "";
  const modaldisplay = rightDrawerOpened ? "block" : "none";
  // console.log(isHandleFormData);
  return (
    <>
      <React.Fragment>
        <div className={"modal Edit-modal-preview black-backdrop Consultation-PreviewForm-Modal " + modalshow} id="ConsultationPreviewFormModal" style={{ display: modaldisplay }}>
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 p-0 mb-3">
                <h4 className="modal-title">{t("Preview")}</h4>
                <button type="button" className="btn-close" onClick={() => dispatch(OpenedPreviewForm(""))}></button>
              </div>
              <div className="modal-body p-0">
                <h3 className="modal-title fw-semibold mb-3">{t("Your Details")}</h3>
                {isHandleFormData.length > 0 &&
                  Object.keys(isHandleFormData).map((item, i) => {
                    let id = isHandleFormData[item].id;
                    let title = isHandleFormData[item].name;
                    let section_type = isHandleFormData[item].section_type;
                    let form_type = isHandleFormData[item].form_type;
                    let is_edit = isHandleFormData[item].is_edit;
                    let question = isHandleFormData[item].question ? isHandleFormData[item].question : isHandleFormData[item].questionholder;
                    let options = isHandleFormData[item].options ? isHandleFormData[item].options : [];
                    return (
                      <div className="" key={i}>
                        {form_type === "date" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {title}
                            </label>
                            <input type="date" className="form-control" />
                          </div>
                        )}
                        {form_type === "text" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {title}
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        )}
                        {form_type === "textarea" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {title}
                            </label>
                            <textarea className="form-control"></textarea>
                          </div>
                        )}
                        {form_type === "textblock" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {t("Concent")}
                            </label>
                            <p className="text-justify mb-3">{question}</p>
                          </div>
                        )}
                        {form_type === "texthead" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {title}
                            </label>
                            <p className="text-justify mb-3">{question}</p>
                          </div>
                        )}
                        {form_type === "select" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {question}
                            </label>
                            <select className="form-select">
                              {Object.keys(options).map((item, j) => {
                                return (
                                  <option value={options[item].optvalue} key={j}>
                                    {options[item].optvalue}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}
                        {form_type === "multicheckbox" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {question}
                            </label>
                            {Object.keys(options).map((item, j) => {
                              return (
                                <div className="form-group consent-check-control" key={j}>
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id={"consentCheck" + i + "" + j} value={options[item].optvalue} />
                                    <label className="form-check-label mb-0" htmlFor={"consentCheck" + i + "" + j}>
                                      {options[item].optvalue}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {form_type === "radio" && (
                          <div className="form-group mb-3">
                            <label htmlFor="" className="fw-bold">
                              {question}
                            </label>
                            {Object.keys(options).map((item, j) => {
                              let checked = j === 0 ? true : "";
                              return (
                                <div className="form-check mb-0" key={j}>
                                  <input className="form-check-input" type="radio" name="radio" value={options[item].optvalue} id={"flexradioDefault" + i + "" + j} defaultChecked={checked} />
                                  <label className="form-check-label" htmlFor={"flexradioDefault" + i + "" + j}>
                                    {options[item].optvalue}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {form_type === "checkbox" && (
                          <div className="">
                            <div className="form-group consent-check-control">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id={"consentCheck" + i} />
                                <label className="form-check-label mb-0" htmlFor={"consentCheck" + i}>
                                  {question}
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default PreviewForm;
