import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";

const StripeAccountReturn = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
   
  }, []);
  return (
    <>
      <div className="page-content">
        <div className="container mx-auto">Hello StripeAccount Return</div>
      </div>
    </>
  );
};

export default StripeAccountReturn;
