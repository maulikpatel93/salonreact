import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, SelectField, ReactSelectField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { openAddVoucherForm, setVoucherPreview, voucherListViewApi, voucherUpdateApi } from "store/slices/voucherSlice";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";

const VoucherEditForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const detail = useSelector((state) => state.voucher.isDetailData);

  const service = props.service;
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
    limit_uses: "",
    limit_uses_value: "",
    terms_and_conditions: "",
    service_id: [],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(50).label(t("Voucher Name")).required(),
    description: Yup.string().trim().label(t("Description")),
    amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    valid: Yup.string().trim().label(t("Valid For")).required(),
    used_online: Yup.mixed().nullable(),
    limit_uses: Yup.mixed().nullable(),
    terms_and_conditions: Yup.string().trim().label(t("Terms and Conditions")).required(),
    limit_uses_value: Yup.string()
      .nullable()
      .when("limit_uses", {
        is: 1,
        then: Yup.string().trim().label(t("Limit")).required().test("Digits only", t("The field should have digits only"), decimalOnly),
      }),
    service_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().label(t("Service")).min(1).required() : Yup.string().nullable().label(t("Service")).required())),
  });
  yupconfig();

  const handlevoucherSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(voucherUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
          dispatch(openAddVoucherForm());
          dispatch(voucherListViewApi());
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
  const limitOptionsData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
    { value: "125", label: "125" },
    { value: "150", label: "150" },
    { value: "175", label: "175" },
    { value: "200", label: "200" },
  ];
  const serviceOptionsData = service;
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlevoucherSubmit}>
        {(formik) => {
          useEffect(() => {
            // formik.setFieldValue("service_id", [6, 13]);
            if (detail) {
              const fields = ["id", "name", "description", "amount", "valid", "used_online", "limit_uses", "limit_uses_value", "terms_and_conditions"];
              fields.forEach((field) => {
                if (["used_online", "limit_uses"].includes(field)) {
                  formik.setFieldValue(field, parseInt(detail[field]), false);
                } else {
                  formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
                }
              });
              let services = detail.voucherservices && detail.voucherservices.map((obj) => obj.id);
              if (services.length > 0) {
                formik.setFieldValue("service_id", services);
              }
            }
          }, [detail]);
          getformValues(formik.values);
          return (
            <div className="voucher-form d-flex flex-column">
              <div className="">
                <h3 className="float-start">{t("Edit Voucher")}</h3>
                <a className="float-end h5 cursor-pointer btn btn-outline-primary btn-md mb-0 p-2" onClick={() => dispatch(openAddVoucherForm())}>
                  {t("Create Voucher")}
                </a>
              </div>
              <form noValidate onSubmit={formik.handleSubmit}>
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
                <div className="row gx-2 align-items-center">
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
                </div>
                <div className="mb-3">
                  <ReactSelectField name="service_id" placeholder={t("Search...")} value={formik.values.service_id} options={serviceOptionsData} label={t("Services Included")} controlId="voucherForm-service_id" isMulti={true} />
                </div>
                <div className="mb-3">
                  <TextareaField name="terms_and_conditions" placeholder={t("Terms and Conditions")} value={formik.values.terms_and_conditions} label={t("Terms and Conditions")} controlId="voucherForm-terms_and_conditions" />
                </div>
                <div className="drawer-footer mt-auto">
                  <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    {t("Save voucher")}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

VoucherEditForm.propTypes = {
  service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default VoucherEditForm;
