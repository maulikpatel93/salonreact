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
import { CloseAddSubscriptionForm, SubscriptionStoreApi } from "store/slices/subscriptionSlice";
import config from "config";

const SubscriptionAddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.subscription.isOpenedAddForm);

  const initialValues = {
    name: "",
    amount: "",
    repeats: "Yes",
    repeat_time: 1,
    repeat_time_option: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(50).label(t("Subscription Name")).required(),
    amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    repeat_time: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time")).required(t("Required")).test("Digits only", t("Digits only"), decimalOnly),
      }),
    repeat_time_option: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time option")).required(t("Required")),
      }),
  });
  yupconfig();

  const handlesubscriptionSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    console.log(values);
    setLoading(true);
    try {
      dispatch(SubscriptionStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
          dispatch(CloseAddSubscriptionForm());
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
  const handleCloseAddSubscriptionForm = () => {
    dispatch(CloseAddSubscriptionForm());
  };
  // const repeatsOptionsData = [
  //   { value: "No", label: t("No") },
  //   { value: "Yes", label: t("Yes") },
  // ];
  const repeattimeOptionsData = [
    // { value: "Weekly", label: t("Week(s)") },
    { value: "Monthly", label: t("Month(s)") },
    { value: "Yearly", label: t("Year(s)") },
  ];
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubscriptionSubmit}>
        {(formik) => {
          console.log(formik.errors);
          return (
            <div className={rightDrawerOpened + " full-screen-drawer p-0 subscription-drawer"} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("New Subscription")}</h3>
                    <div className="ms-auto">
                      <button type="button" className="close btn btn-cancel me-1 cursor-pointer" onClick={handleCloseAddSubscriptionForm}>
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
                      <div className="col-md-4 p-xl-5 p-4">
                        <div className="mb-md-4 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Subscription Name")}</h4>
                          <p className="mb-2">{t("Add a name to easily identify the subscription.")}</p>
                          <InputField type="text" name="name" value={formik.values.name} label={t("First Name")} controlId="subscriptionForm-name" />
                        </div>
                        <div className="mb-md-4 mb-3">
                          <h4 className="fw-semibold mb-2">Cost</h4>
                          <p className="mb-2">Add how much the subscription will cost.</p>
                          <InputField name="amount" value={formik.values.amount} label={t("Amount")} controlId="subscriptionForm-amount" placeholder="$" />
                        </div>
                        <div className="mb-md-4 ">
                          <h4 className="fw-semibold mb-2">Frequency of Payment and Services</h4>
                          <p className="mb-2">Choose how often the subscription repeats. Note, payment will automatically be taken and the services will reset at this interval.</p>
                          <SelectField name="repeat_time_option" placeholder={t("--Select--")} value={formik.values.repeat_time_option} options={repeattimeOptionsData} label={"Repeats"} controlId="subscriptionForm-repeat_time_option" />
                        </div>
                      </div>
                      <div className="col-md-4 p-xl-5 p-4 subscription-service">
                        <h4 className="fw-semibold mb-2">Add Services</h4>
                        <p>Select the services to include in the subsription.</p>
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item mb-md-4 mb-3">
                            <h2 className="accordion-header" id="headingOne">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Hair
                              </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div className="accordion-body p-0">
                                <ul className="list-unstyled mb-0">
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Women’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Men’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Kid’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Blow Dry
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Beauty
                              </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                              <div className="accordion-body p-0">
                                <ul className="list-unstyled mb-0">
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Women’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Men’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Kid’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Blow Dry
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 p-xl-5 p-4">
                        <h4 className="fw-semibold mb-2">Services Included</h4>
                        <p>Set the quantity of the services included, or remove them.</p>
                        <div className="card card-body mb-3">
                          <div className="d-flex flex-wrap align-items-center">
                            <div className="col-lg-8 col-12 d-flex align-items-center pe-lg-2 mb-lg-0 mb-2">
                              <input type="text" defaultValue="3" className="form-control qty text-center me-xxl-4 me-2" />
                              <h5 className="fw-semibold mb-0">Women’s Haircut</h5>
                            </div>
                            <div className="col-lg-4 col-12 d-flex justify-content-between  align-items-center">
                              <h5 className="fw-semibold mb-0">$100</h5>
                              <a className="close d-block">
                                <i className="fal fa-times"></i>
                              </a>
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

// SubscriptionAddForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default SubscriptionAddForm;
