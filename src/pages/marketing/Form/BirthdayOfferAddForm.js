import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, SelectField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { BirthdayOfferStoreApi, OpenAddBirthdayOfferForm } from "store/slices/marketingSlice";

const AddBirthdayOfferForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.marketing.isOpenAddBirthdayOfferForm);

  const initialValues = {
    name: "",
    credit: "",
    cost: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("Birthday Offer Name")).required(),
    credit: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    cost: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
  });
  yupconfig();

  const handlemarketingSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    console.log(values);
    setLoading(true);
    try {
      dispatch(BirthdayOfferStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
          dispatch(OpenAddBirthdayOfferForm(""));
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
  const handleCloseAddBirthdayOfferForm = () => {
    dispatch(OpenAddBirthdayOfferForm(""));
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlemarketingSubmit}>
        {(formik) => {
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer birthdayoffer-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("Birthday Offer")}</h3>
                    <div className="ms-auto">
                      <button type="button" className="close btn btn-cancel me-1 cursor-pointer" onClick={handleCloseAddBirthdayOfferForm}>
                        {t("Cancel")}
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body px-4 pt-2">
                    <div className="row mx-0">
                      <div className="col-xl-7 p-0 left-content bg-white">
                        <div className="">
                          <div className="input-field">
                            <div className="row align-items-center">
                              <div className="col-sm-5 mb-md-0 mb-4">
                                <h4 className="fw-semibold mb-0">Status</h4>
                              </div>
                              <div className="col-sm-7">
                                <div className="form-check form-switch mb-0">
                                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                  <span>Disabled</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="row">
                              <div className="col-sm-5 mb-md-0 mb-4">
                                <h4 className="fw-semibold mb-0">When to Send</h4>
                                <p className="subtitle-text">Choose when to automatically send to clients</p>
                              </div>
                              <div className="col-sm-7">
                                <div className="mb-3">
                                  <label htmlFor="">When to Send</label>
                                  <select name="" id="" className="form-control">
                                    <option>On the day of their birthday</option>
                                    <option>searvice</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="row">
                              <div className="col-sm-5 mb-md-0 mb-4">
                                <h4 className="fw-semibold mb-0">Voucher</h4>
                                <p className="subtitle-text">Select the voucher to use</p>
                              </div>
                              <div className="col-sm-7">
                                <div className="mb-3">
                                  <label htmlFor="">Voucher</label>
                                  <select name="" id="" className="form-control">
                                    <option>$10 Birthday Voucher</option>
                                    <option>searvice</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="row">
                              <div className="col-sm-5 mb-md-0 mb-4">
                                <h4 className="fw-semibold mb-0">Details</h4>
                                <p className="subtitle-text">Change the email content to customise your offer.</p>
                              </div>
                              <div className="col-sm-7">
                                <div className="mb-3">
                                  <label htmlFor="">Email Subject</label>
                                  <input type="text" placeholder="Happy Birthday From Aura" className="form-control" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="">Headline</label>
                                  <input type="text" className="form-control" placeholder="Happy Birthday to You" />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="">Email Content</label>
                                  <p className="input-para-conent">Here’s a little gift from us to you to help you celebrate your birthday. Take $10 off your next appointment. Call us on 07 3000 0000 to book now.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="row">
                              <div className="col-sm-5 mb-md-0 mb-4">
                                <h4 className="fw-semibold mb-0">Header Image</h4>
                                <p className="subtitle-text">Select the image to use or upload one of your own.</p>
                              </div>
                              <div className="col-sm-7">
                                <div className="mb-3">
                                  <img src={config.imagepath + "Birthday-Frame.png"} alt="Birthday-Frame.png" className="img-fluid" />
                                </div>
                                <div>
                                  <a className="bordered-btn" href="#ChangeHeaderImage" data-bs-toggle="modal" data-bs-target="#ChangeHeaderImage">
                                    <img alt="camera.png" src={config.imagepath + "camera.png"} className="img-fluid me-2" /> Change Header Image
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 right-content">
                        <div className="preview-offer p-xxl-4 p-4">
                          <p>
                            <b>Preview</b>
                          </p>
                          <div className="text-center">
                            <div className="mb-4">
                              <img src={config.imagepath + "Preview-img.png"} alt="Preview-img.png" className="img-fluid" />
                            </div>
                            <h1 className="mb-4">Happy Birthday to You</h1>
                            <p className="offer-subtitle-txt">
                              Here’s a little gift from us to you to help you celebrate
                              <br /> your birthday. Take $10 off your next appointment.
                              <br /> Call us on 07 3000 0000 to book now.
                            </p>
                            <div className="offer-box">
                              <h1>$10 OFF</h1>
                              <p>Your next appointment at Aura Beauty Salon</p>
                            </div>
                            <div className="offer-address">
                              <h6>Aura Beauty Salon</h6>
                              <p>
                                {" "}
                                3/100 Sunshine Road, Brisbane 4000
                                <br /> 07 3000 000
                              </p>
                            </div>
                            <p className="offer-details">This voucher is valid until the expiry date specified and cannot be redeemed or replaced after this date. Aura is not responsible for lost / stolen vouchers, and is not responsible for replacing a voucher that has been lost /stolen. This voucher is non-refundable and cannot be exchanged for cash. This voucher is not valid with any other offer and / or special at Aura. This voucher must be used by one person in one visit.</p>
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

// AddBirthdayOfferForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default AddBirthdayOfferForm;
