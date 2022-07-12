import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { CloseEditBirthdayOfferForm, OpenAddBirthdayOfferForm, setBirthdayOfferPreview, BirthdayOfferGridViewApi, BirthdayOfferUpdateApi } from "store/slices/marketingSlice";

const BirthdayOfferEditForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.marketing.isOpenEditBirthdayOfferForm);
  const detail = useSelector((state) => state.marketing.isDetailData);

  const initialValues = {
    name: "",
    credit: "",
    cost: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("BirthdayOffer Name")).required(),
    cost: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    credit: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
  });
  yupconfig();

  const handlemarketingSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(BirthdayOfferUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
          dispatch(OpenBirthdayEditOffer(""));
          // dispatch(BirthdayOfferGridViewApi());
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

  const handleCloseEditBirthdayOfferForm = () => {
    dispatch(OpenBirthdayEditOffer(""));
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlemarketingSubmit}>
        {(formik) => {
          useEffect(() => {
            // formik.setFieldValue("service_id", [6, 13]);
            if (detail) {
              const fields = ["id", "name", "credit", "cost"];
              fields.forEach((field) => {
                formik.setFieldValue(field, detail[field] ? detail[field] : "", false);
              });
            }
          }, [detail]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("Edit BirthdayOffer")}</h3>
                    <div className="ms-auto">
                      <a className="close btn btn-primary me-1 cursor-pointer" onClick={handleCloseEditBirthdayOfferForm}>
                        {t("Cancel")}
                      </a>
                    </div>
                  </div>
                  <div className="drawer-body px-4 pt-2">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 m-auto">
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("BirthdayOffer Name")}</h4>
                          <p className="mb-2">{t("Add a name easily identify the mebmbership.")}</p>
                          <InputField type="text" name="name" value={formik.values.name} label={t("BirthdayOffer Name")} controlId="marketingForm-name" />
                        </div>
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("BirthdayOffer Credit")}</h4>
                          <p className="mb-2">{t("Add the amount the customer will recieve in credit.")}</p>
                          <InputField type="text" name={"credit"} value={formik.values.credit} placeholder="$" label={"Amount"} controlId={"marketingForm-amount"} />
                        </div>
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("BirthdayOffer Cost")}</h4>
                          <p className="mb-2">{t("Add the amount the customer will pay for the marketing.")}</p>
                          <InputField type="text" name={"cost"} value={formik.values.cost} placeholder="$" label={"Amount"} controlId={"marketingForm-amount"} />
                        </div>
                        <div className="mt-5">
                          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Update BirthdayOffer")}
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

// BirthdayOfferEditForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default BirthdayOfferEditForm;
