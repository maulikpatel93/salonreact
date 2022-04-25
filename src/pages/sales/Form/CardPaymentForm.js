import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useScriptRef from "../../../hooks/useScriptRef";
import { CloseCardPaymentForm } from "store/slices/saleSlice";
import config from "../../../config";
import CheckoutForm from "pages/account/CheckoutForm";

const stripePromise = loadStripe("pk_test_51Ko2rOSFsrov7HTSarhjgTN7nrsYLEVvOKqhMM3lq8b4ZOdIbP5Pj7TgUbZxr9C3apilJAmeSvEH9HcwLWbj6Nw400febhX2Ig", { stripeAccount: "acct_1KsMmFSBtAREZzxu" });
const CardPaymentForm = () => {
  //   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const rightDrawerOpened = useSelector((state) => state.sale.isOpenCardPaymentForm);
  const isStripePaymentStatus = useSelector((state) => state.stripe.isStripePaymentStatus);
  
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: isStripePaymentStatus.payment_intent_client_secret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  //   const isCardPaymentData = useSelector((state) => state.sale.isCardPaymentData);
  const handleCloseCardPaymentForm = () => {
    dispatch(CloseCardPaymentForm());
  };
  return (
    <React.Fragment>
      <div className={(rightDrawerOpened ? "full-screen-drawer p-0 newsalecreditpay " : "") + rightDrawerOpened} id="newsalecreditpay-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">{t("New Sale - Pay with Stripe (Credit Card)")}</h1>
            <a className="close-drawer cursor-pointer" onClick={handleCloseCardPaymentForm}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body p-3">
            <div className="row">
              <div className="col-xl-5 col-lg-8 col-md-12 col-sm-12 m-auto">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm amount={isStripePaymentStatus.amount} />
                </Elements>
              </div>
            </div>
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
