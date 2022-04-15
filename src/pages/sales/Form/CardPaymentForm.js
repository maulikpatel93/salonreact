import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import yupconfig from "../../../yupconfig";
import useScriptRef from "../../../hooks/useScriptRef";
import { CardPaymentFormApi, CloseCardPaymentForm } from "store/slices/saleSlice";
import { sweatalert } from "../../../component/Sweatalert2";
import config from "../../../config";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CardPaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  // 2️⃣ Store reference to Stripe
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenCardPaymentForm);
  const initialValues = {
    cardnumber: "",
  };
  const validationSchema = Yup.object().shape({
    // cardnumber: Yup.string().trim().max(100).email().label(t("card")).required(),
  });
  yupconfig();

  const handleChange = async (event) => {
    // 4️⃣ Listen for changes in the CardElement and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true); // 5️⃣ Confirm Card Payment.
    console.log({card: elements.getElement(CardElement)});
    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    // });
    // if (payload.error) {
    //   setError(`Payment failed ${payload.error.message}`);
    //   setProcessing(false);
    // } else {
    //   setError(null);
    //   setProcessing(false);
    //   setSucceeded(true);
    // }
  };

  const handleCloseCardPaymentForm = () => {
    dispatch(CloseCardPaymentForm());
  };
  return (
    <React.Fragment>
      <div className={(rightDrawerOpened ? "full-screen-drawer p-0 salecheckout-drawer " : "") + rightDrawerOpened} id="salecheckout-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">{t("New Sale - Payment")}</h1>
            <a className="close-drawer cursor-pointer" onClick={handleCloseCardPaymentForm}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body p-3 newsale-probox">
            <form id="payment-form" className="w-100 mt-lg-0 mt-2" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 m-auto">
                  <div className="m-4">
                    <CardElement id="card-element" options={{}} onChange={handleChange} />
                    {/* <CardNumberElement />
                          <CardExpiryElement />
                          <CardCvcElement /> */}
                  </div>
                  {error && (
                    <div className="card-error text-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className={succeeded ? "result-message" : "result-message hidden"}>Payment succeeded!</div>
                  <div className="d-flex align-items-end">
                    <button type="submit" className="btn btn-dark ms-3 p-3 fo w-100" disabled={processing || disabled || succeeded} id="submit">
                      {processing && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Pay")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
// CardPaymentForm.propTypes = {
//   isSaleCompletedData: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };
export default CardPaymentForm;
