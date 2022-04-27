import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
// import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import { Notify } from "component/Toastr";
import { CloseVoucherApplyForm, VoucherApplyApi } from "store/slices/saleSlice";

const VoucherApplyForm = (props) => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedVoucherApplyForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const client = props.client;

  const handleCloseVoucherApplyForm = () => {
    dispatch(CloseVoucherApplyForm());
    // dispatch({ type: "category/detail/rejected" });
  };

  const initialValues = {
    client_id: "",
    client_email: "",
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().trim().max(100).label(t("Code")).required(),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(false);
    try {
      console.log(values);
      dispatch(VoucherApplyApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(CloseVoucherApplyForm());
          const response = action.payload && action.payload.message && action.payload.message;
          Notify({ text: t("Success"), title: response && response.message, type: "success" });
          // sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
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

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("client_id", client ? client.id : "");
            formik.setFieldValue("client_email", client ? client.email : "");
          }, [client]);
          return (
            <div className={rightDrawerOpened ? "modal fade show" : "modal fade"} id="add-category" tabIndex="-1" aria-labelledby="addcategoryModalLabel" aria-hidden="true" style={{ display: rightDrawerOpened ? "block" : "none" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                  <button type="button" className="close me-md-4 me-3 mt-md-4 mt-3" onClick={handleCloseVoucherApplyForm}>
                    <img src={config.imagepath + "close-icon.svg"} alt="" />
                  </button>
                  <div className="modal-body p-md-4 p-3">
                    <h4 className="mb-2">{t("Apply Voucher Code")}</h4>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <InputField type="text" name="code" value={formik.values.code} label={t("Voucher Code")} controlId="voucherApplyForm-code" />
                      <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("Apply")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
VoucherApplyForm.propTypes = {
  client: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default VoucherApplyForm;
