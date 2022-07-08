import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { OpenAddStripeForm } from "store/slices/stripeSlice";
import { OpenMailchimpForm } from "store/slices/settingSlice";
import MailchimpForm from "../Form/MailchimpForm";

const Integration = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const isOpenedMailchimpForm = useSelector((state) => state.setting.isOpenedMailchimpForm);
  return (
    <>
      <h4 className="fw-semibold">Integrations</h4>
      <div className="row gx-xxl-5">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="inti-box text-center">
            <div className="img-wrp">
              <img src={config.imagepath + "canva.png"} alt="" />
            </div>
            <p>{t("Connect your Canva account to the Beauti Canva app to unleash your marketing potential.")}</p>
            <a className="btn btn-primary cursor-pointer">{t("Set Up")}</a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="inti-box text-center">
            <div className="img-wrp">
              <img src={config.imagepath + "stripe.png"} alt="" />
            </div>
            <p>{t("Connect your Stripe account to accept online bookings and payments.")}</p>
            {currentUser.stripe_account_id ? (
              <a className="fs-4">{t("Has already setup")}</a>
            ) : (
              <a className="btn btn-primary cursor-pointer" onClick={() => dispatch(OpenAddStripeForm())}>
                {t("Set Up")}
              </a>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="inti-box text-center">
            <div className="img-wrp">
              <img src={config.imagepath + "mailchimp.png"} alt="" />
            </div>
            <p>{t("Connect your mailchimp account to unlock the email marketing features of Beauti.")}</p>
            <a className="btn btn-primary cursor-pointer" onClick={() => dispatch(OpenMailchimpForm("open"))}>
              {t("Set Up")}
            </a>
          </div>
        </div>
      </div>
      {isOpenedMailchimpForm && <MailchimpForm />}
    </>
  );
};

export default Integration;
