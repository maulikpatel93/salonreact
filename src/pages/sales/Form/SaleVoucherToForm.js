import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import config from "config";
import { CloseVoucherToForm, SaleVoucherToCartApi, SaleOneOffVoucherToCartApi } from "store/slices/saleSlice";

const SaleVoucherToForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedVoucherToForm);
  const isVoucherToFormData = useSelector((state) => state.sale.isVoucherToFormData);
  const voucher = isVoucherToFormData.type === "Voucher" ? isVoucherToFormData.voucher : "";
  const onoffvoucher = isVoucherToFormData.type === "OneOffVoucher" ? isVoucherToFormData.onoffvoucher : "";
  const initialValues = {
    voucher_id: "",
    amount: "",
    first_name: "",
    last_name: "",
    is_send: "",
    email: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.string()
      .nullable()
      .when("voucher_id", {
        is: (v) => v === "" || v === null || v === undefined,
        then: Yup.string().trim(t("Required")).label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
      }),
    first_name: Yup.string().trim().max(100).label(t("Membership Name")).required(),
    last_name: Yup.string().trim().max(100).label(t("Membership Name")).required(),
    is_send: Yup.mixed().nullable(),
    email: Yup.string()
      .nullable()
      .when("is_send", {
        is: 1,
        then: Yup.string().trim().max(100).email().label(t("Email Address")).required(),
      }),
  });
  yupconfig();

  const handlemembershipSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      if (values.type === "Voucher") {
        dispatch(SaleVoucherToCartApi(values)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            setStatus({ success: true });
            resetForm();
            dispatch(CloseVoucherToForm());
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
      } else {
        dispatch(SaleOneOffVoucherToCartApi(values));
        setStatus({ success: true });
        resetForm();
        dispatch(CloseVoucherToForm());
        if (scriptedRef.current) {
          setLoading(false);
        }
      }
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };
  const handleCloseVoucherToForm = () => {
    dispatch(CloseVoucherToForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlemembershipSubmit}>
        {(formik) => {
          useEffect(() => {
            if (voucher) {
              let voucher_to = voucher.voucher_to ? voucher.voucher_to : "";
              formik.setFieldValue("voucher_id", voucher.id ? voucher.id : "");
              formik.setFieldValue("amount", voucher.amount ? voucher.amount : "");
              const fields = ["id", "first_name", "last_name", "is_send", "email", "message"];
              fields.forEach((field) => {
                formik.setFieldValue(field, voucher_to[field] ? voucher_to[field] : "", false);
              });
            }
            if (onoffvoucher) {
              const fields = ["id", "voucher_id", "first_name", "last_name", "is_send", "email", "message", "amount"];
              fields.forEach((field) => {
                formik.setFieldValue(field, onoffvoucher[field] ? onoffvoucher[field] : "", false);
              });
            }
            formik.setFieldValue("type", voucher ? "Voucher" : "OneOffVoucher");
          }, [voucher, onoffvoucher]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{voucher ? voucher.name : t("One-Off Voucher")}</h3>
                    <div className="ms-auto">
                      <a className="close btn btn-primary me-1 cursor-pointer" onClick={handleCloseVoucherToForm}>
                        {t("Cancel")}
                      </a>
                    </div>
                  </div>
                  <div className="drawer-body px-4 pt-2">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 m-auto">
                        {!voucher && (
                          <div className="mb-3">
                            <h4 className="mb-1 fw-semibold">{t("Gift Voucher Amount")}</h4>
                            <p className="mb-2">{t("Add the amount for voucher is for.")}</p>
                            <InputField type="text" name="amount" value={formik.values.amount} placeholder="$" label={t("Amount")} controlId="SaleVoucherToForm-amount" />
                          </div>
                        )}
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("To (Recipient)")}</h4>
                          <p className="mb-2">{t("Add the details of who will be receiving voucher.")}</p>
                        </div>
                        <div className="mb-3">
                          <InputField type="text" name="first_name" value={formik.values.first_name} label={t("First Name")} controlId="SaleVoucherToForm-first_name" />
                        </div>
                        <div className="mb-3">
                          <InputField type="text" name="last_name" value={formik.values.last_name} label={t("Last Name")} controlId="SaleVoucherToForm-last_name" />
                        </div>
                        <div className="mb-3">
                          <SwitchField
                            name="is_send"
                            label={t("Send voucher to recipient")}
                            controlId="SaleVoucherToForm-is_send"
                            value="1"
                            onChange={(e) => {
                              if (e.currentTarget.checked) {
                                setTimeout(() => {
                                  formik.setFieldValue("is_send", 1, false);
                                }, 100);
                              } else {
                                setTimeout(() => {
                                  formik.setFieldValue("is_send", "", false);
                                }, 100);
                              }
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        {formik.values.is_send && (
                          <div className="mb-3">
                            <InputField type="text" name={"email"} value={formik.values.email} placeholder="" label={"Email"} controlId={"SaleVoucherToForm-email"} />
                          </div>
                        )}
                        <div className="mb-3">
                          <TextareaField type="text" name={"message"} value={formik.values.message} placeholder="" label={"Message"} controlId={"SaleVoucherToForm-message"} />
                        </div>
                        <div className="mt-5">
                          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {(voucher && voucher.voucher_to) || onoffvoucher ? t("Update") : t("Add to Sale")}
                          </button>
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

// SaleVoucherToForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default SaleVoucherToForm;
