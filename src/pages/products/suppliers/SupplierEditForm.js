import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, MapAddressField, InputFieldImage } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

// import { closeNewSupplierForm } from "../../../store/slices/supplierSlice";
import { closeEditSupplierForm, supplierUpdateApi } from "../../../store/slices/supplierSlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";
import _ from "lodash";

const SupplierEditForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.supplier.isOpenedEditForm);
  const detail = useSelector((state) => state.supplier.isDetailData);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseEditSupplierForm = () => {
    dispatch(closeEditSupplierForm());
    dispatch({ type: "supplier/detail/rejected" });
  };
  const initialValues = {
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    website: '',
    address: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("supplier_name")).required(),
    first_name: Yup.string().trim().max(50).label(t("first_name")).required(),
    last_name: Yup.string().trim().max(50).label(t("last_name")).required(),
    logo: Yup.mixed(),
    // logo: Yup.string().trim().label(t("logo")),
    email: Yup.string().trim().max(100).email().label(t("email")).required(),
    phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("phone_number")).required(),
    website: Yup.string().trim().url().label(t("website")).required(),
    address: Yup.string().trim().label(t("address")).required(),
    street: Yup.string().trim().label(t("street")).required(),
    suburb: Yup.string().trim().label(t("suburb")).required(),
    state: Yup.string().trim().label(t("state")).required(),
    postcode: Yup.string().trim().max(12).label(t("postcode")).required(),
  });
  yupconfig();

  const handleSupplierSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(supplierUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeEditSupplierForm());
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

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSupplierSubmit}>
        {(formik) => {
          useEffect(() => {
            if(detail){
              if (detail.logo) {
                dispatch(selectImage({ name: detail.logo, size: "", type: "", url: detail.logo_url }));
              }
              const fields = ['id',"name", "first_name", "last_name", "email", "phone_number", "website", "address", "street", "suburb", "state", "postcode"];
              fields.forEach((field) => {
                formik.setFieldValue(field, detail[field], false);
              });
            }
          }, [detail]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : '') + rightDrawerOpened} id="editsuppliers-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t('edit_supplier')}</h3>
                    <div className="ms-auto">
                      <a className="close btn me-1 cursor-pointer" onClick={handleCloseEditSupplierForm}>
                        {t("cancel")}
                      </a>
                      <button type="submit" className="btn">
                        {t("save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="col-xxl-6 col-xl-10 col-md-12 mx-auto add-form px-md-4 px-1 py-lg-5 py-3">
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("supplier")}</h4>
                          <p>{t("add_the_name_of_the_supplier")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <InputField type="text" name="name" value={formik.values.name} label={t("supplier_name")} controlId="supplierForm-name" />
                        </div>
                      </div>
                      <hr className="drawer-supplier-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("contact_information")}</h4>
                          <p>{t("add_the_contact_details_of_this_supplier")}</p>
                          <InputFieldImage name="logo" accept="image/*" label={t("add_supplier_Logo")} page="supplier-form" controlId="supplierForm-logo" imagname="" imageurl="" />
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row gx-2">
                            <div className="mb-3 col-md-6">
                              <InputField type="text" name="first_name" value={formik.values.first_name} label={t("first_name")} controlId="supplierForm-first_name" />
                            </div>
                            <div className="mb-3 col-md-6">
                              <InputField type="text" name="last_name" value={formik.values.last_name} label={t("last_name")} controlId="supplierForm-last_name" />
                            </div>
                          </div>
                          <div className="mb-3">
                            <InputField type="text" name="phone_number" value={formik.values.phone_number} mask="999-999-9999" label={t("phone_number")} controlId="supplierForm-phone_number" />
                          </div>
                          <div className="mb-3">
                            <InputField type="text" name="email" value={formik.values.email} label={t("email")} controlId="supplierForm-email" />
                          </div>
                          <div className="mb-3">
                            <InputField type="text" name="website" value={formik.values.website} label={t("website")} controlId="supplierForm-website" />
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-supplier-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("address")}</h4>
                          <p>{t("add_the_address_of_this_supplier")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <MapAddressField name="address" label={t("address")} value={formik.values.address} placeholder={t("typing_address")} controlId="supplierForm-address" />
                          <div className="mb-3">
                            <InputField type="text" name="street" value={formik.values.street} label={t("street")} controlId="supplierForm-street" />
                          </div>
                          <div className="row gx-2">
                            <div className="col-md-6 mb-3">
                              <InputField type="text" name="suburb" value={formik.values.suburb} label={t("suburb")} controlId="supplierForm-suburb" />
                            </div>
                            <div className="col-md-3 col-6 mb-3">
                              <InputField type="text" name="state" value={formik.values.state} label={t("state")} controlId="supplierForm-state" />
                            </div>
                            <div className="col-md-3 col-6 mb-3">
                              <InputField type="text" name="postcode" value={formik.values.postcode} label={t("postcode")} controlId="supplierForm-postcode" />
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

export default SupplierEditForm;
