import React, { useState } from "react";
import { useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js";
import { t } from "i18next";
import PropTypes from "prop-types";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const client = props.client;
  const isStripePaymentStatus = props.isStripePaymentStatus;
  const amount = isStripePaymentStatus.amount;
  
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log(elements);
    console.log(stripe.card);
    console.log(isStripePaymentStatus);
    // await stripe
    //   .createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: {
    //       name: "Jenny Rosen",
    //     },
    //   })
    //   .then(function (result) {
    //     // Handle result.error or result.paymentMethod
    //   });
    const { error } = await stripe
      .confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: client ? client.first_name + "" + client.last_name : "",
            email: client ? client.email : "",
            phone: client ? client.phone_number : "",
          },
        },
        confirmParams: {
          return_url: "http://localhost:3000/return",
        },
      })
      .then(function (result) {
        console.log(result);
        // Handle result.error or result.paymentIntent
      });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-3">
        <button disabled={!stripe} className="btn btn-primary btn-block w-100">
          {t("Pay")} ${amount}
        </button>
        {/* Show error message to your customers */}
        <div className="invalid-feedback">{errorMessage && <div>{errorMessage}</div>}</div>
      </div>
    </form>
  );
};
CheckoutForm.propTypes = {
  isStripePaymentStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  client: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default CheckoutForm;
