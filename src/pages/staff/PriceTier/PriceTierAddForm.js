import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

// import { closeNewPriceTierForm } from "../../../store/slices/pricetierSlice";
import { closeAddPriceTierForm, pricetierStoreApi } from "../../../store/slices/pricetierSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const PriceTierAddForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.pricetier.isOpenedAddForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseAddPriceTierForm = () => {
    dispatch(closeAddPriceTierForm());
  };

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("name")).required(),
  });
  yupconfig();

  const handlePriceTierSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(pricetierStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddPriceTierForm());
          sweatalert({ title: t("created"), text: t("created_successfully"), icon: "success" });
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
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePriceTierSubmit}>
        {(formik) => {
          return (
            <div className={rightDrawerOpened ? "modal fade show" : "modal fade"} id="add-pricetier" tabIndex="-1" aria-labelledby="addpricetierModalLabel" aria-hidden="true" style={{ display: rightDrawerOpened ? "block" : "none" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                  <button type="button" className="close me-md-4 me-3 mt-md-4 mt-3" onClick={handleCloseAddPriceTierForm}>
                    <img src={config.imagepath + "close-icon.svg"} alt="" />
                  </button>
                  <div className="modal-body p-md-4 p-3">
                    <h4 className="mb-2">{t("add_price_tier")}</h4>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <InputField type="text" name="name" value={formik.values.name} label={t("price_tier_name")} controlId="pricetierForm-name" />
                      <div className="text-center">
                        <button type="submit" className="btn" disabled={loading}>
                          {loading && <span className="spinner-border spinner-border-sm"></span>}
                          {t("save")}
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

export default PriceTierAddForm;
