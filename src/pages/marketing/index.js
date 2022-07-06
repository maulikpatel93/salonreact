import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import { MarketingTabGridView, OpenAddBirthdayOfferForm, OpenClientBirthdayList } from "store/slices/marketingSlice";
import config from "../../config";
import BirthdayOfferAddForm from "./Form/BirthdayOfferAddForm";
import BirthdayOfferEditForm from "./Form/BirthdayOfferEditForm";
import ClientBirthdayListView from "./List/ClientBirthdayListView";

const Marketing = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabview = useSelector((state) => state.marketing.isTabView);
  const isOpenAddBirthdayOfferForm = useSelector((state) => state.marketing.isOpenAddBirthdayOfferForm);
  const isOpenEditBirthdayOfferForm = useSelector((state) => state.marketing.isOpenEditBirthdayOfferForm);
  const isOpenClientBirthdayListView = useSelector((state) => state.marketing.isOpenClientBirthdayListView);

  const AutomatedCampaignsObj = [
    {
      id: "BirthdayOffer",
      title: t("Birthday Offer"),
      description: t("Send a birthday discount to clients to increase client loyalty and repeat bookings."),
      icon: config.imagepath + "birthday.png",
    },
    {
      id: "GetClientsBack",
      title: t("Get Clients Back"),
      description: t("Send a discount to absent clients to encourage them to return."),
      icon: config.imagepath + "back.png",
    },
    {
      id: "NewClient",
      title: t("Get Clients Back"),
      description: t("Make a new customer a repeat customer with a second-booking discount."),
      icon: config.imagepath + "clients.png",
    },
    {
      id: "Review",
      title: t("Review"),
      description: t("Send a request for clients to review your business."),
      icon: config.imagepath + "review.png",
    },
  ];
  return (
    <>
      <div className="page-content page-marketing">
        <div className="d-flex align-items-start ac-setup">
          <div className="nav flex-column nav-pills acsetup-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "AutomatedCampaigns" ? " active" : "")} id="v-pills-AutomatedCampaigns-tab" data-bs-toggle="pill" data-bs-target="#v-pills-AutomatedCampaigns" type="button" role="tab" aria-controls="v-pills-AutomatedCampaigns" aria-selected="true" onClick={() => dispatch(MarketingTabGridView("AutomatedCampaigns"))}>
              {t("Automated Campaigns")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "OneOffCampaigns" ? " active" : "")} id="v-pills-OneOffCampaigns-tab" data-bs-toggle="pill" data-bs-target="#v-pills-OneOffCampaigns" type="button" role="tab" aria-controls="v-pills-OneOffCampaigns" aria-selected="false" onClick={() => dispatch(MarketingTabGridView("OneOffCampaigns"))}>
              {t("One-Off Campaigns")}
            </button>
            <button className={"nav-link cursor-pointer" + (tabview && tabview == "Academy" ? " active" : "")} id="v-pills-Academy-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Academy" type="button" role="tab" aria-controls="v-pills-Academy" aria-selected="false" onClick={() => dispatch(MarketingTabGridView("Academy"))}>
              {t("Academy")}
            </button>
          </div>
          <div className="acsetup-right">
            {!tabview && (
              <div className="alltab-box">
                <div className="row gutter-40">
                  <div className="col-lg-4 col-sm-6">
                    <a className="box-image-cover w-100" onClick={() => dispatch(MarketingTabGridView("AutomatedCampaigns"))}>
                      <div className="box-content">
                        <div className="box-image mb-4">
                          <img src={config.imagepath + "automated.png"} alt="automated.png" className="img-fluid" />
                        </div>
                        <h5 className="mb-2 fw-semibold">{t("Automated Campaigns")}</h5>
                        <p>{t("Boost repeat business with automated customer campaigns.")}</p>
                        <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <a className="box-image-cover w-100" onClick={() => dispatch(MarketingTabGridView("OneOffCampaigns"))}>
                      <div className="box-content">
                        <div className="box-image mb-4">
                          <img src={config.imagepath + "one-off.png"} alt="one-off.png" className="img-fluid" />
                        </div>
                        <h5 className="mb-2 fw-semibold">{t("One-Off Campaigns")}</h5>
                        <p>{t("Reach and engage with all your clients with one-off campaigns.")}</p>
                        <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <a className="box-image-cover w-100" onClick={() => dispatch(MarketingTabGridView("Academy"))}>
                      <div className="box-content">
                        <div className="box-image mb-4">
                          <img src={config.imagepath + "academy.png"} alt="academy.png" className="img-fluid" />
                        </div>
                        <h5 className="mb-2 fw-semibold">{t("Academy")}</h5>
                        <p>{t("Accelerate your business growth with marketing tools and tips.")}</p>
                        <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="tab-content" id="v-pills-tabContent">
              <div className={"tab-pane fade " + (tabview && tabview == "AutomatedCampaigns" ? " show active" : "")} id="v-pills-AutomatedCampaigns" role="tabpanel" aria-labelledby="v-pills-AutomatedCampaigns-tab">
                <div className="row gutter-40">
                  {AutomatedCampaignsObj.length > 0 &&
                    Object.keys(AutomatedCampaignsObj).map((item, i) => {
                      let id = AutomatedCampaignsObj[item].id;
                      let title = AutomatedCampaignsObj[item].title;
                      let description = AutomatedCampaignsObj[item].description;
                      let icon = AutomatedCampaignsObj[item].icon;
                      if (id === "BirthdayOffer") {
                        return (
                          <div className="col-lg-4 col-sm-6" key={i} onClick={() => dispatch(OpenAddBirthdayOfferForm("open"))}>
                            <a id={id} className="box-image-cover w-100 cursor-pointer">
                              <div className="box-content">
                                <div className="box-image mb-4">
                                  <img src={icon} alt="automated.png" className="img-fluid" />
                                </div>
                                <h5 className="mb-2 fw-semibold">{title}</h5>
                                <p>{description}</p>
                                <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                              </div>
                            </a>
                          </div>
                        );
                      }else if (id === "GetClientsBack") {
                        return (
                          <div className="col-lg-4 col-sm-6" key={i} onClick={() => dispatch(OpenClientBirthdayList("open"))}>
                            <a id={id} className="box-image-cover w-100 cursor-pointer">
                              <div className="box-content">
                                <div className="box-image mb-4">
                                  <img src={icon} alt="automated.png" className="img-fluid" />
                                </div>
                                <h5 className="mb-2 fw-semibold">{title}</h5>
                                <p>{description}</p>
                                <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                              </div>
                            </a>
                          </div>
                        );
                      } else {
                        return (
                          <div className="col-lg-4 col-sm-6" key={i}>
                            <a id={id} className="box-image-cover w-100 cursor-pointer">
                              <div className="box-content">
                                <div className="box-image mb-4">
                                  <img src={icon} alt="automated.png" className="img-fluid" />
                                </div>
                                <h5 className="mb-2 fw-semibold">{title}</h5>
                                <p>{description}</p>
                                <button className="theme-btn btn btn-primary">{t("Set Up")}</button>
                              </div>
                            </a>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "OneOffCampaigns" ? " show active" : "")} id="v-pills-OneOffCampaigns" role="tabpanel" aria-labelledby="v-pills-OneOffCampaigns-tab">
                <div className="oneoff-tab">
                  <a className="box-image-cover d-block cursor-pointer" id="createNewCampaigns">
                    <div className="tabs-image">
                      <img src={config.imagepath + "one-off.png"} alt="one-off.png" width="44" height="47" />
                    </div>
                    <div className="image-content">
                      <h5>
                        <i className="fal fa-plus me-2"></i>
                        {t("Create New")}
                      </h5>
                    </div>
                  </a>
                </div>
              </div>
              <div className={"tab-pane fade " + (tabview && tabview == "Academy" ? " show active" : "")} id="v-pills-Academy" role="tabpanel" aria-labelledby="v-pills-Academy-tab"></div>
            </div>
          </div>
        </div>
      </div>
      {isOpenAddBirthdayOfferForm && <BirthdayOfferAddForm />}
      {isOpenEditBirthdayOfferForm && <BirthdayOfferEditForm />}
      {isOpenClientBirthdayListView && <ClientBirthdayListView />}
    </>
  );
};

export default Marketing;
