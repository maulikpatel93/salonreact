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
import { CloseAddMembershipForm, MembershipStoreApi } from "store/slices/membershipSlice";
import config from "config";

const MembershipAddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.membership.isOpenedAddForm);

  const initialValues = {
    name: "",
    credit: "",
    cost: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(50).label(t("Membership Name")).required(),
    credit: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    cost: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
  });
  yupconfig();

  const handlemembershipSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    console.log(values);
    setLoading(true);
    try {
      dispatch(MembershipStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
          dispatch(CloseAddMembershipForm());
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
  const handleCloseAddMembershipForm = () => {
    dispatch(CloseAddMembershipForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlemembershipSubmit}>
        {(formik) => {
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("New Membership")}</h3>
                    <div className="ms-auto">
                      <a className="close btn btn-primary me-1 cursor-pointer" onClick={handleCloseAddMembershipForm}>
                        {t("Cancel")}
                      </a>
                    </div>
                  </div>
                  <div className="drawer-body px-4 pt-2">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 m-auto">
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("Membership Name")}</h4>
                          <p className="mb-2">{t("Add a name easily identify the mebmbership.")}</p>
                          <InputField type="text" name="name" value={formik.values.name} label={t("Membership Name")} controlId="membershipForm-name" />
                        </div>
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("Membership Credit")}</h4>
                          <p className="mb-2">{t("Add the amount the customer will recieve in credit.")}</p>
                          <InputField type="text" name={"credit"} value={formik.values.credit} placeholder="$" label={"Amount"} controlId={"membershipForm-amount"} />
                        </div>
                        <div className="mb-3">
                          <h4 className="mb-1 fw-semibold">{t("Membership Cost")}</h4>
                          <p className="mb-2">{t("Add the amount the customer will pay for the membership.")}</p>
                          <InputField type="text" name={"cost"} value={formik.values.cost} placeholder="$" label={"Amount"} controlId={"membershipForm-amount"} />
                        </div>
                        <div className="mt-5">
                          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Save Membership")}
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

// MembershipAddForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default MembershipAddForm;
