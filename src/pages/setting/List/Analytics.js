import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { OpenAddStripeForm } from "store/slices/stripeSlice";

const Analytics = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  return (
    <>
      <h4 className="fw-semibold">Analytics</h4>
      
    </>
  );
};

export default Analytics;
