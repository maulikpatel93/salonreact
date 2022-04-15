import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubscriptionGridViewApi, OpenAddSubscriptionForm } from "../../store/slices/subscriptionSlice";

import config from "../../config";
// import SubscriptionPreview from "./List/SubscriptionPreview";
import SubscriptionAddForm from "./Form/SubscriptionAddForm";
import SubscriptionEditForm from "./Form/SubscriptionEditForm";
// import SubscriptionSuggetionListView from "./List/SubscriptionSuggetionListView";
import PaginationLoader from "component/PaginationLoader";
import { SalonModule } from "pages";
import { checkaccess } from "helpers/functions";
import SubscriptionGridView from "./List/SubscriptionGridView";
import SaleDrawer from "pages/sales/SaleDrawer";
import { OpenAddStripeForm, StripeCardPaymentApi } from "store/slices/stripeSlice";
import StripeSetupForm from "../account/Form/StripeSetupForm";

const Subscriptions = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const GridView = useSelector((state) => state.subscription.isGridView);
  const isOpenedAddForm = useSelector((state) => state.subscription.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.subscription.isOpenedEditForm);
  const saleIsOpenedAddForm = useSelector((state) => state.sale.isOpenedAddForm);
  const isOpenedStripeAddForm = useSelector((state) => state.stripe.isOpenedAddForm);

  useEffect(() => {
    dispatch(SubscriptionGridViewApi());
  }, [dispatch]);

  const handleOpenAddSubscriptionForm = () => {
    dispatch(OpenAddSubscriptionForm());
  };

  const fetchDataGrid = () => {
    dispatch(SubscriptionGridViewApi({ next_page_url: GridView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItemsGrid = () => {
    setIsFetching(true);
    dispatch(SubscriptionGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };
  const handleCardPayment = () => {
    dispatch(
      StripeCardPaymentApi({
        card: {
          number: "4242424242424242",
          exp_month: 4,
          exp_year: 2023,
          cvc: "314",
        },
      }),
    );
  };
  return (
    <>
      <div className="page-content subscription">
        <div className="row bg-white align-items-center me-0">
          <div className="common-tab col-md-4 col-7 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start border-0" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="subscription-stripe-tab" data-bs-toggle="tab" data-bs-target="#subscription-stripe" type="button" role="tab" aria-controls="subscription-stripe" aria-selected="true">
                  All
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 py-md-0 py-2 px-md-0 px-4 order-md-2 order-3 search-wrp">
            <div className="search search-radius">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="far fa-search"></i>
                </span>
                <input type="text" className="form-control search-input" placeholder="Search" />
                <a className="close" style={{ display: "none" }}>
                  <i className="fal fa-times"></i>
                </a>
              </div>
              <div className="search-result dropdown-box">
                <ul className="p-0 m-0 list-unstyled">
                  <li>
                    <a href="#" className="d-flex">
                      <div className="user-img me-2">
                        <img src={config.imagepath + "Avatar.png"} alt="" />
                      </div>
                      <div className="user-id">
                        <span className="user-name">Jo Smith</span>
                        <span className="user-id">jo.smith@gmail.com</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex">
                      <div className="user-img me-2">
                        <img src="assets/images/Avatar.png" alt="" />
                      </div>
                      <div className="user-id">
                        <span className="user-name">Jo Smith</span>
                        <span className="user-id">jo.smith@gmail.com</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex">
                      <div className="user-img me-2">
                        <img src="assets/images/Avatar.png" alt="" />
                      </div>
                      <div className="user-id">
                        <span className="user-name">Jo Smith</span>
                        <span className="user-id">jo.smith@gmail.com</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-end col-5 ps-0 order-md-3 order-2">
            {checkaccess({ name: "create", role_id: role_id, controller: "subscription", access }) && currentUser.stripe_account_id && (
              <a className="btn btn-primary fw-bold rounded-0 px-xl-4 add-subscription" onClick={handleOpenAddSubscriptionForm}>
                {t("Add New")}
              </a>
            )}
          </div>
        </div>
        <div className="container">
          <div className="tab-content px-lg-4 py-lg-5">
            <div className="tab-pane show active" id="allsubscription">
              <div className="row">
                <a onClick={handleCardPayment}>test</a>
                {GridView.length > 0 || GridView.data ? (
                  <div className="" id="scrollableGridView">
                    <InfiniteScroll className="row" dataLength={GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-grid" hasMore={GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
                      {checkaccess({ name: "create", role_id: role_id, controller: "subscription", access }) && (
                        <a className="box-image-cover cursor-pointer" onClick={handleOpenAddSubscriptionForm}>
                          <div className="tabs-image user-initial mx-auto">
                            <img src={config.imagepath + "SUBSCRIPTIONICON.png"} alt="" />
                          </div>
                          <div className="image-content">
                            <h5>
                              <i className="fal fa-plus me-2"></i> {t("Add New")}
                            </h5>
                          </div>
                        </a>
                      )}
                      <SubscriptionGridView currentUser={currentUser} view={GridView} role_id={role_id} access={access} />
                      {!isFetching && GridView.next_page_url && (
                        <div className="box-image-cover membership-grid">
                          <div className="tabs-image">
                            <img src={config.imagepath + "tabs-image.png"} alt="" />
                          </div>
                          <div className="image-content">
                            <button onClick={loadMoreItemsGrid} className="btn btn-primary">
                              {t("More")}
                            </button>
                          </div>
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                ) : (
                  <>
                    {checkaccess({ name: "create", role_id: role_id, controller: "subscription", access }) &&
                      (currentUser.stripe_account_id ? (
                        <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                          <div className="complete-box-wrp text-center ">
                            <img src={config.imagepath + "subscription.png"} alt="" className="mb-md-4 mb-3" onClick={() => dispatch(OpenAddStripeForm())}/>
                            <h4 className="mb-2 fw-semibold">
                              {t("No subscriptions have been")}
                              <br /> {t("created yet")}.
                              <br />
                              <a className="add-subscription" onClick={() => dispatch(OpenAddSubscriptionForm())}>
                                {t("Please create one")}
                              </a>
                              .
                            </h4>
                          </div>
                        </div>
                      ) : (
                        <div className="tab-pane show active" id="subscription-stripe">
                          <div className="complete-box text-center d-flex flex-column justify-content-center mt-md-5 mt-4 mb-4 substripe-complete">
                            <div className="complete-box-wrp text-center ">
                              <img src={config.imagepath + "subcription-stripe.png"} alt="" className="mb-md-4 mb-3" />
                              <h4 className="mb-2 fw-semibold">
                                {t("You must set up Stripe to be able to create a subscription.")}
                                <br />
                                <a onClick={() => dispatch(OpenAddStripeForm())}>{t("Setup Now")}</a>
                              </h4>
                            </div>
                          </div>
                          <div className="substripe-content text-center pt-xxl-2">
                            <h6>{t("You need to set up a payment gateway (Stripe) so you can take the automatic payments required for subscriptions. Once set up, return here and create your first subscription.")}</h6>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenedAddForm && <SubscriptionAddForm />}
      {isOpenedEditForm && <SubscriptionEditForm />}
      {isOpenedStripeAddForm && <StripeSetupForm />}
      {checkaccess({ name: "create", role_id: role_id, controller: "sale", access }) && saleIsOpenedAddForm ? <SaleDrawer page={"membership"} /> : ""}
    </>
  );
};

export default Subscriptions;
