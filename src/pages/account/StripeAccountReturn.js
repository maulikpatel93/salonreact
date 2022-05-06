import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import { ReturnPaymentApi } from "store/slices/saleSlice";
import { useSearchParams } from "react-router-dom";

const StripeAccountReturn = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const redirect_status = searchParams.get("redirect_status");
  useEffect(() => {
    if (payment_intent && redirect_status && payment_intent_client_secret) {
      dispatch(ReturnPaymentApi({ payment_intent, payment_intent_client_secret, redirect_status }));
    }
  }, [payment_intent, payment_intent_client_secret, redirect_status]);
  return (
    <>
      <div className="page-content">
        <div className="container mx-auto">Hello StripeAccount Return</div>
      </div>
    </>
  );
};

export default StripeAccountReturn;
