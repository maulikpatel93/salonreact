import React from "react";
// import { SalonModule } from "pages";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51Ko2rOSFsrov7HTSarhjgTN7nrsYLEVvOKqhMM3lq8b4ZOdIbP5Pj7TgUbZxr9C3apilJAmeSvEH9HcwLWbj6Nw400febhX2Ig");

const Account = () => {
  // SalonModule();
  const isStripePaymentStatus = useSelector((state) => state.stripe.isStripePaymentStatus);
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: isStripePaymentStatus.payment_intent_client_secret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Account;
