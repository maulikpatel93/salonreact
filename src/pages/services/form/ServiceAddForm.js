import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, ReactSelectField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
// import { digitOnly, decimalOnly } from "../../../component/form/Validation";

// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeAddServiceForm, serviceStoreApi } from "../../../store/slices/serviceSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const ServiceAddForm = () => {
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const rightDrawerOpened = useSelector((state) => state.service.isOpenedAddForm);
  const isCategoryOption = useSelector((state) => state.category.isCategoryOption);
  const isTaxOption = useSelector((state) => state.tax.isTaxOption);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseAddServiceForm = () => {
    dispatch(closeAddServiceForm());
    dispatch({ type: "service/detail/rejected" });
    dispatch(removeImage());
  };

  const initialValues = {
    name: "",
    category_id: "",
    description: "",
    price: "",
    duration: "",
    padding_time: "",
    tax_id: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).label(t("service_name")).trim().required(),
    category_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("category")).required())),
    description: Yup.string().trim().label(t("description")).required(),
    duration: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("duration")).required())),
    padding_time: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("padding_time")).required())),
    tax_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("tax")).required())),
    price: Yup.object().shape({
      general: Yup.object().shape({
        price: Yup.string().trim().required(),
        add_on_price: Yup.string().trim().required(),
      }),
      junior: Yup.object().shape({
        price: Yup.string().trim().required(),
        add_on_price: Yup.string().trim().required(),
      }),
      senior: Yup.object().shape({
        price: Yup.string().trim().required(),
        add_on_price: Yup.string().trim().required(),
      }),
    }),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(serviceStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeAddServiceForm());
          sweatalert({ title: t("created"), text: t("created_successfully"), icon: "success" });
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

  const categoryOptionsData = isCategoryOption;
  const taxOptionsData = isTaxOption;
  const durationOptionsData = [
    { value: "Male", label: t("male") },
    { value: "Female", label: t("female") },
    { value: "Other", label: t("other") },
  ];
  const paddingtimeOptionsData = [
    { value: "Male", label: t("male") },
    { value: "Female", label: t("female") },
    { value: "Other", label: t("other") },
  ];
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addservice-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("new_service")}</h3>
                    <div className="ms-auto">
                      <button type="button" className="close btn me-1 cursor-pointer" onClick={handleCloseAddServiceForm}>
                        {t("cancel")}
                      </button>
                      <button type="submit" className="btn">
                        {t("save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="col-xxl-6 col-xl-10 col-md-12 mx-auto add-form px-md-4 px-1 py-lg-5 py-3">
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("description")}</h4>
                          <p>{t("add_the_name_and_description_of_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="mb-3">
                            <InputField type="text" name="name" value={formik.values.name} label={t("service_name")} controlId="serviceForm-name" />
                          </div>
                          <div className="mb-3">
                            <ReactSelectField name="category_id" placeholder={t("search_option")} value={formik.values.category_id} options={categoryOptionsData} label={t("category")} controlId="serviceForm-category_id" isMulti={false} />
                          </div>
                          <div className="mb-3">
                            <TextareaField name="description" value={formik.values.description} label={t("description")} controlId="serviceForm-description" />
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("price")}</h4>
                          <p>{t("price_note_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row align-items-end1">
                            <div className="col-md-3 mb-2 col-4">
                              <label htmlFor="">General</label>
                            </div>
                            <div className="col-lg-3 col-md-4 col-4 mb-2">
                              <InputField type="text" name="price[general][price]" value={formik.values.cost_price} placeholder="$" label={""} controlId="serviceForm-price" />
                            </div>
                            <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">
                              <InputField type="text" name="price[general][add_on_price]" value={formik.values.add_on_price} placeholder="$" label={""} controlId="serviceForm-add_on_price" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3 col-4 mb-2">
                              <label htmlFor="">Junior</label>
                            </div>
                            <div className="col-lg-3 col-md-4 col-4 mb-2">
                              <input type="text" className="form-control" placeholder="$" />
                            </div>
                            <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">
                              <input type="text" className="form-control" placeholder="$" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3 mb-2 col-4">
                              <label htmlFor="">Senior</label>
                            </div>
                            <div className="col-lg-3 col-md-4 mb-2 col-4">
                              <input type="text" className="form-control" placeholder="$" />
                            </div>
                            <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">
                              <input type="text" className="form-control" placeholder="$" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("duration")}</h4>
                          <p>{t("how_long_is_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-auto">
                              <ReactSelectField name="duration" placeholder={t("search_option")} value={formik.values.duration} options={durationOptionsData} label={t("duration")} controlId="serviceForm-duration" isMulti={false} />
                            </div>
                            <div className="col-auto">
                              <ReactSelectField name="padding_time" placeholder={t("search_option")} value={formik.values.padding_time} options={paddingtimeOptionsData} label={t("padding_time")} controlId="serviceForm-padding_time" isMulti={false} />
                            </div>
                          </div>
                          <p>{t("padding_time_note")}</p>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("tax")}</h4>
                          <p>{t("set_the_tax_rate")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-8 mb-3">
                              <ReactSelectField name="tax_id" placeholder={t("search_option")} value={formik.values.tax_id} options={taxOptionsData} label={t("tax")} controlId="serviceForm-tax_id" isMulti={false} />
                            </div>
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
  );
};

export default ServiceAddForm;
