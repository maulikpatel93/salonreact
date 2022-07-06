import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { OpenAddStripeForm } from "store/slices/stripeSlice";

const SMSUsage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  return (
    <>
      <div className="row mx-0 h-100">
        <div className="col-xl-6 left-content bg-white text-md-start text-center h-100">
          <h4 className="fw-semibold mb-2">{t("SMS Usage")}</h4>
          <h6>{t("Here is your monthly SMS usage. If you use up your monthly SMS credits you may purchase additional SMS credits.")}</h6>
          <a href="#" id="addsms-credit" className="btn btn-primary fw-bold">
            {t("Purchase SMS Credits")}
          </a>
        </div>
        <div className="col-xl-6 right-content h-100">
          <div className="row gx-xl-5 px-xxl-3">
            <div className="col-md-6">
              <a className="box-image-cover w-100 mx-0 border-0 pb-xxl-5" href="#">
                <div className="image-content pt-0 mb-md-4 mb-3">
                  <h5 className="fw-semibold">{t("SMS Remaining")}</h5>
                </div>
                <div className="tabs-image user-initial mx-auto d-flex flex-wrap align-items-center justify-content-center">
                  <h1 className="mb-0 fw-semibold color-wine">80</h1>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a className="box-image-cover w-100 mx-0 border-0 pb-xxl-5" href="#">
                <div className="image-content pt-0 mb-md-4 mb-3">
                  <h5 className="fw-semibold">John Doe</h5>
                </div>
                <div className="tabs-image user-initial mx-auto d-flex flex-wrap align-items-center justify-content-center">
                  <h1 className="mb-0 fw-semibold color-wine">120</h1>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMSUsage;
