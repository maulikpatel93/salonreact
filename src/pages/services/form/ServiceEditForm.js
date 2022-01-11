import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, SwitchField, InputFieldImage, TextareaField, ReactSelectField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeEditServiceForm, serviceUpdateApi } from "../../../store/slices/serviceSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const ServiceEditForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.service.isOpenedEditForm);
  const detail = useSelector((state) => state.service.isDetailData);
  const isCategoryOption = useSelector((state) => state.category.isCategoryOption);
  const isTaxOption = useSelector((state) => state.tax.isTaxOption);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseEditCategoryForm = () => {
    dispatch(closeEditServiceForm());
    dispatch({ type: "service/detail/rejected" });
    dispatch(removeImage());
  };
  // const initialValues = {
  //   id: detail && detail.id,
  //   name: detail && detail.name,
  //   sku: detail && detail.sku,
  //   description: detail && detail.description,
  //   cost_price: detail && detail.cost_price ? detail.cost_price : '',
  //   retail_price: detail && detail.retail_price ? detail && detail.retail_price : '',
  //   manage_stock: '',
  //   stock_quantity: detail && detail.stock_quantity ? detail.stock_quantity : '',
  //   low_stock_threshold: detail && detail.low_stock_threshold ? detail.low_stock_threshold : '',
  //   tax_id: detail && detail.tax_id,
  //   category_id: detail && detail.category_id,
  // };
  const initialValues = {
    id: "",
    name: "",
    sku: "",
    description: "",
    cost_price: "",
    retail_price: "",
    manage_stock: "",
    stock_quantity: "",
    low_stock_threshold: "",
    tax_id: "",
    category_id: "",
  };

  const digitOnly = (value) => /^\d+$/.test(value);
  const decimalOnly = (value) => /^\d{1,6}(\.\d{1,2})?$/.test(value);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed(),
    name: Yup.string().max(100).label(t("service_name")).trim().required(),
    sku: Yup.string().trim().label(t("sku")).required(),
    description: Yup.string().trim().label(t("description")).required(),
    cost_price: Yup.string().trim().label(t("cost_price")).required().test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
    retail_price: Yup.string().trim().label(t("retail_price")).required().test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
    stock_quantity: Yup.string()
      .nullable()
      .when("manage_stock", {
        is: "1",
        then: Yup.string().trim().label(t("stock_quantity")).required().test("Digits only", t("The_field_should_have_digits_only"), digitOnly),
      }),
    low_stock_threshold: Yup.string()
      .nullable()
      .when("manage_stock", {
        is: "1",
        then: Yup.string().trim().label(t("low_stock_threshold")).required().test("Digits only", t("The_field_should_have_digits_only"), digitOnly),
      }),
    tax_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("tax")).required())),
    category_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("category")).required())),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(serviceUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeEditServiceForm());
          sweatalert({ title: t("updated"), text: t("updated_successfully"), icon: "success" });
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

  const categoryOptionsData = isCategoryOption;
  const taxOptionsData = isTaxOption;

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            if(detail){
              const fields = ['id',"name", "sku", "description", "cost_price", "retail_price", "manage_stock", "stock_quantity", "low_stock_threshold", "tax_id", "category_id"];
              fields.forEach((field) => {
                formik.setFieldValue(field, detail[field], false);
              });
            }
          }, [detail]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : '') + rightDrawerOpened} id="editservice-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("edit_service")}</h3>
                    <div className="ms-auto">
                      <a className="close btn me-1 cursor-pointer" onClick={handleCloseEditCategoryForm}>
                        {t("cancel")}
                      </a>
                      <button type="submit" className="btn" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="col-xxl-6 col-xl-10 col-md-12 mx-auto add-form px-md-4 px-1 py-lg-5 py-3">
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("description")}</h4>
                          <p>{t("add_the_name_and_general_details_of_this_service")}</p>
                          <InputFieldImage name="image" accept="image/*" label={t("add_service_image")} page="service-form" controlId="serviceForm-logo" imagname="" imageurl="" />
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="mb-3">
                            <InputField type="text" name="name" value={formik.values.name} label={t("service_name")} controlId="serviceForm-name"  />
                          </div>
                          <div className="mb-3">
                            <InputField type="text" name="sku" value={formik.values.sku} label={t("sku")} controlId="serviceForm-sku"  />
                          </div>
                          <div className="mb-3">
                            <ReactSelectField name="category_id" placeholder={t("search_option")} value={formik.values.category_id} options={categoryOptionsData} label={t("category")} controlId="serviceForm-category_id" isMulti={false}  />
                          </div>
                          <div className="mb-3">
                            <TextareaField name="description" value={formik.values.description} label={t("description")} controlId="serviceForm-description"  />
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("price")}</h4>
                          <p>{t("add_the_pricing_details_of_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="mb-2 col-md-4 col-6 mb-3">
                              <InputField type="text" name="cost_price" value={formik.values.cost_price} label={t("cost_price")} controlId="serviceForm-cost_price"  />
                            </div>
                            <div className="mb-2 col-md-4 col-6 mb-3">
                              <InputField type="text" name="retail_price" value={formik.values.retail_price} label={t("retail_price")} controlId="serviceForm-retail_price"  />
                            </div>
                            <div className="col-md-8 mb-3">
                              <ReactSelectField name="tax_id" placeholder={t("search_option")} value={formik.values.tax_id} options={taxOptionsData} label={t("tax")} controlId="serviceForm-tax_id" isMulti={false}  />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("inventory")}</h4>
                          <p>{t("manage_stock_levels_of_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <SwitchField
                            name="manage_stock"
                            label={t("manage_stock")}
                            controlId="clientForm-manage_stock"
                            value='1'
                            onChange={(e) => {
                              if(e.currentTarget.checked){
                                setTimeout(() => {
                                  formik.setFieldValue('manage_stock', '1', false);
                                }, 100);
                              }else{
                                setTimeout(() => {
                                  formik.setFieldValue('manage_stock', '', false);
                                }, 100);
                              }
                              formik.handleChange(e);
                            }}
                          />
                          <div className="row" style={{ display: formik.values.manage_stock == "" || formik.values.manage_stock == 0 ? "none" : "" }}>
                            <div className="mb-3 col-md-6">
                              <InputField type="text" name="stock_quantity" value={formik.values.stock_quantity != null ? formik.values.stock_quantity : ""} label={t("stock_quantity")} controlId="serviceForm-stock_quantity"   />
                            </div>
                            <div className="mb-3 col-md-6">
                              <InputField type="text" name="low_stock_threshold" value={formik.values.stock_quantity != null ? formik.values.low_stock_threshold : ""} label={t("low_stock_threshold")} controlId="serviceForm-low_stock_threshold"  />
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

export default ServiceEditForm;
