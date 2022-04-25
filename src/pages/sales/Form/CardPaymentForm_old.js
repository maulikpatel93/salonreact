import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import yupconfig from "../../../yupconfig";
import useScriptRef from "../../../hooks/useScriptRef";
import { saleStoreApi, CloseCardPaymentForm } from "store/slices/saleSlice";
// import { sweatalert } from "../../../component/Sweatalert2";
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from "component/card/CardUtils";
import config from "../../../config";
// import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { InputField } from "component/form/Field";

const CardPaymentForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenCardPaymentForm);
  const isCardPaymentData = useSelector((state) => state.sale.isCardPaymentData);
  console.log(isCardPaymentData);
  const initialValues = {
    is_stripe: 0,
    cardname: "",
    cardnumber: "",
    cardexpiry: "",
    cardcvc: "",
  };
  const validationSchema = Yup.object().shape({
    is_stripe: Yup.mixed(),
    cardname: Yup.string().trim().label(t("Card Holder Name")),
    cardnumber: Yup.string()
      .trim()
      .nullable()
      .when("is_stripe", {
        is: 1,
        // then: Yup.string().trim().matches(config.cardNumberPattern, t(config.cardNumberPattern_error)).label(t("Card Number")).required(),
        then: Yup.string().trim().label(t("Card Number")),
      }),
    cardexpiry: Yup.string()
      .trim()
      .nullable()
      .when("is_stripe", {
        is: 1,
        then: Yup.string().trim().label(t("Card Expiry")),
      }),
    cardcvc: Yup.string()
      .trim()
      .nullable()
      .when("is_stripe", {
        is: 1,
        then: Yup.string().trim().label(t("CVC")),
      }),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(false);
    try {
      console.log(values);
      dispatch(saleStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          const payment = action.payload;
          console.log(payment);
          // // your return_url by Stripe.js
          // const clientSecret = new URLSearchParams(window.location.search).get(payment.payment_intent_client_secret);
          // console.log(clientSecret);
          // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          //   console.log(paymentIntent);
          // });

          setStatus({ success: true });
          resetForm();
          dispatch(CloseCardPaymentForm());
          // dispatch(closeAddSaleForm());
          // dispatch(closeAppointmentDetailModal());
          dispatch(SaleCompletedData(action.payload));
          dispatch(OpenSaleCompleted());
          // sweatalert({ title: t("Sale Completed"), text: t("Sale Completed Successfully"), icon: "success" });
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(busytimeListViewApi(isRangeInfo));
          }
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
  const handleCloseCardPaymentForm = () => {
    dispatch(CloseCardPaymentForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("is_stripe", 1, false);
            if (isCardPaymentData) {
              formik.setValues(isCardPaymentData.values);
            }
          }, [isCardPaymentData]);
          useEffect(() => {}, []);
          let totalprice = 0;
          if (formik.values && formik.values.cost) {
            totalprice += isNaN(parseFloat(formik.values.cost)) === false && parseFloat(formik.values.cost);
          }
          let isCart = formik.values.cart;
          if (isCart && isCart.services.length > 0) {
            Object.keys(isCart.services).map((item) => {
              let gprice = isCart.services[item].gprice ? isCart.services[item].gprice : "";

              totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);
            });
          }
          if (isCart && isCart.products.length > 0) {
            Object.keys(isCart.products).map((item) => {
              let product_cost_price = isCart.products[item].cost_price;
              let qty = isCart.products[item].qty;
              let product_price = qty > 0 ? parseInt(qty) * parseFloat(product_cost_price) : product_cost_price;
              totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
            });
          }
          if (isCart && isCart.vouchers.length > 0) {
            Object.keys(isCart.vouchers).map((item) => {
              let voucher_price = isCart.vouchers[item].amount;
              totalprice += isNaN(parseFloat(voucher_price)) === false && parseFloat(voucher_price);
            });
          }

          if (isCart && isCart.onoffvouchers.length > 0) {
            Object.keys(isCart.onoffvouchers).map((item) => {
              let amount = isCart.onoffvouchers[item].amount;
              totalprice += isNaN(parseFloat(amount)) === false && parseFloat(amount);
            });
          }

          if (isCart && isCart.membership.length > 0) {
            Object.keys(isCart.membership).map((item) => {
              let cost = isCart.membership[item].cost;
              totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
            });
          }
          useEffect(() => {
            formik.setFieldValue("totalprice", totalprice);
          }, [totalprice]);
          console.log(formik.values);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 newsalecreditpay " : "") + rightDrawerOpened} id="newsalecreditpay-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-4 py-3">
                    <h1 className="pe-md-5 pe-3 mb-0">{t("New Sale - Pay with Stripe (Credit Card)")}</h1>
                    <a className="close-drawer cursor-pointer" onClick={handleCloseCardPaymentForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body p-3">
                    <div className="row">
                      <div className="col-xl-5 col-lg-8 col-md-12 col-sm-12 m-auto">
                        <div className="mb-md-4 mb-3 pb-xl-2">
                          <label className="h4 mb-2 fw-semibold" htmlFor="">
                            Card Details
                          </label>
                          {/* <input type="text" name="" id="" className="creditcard form-control lg" placeholder="1234 1234 1234 1234"> */}
                          <InputField type="text" name="cardnumber" value={formatCreditCardNumber(formik.values.cardnumber)} label={"Card Number"} controlId="checkoutForm-cardnumber" placeholder="**** **** **** ****" className="creditcard form-control lg" />
                          <div className="row mx-0">
                            <div className="col px-0">
                              {/* <input type="text" name="" id="" className="form-control lg border border-end-0 month" placeholder="MM/YY"/> */}
                              <InputField type="text" name="cardexpiry" placeholder="MM/YY" value={formatExpirationDate(formik.values.cardexpiry)} label={""} controlId="checkoutForm-cardexpiry" className="form-control lg border border-end-0 month" />
                            </div>
                            <div className="col px-0">
                              {/* <input type="text" name="" id="" className="cvc form-control lg" placeholder="CVC"/> */}
                              <InputField type="text" name="cardcvc" placeholder="***" value={formatCVC(formik.values.cardcvc)} label={""} controlId="checkoutForm-cardcvc" className="cvc form-control lg" />
                            </div>
                          </div>
                        </div>
                        <div className="mb-md-5 mb-3">
                          <label htmlFor="" className="h4 mb-2 fw-semibold">
                            Name on Card
                          </label>
                          <input type="text" className="form-control lg" />
                        </div>
                        <div>
                          <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading} onClick={() => formik.setFieldValue("paidby", "CreditCard")}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Pay")} ${totalprice}
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
// CardPaymentForm.propTypes = {
//   isSaleCompletedData: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };
export default CardPaymentForm;
