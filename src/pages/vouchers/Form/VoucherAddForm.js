import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, SelectField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { CloseAddVoucherForm, setVoucherPreview, VoucherGridViewApi, VoucherStoreApi } from "store/slices/voucherSlice";
import VoucherPreview from "../List/VoucherPreview";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";

const VoucherAddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.voucher.isOpenedAddForm);
  const isVoucherPreview = useSelector((state) => state.voucher.isVoucherPreview);
  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  // const service = props.service;
  const getformValues = (values) => {
    useEffect(() => {
      dispatch(setVoucherPreview(values));
    }, [values]);
  };

  const initialValues = {
    name: "",
    description: "",
    amount: "",
    valid: "",
    used_online: "",
    // limit_uses: "",
    // limit_uses_value: "",
    terms_and_conditions: t("This voucher is valid until the expiry date specified and cannot be redeemed or replaced after this date. Aura is not responsible for lost / stolen vouchers, and is not responsible for replacing a voucher that has been lost /stolen. This voucher is non-refundable and cannot be exchanged for cash. This voucher is not valid with any other offer and / or special at Aura. This voucher must be used by one person in one visit."),
    // service_id: [],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(50).label(t("Voucher Name")).required(),
    description: Yup.string().trim().label(t("Description")),
    amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    valid: Yup.string().trim().label(t("Valid For")).required(),
    used_online: Yup.mixed().nullable(),
    // limit_uses: Yup.mixed().nullable(),
    // limit_uses_value: Yup.string()
    //   .nullable()
    //   .when("limit_uses", {
    //     is: 1,
    //     then: Yup.string().trim().label(t("Limit")).required().test("Digits only", t("The field should have digits only"), decimalOnly),
    //   }),
    terms_and_conditions: Yup.string().trim().label(t("Terms and Conditions")).required(),
    // service_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().label(t("Service")).min(1).required() : Yup.string().nullable().label(t("Service")).required())),
  });
  yupconfig();

  const handlevoucherSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    console.log(values);
    setLoading(true);
    try {
      dispatch(VoucherStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
          dispatch(CloseAddVoucherForm());
          if (scriptedRef.current) {
            setLoading(false);
          }
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
          setSubmitting(false);
          if (scriptedRef.current) {
            setLoading(false);
          }
        }
      });
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };
  const validforOptionsData = [
    { value: "1", label: "1 " + t("Month") },
    { value: "2", label: "2 " + t("Months") },
    { value: "3", label: "3 " + t("Months") },
    { value: "4", label: "4 " + t("Months") },
    { value: "5", label: "5 " + t("Months") },
    { value: "6", label: "6 " + t("Months") },
    { value: "7", label: "7 " + t("Months") },
    { value: "8", label: "8 " + t("Months") },
    { value: "9", label: "9 " + t("Months") },
    { value: "10", label: "10 " + t("Months") },
    { value: "11", label: "11 " + t("Months") },
    { value: "12", label: "12 " + t("Months") },
  ];
  // const limitOptionsData = [
  //   { value: "10", label: "10" },
  //   { value: "25", label: "25" },
  //   { value: "50", label: "50" },
  //   { value: "75", label: "75" },
  //   { value: "100", label: "100" },
  //   { value: "125", label: "125" },
  //   { value: "150", label: "150" },
  //   { value: "175", label: "175" },
  //   { value: "200", label: "200" },
  // ];
  // const serviceOptionsData = service;

  const handleCloseAddVoucherForm = () => {
    dispatch(CloseAddVoucherForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlevoucherSubmit}>
        {(formik) => {
          useEffect(() => {
            // formik.setFieldValue("service_id", [6, 13]);
          }, []);
          getformValues(formik.values);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("New Voucher")}</h3>
                    <div className="ms-auto">
                      <a className="close btn btn-primary me-1 cursor-pointer" onClick={handleCloseAddVoucherForm}>
                        {t("Cancel")}
                      </a>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="row mx-0">
                      <div className="col-xxl-6 col-xl-8 col-md-8 add-form px-md-4 px-1 py-lg-5 py-3">
                        <div className="row mx-0">
                          <div className="col-md-6 mb-md-0 mb-3 ps-4 pe-4">
                            <h4 className="fw-semibold mb-2">{t("Description")}</h4>
                            <p>{t("Add the name and general details of this voucher.")}</p>
                          </div>
                          <div className="col-md-6 ps-4 pe-4">
                            <div className="mb-3">
                              <InputField type="text" name="name" value={formik.values.name} label={t("Voucher Name")} controlId="voucherForm-name" />
                            </div>
                            <div className="mb-3">
                              <TextareaField name="description" placeholder={t("Add a short description")} value={formik.values.description} label={t("Description")} controlId="voucherForm-description" />
                            </div>
                            <div className="row gx-2">
                              <div className="mb-md-4 mb-3 col-md-6">
                                <InputField type="text" name={"amount"} value={formik.values.amount} placeholder="$" label={"Amount"} controlId={"voucherForm-amount"} />
                              </div>
                              <div className="mb-md-4 mb-3 col-md-6">
                                <SelectField name="valid" placeholder={t("--Select--")} value={formik.values.valid} options={validforOptionsData} label={t("Valid For")} controlId="voucherForm-valid" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="drawer-supplier-hr"></hr>
                        <div className="row mx-0">
                          <div className="col-md-6 mb-md-0 mb-3 ps-4 pe-4">
                            <h4 className="fw-semibold mb-2">{t("Online use")}</h4>
                            <p>{t("Set voucher to be redeemable online.")}</p>
                          </div>
                          <div className="col-md-6 ps-4 pe-4">
                            <SwitchField
                              name="used_online"
                              label={t("Allow voucher to be used online")}
                              controlId="voucherForm-used_online"
                              value={"1"}
                              onChange={(e) => {
                                if (e.currentTarget.checked) {
                                  setTimeout(() => {
                                    formik.setFieldValue("used_online", 1, false);
                                  }, 100);
                                } else {
                                  setTimeout(() => {
                                    formik.setFieldValue("used_online", "", false);
                                  }, 100);
                                }
                                formik.handleChange(e);
                              }}
                            />
                            <div className="alert mb-md-4 mb-3 d-flex align-items-xl-center align-items-start">
                              <img src="assets/images/alert.png" className="me-2" alt="" />
                              <span>
                                You must <a href="#">set up online payments</a> to be able to use your vouchers online.
                              </span>
                            </div>
                            {/* <div className="row gx-2 align-items-center">
                              <div className="col-xl-6 mb-3">
                                <SwitchField
                                  name="limit_uses"
                                  label={t("Limit Uses to:")}
                                  controlId="voucherForm-limit_uses"
                                  value={"1"}
                                  onChange={(e) => {
                                    if (e.currentTarget.checked) {
                                      setTimeout(() => {
                                        formik.setFieldValue("limit_uses", 1, false);
                                      }, 100);
                                    } else {
                                      setTimeout(() => {
                                        formik.setFieldValue("limit_uses", "", false);
                                      }, 100);
                                    }
                                    formik.handleChange(e);
                                  }}
                                />
                              </div>
                              <div className="mb-3 col-xl-6" style={{ display: formik.values.limit_uses ? "block" : "none" }}>
                                <SelectField name="limit_uses_value" placeholder={t("--Select--")} value={formik.values.limit_uses_value} options={limitOptionsData} label={""} controlId="voucherForm-limit_uses_value" />
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <hr className="drawer-supplier-hr"></hr>
                        <div className="row mx-0">
                          <div className="col-md-6 mb-md-0 mb-3 ps-4 pe-4">
                            <h4 className="fw-semibold mb-2">{t("Terms and conditions")}</h4>
                            <p>{t("The terms and conditions that will be appear on the voucher.")}</p>
                          </div>
                          <div className="col-md-6 ps-4 pe-4">
                            <TextareaField name="terms_and_conditions" placeholder={t("Terms and Conditions")} value={formik.values.terms_and_conditions} label={t("Terms and Conditions")} controlId="voucherForm-terms_and_conditions" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-6 col-xl-4 col-md-4">
                        <VoucherPreview preview={isVoucherPreview} service={isServiceOption} currentUser={currentUser} />
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

// VoucherAddForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default VoucherAddForm;
