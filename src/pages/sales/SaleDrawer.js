import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

import { closeAddSaleForm, SaleTabView, SaleServiceApi, SaleServiceSearchName, SaleProductApi, SaleProductSearchName, SaleVoucherApi, SaleMembershipApi, CloseCheckoutForm } from "store/slices/saleSlice";
import { ClientSearchName, ClientSearchObj } from "store/slices/clientSlice";
import PaginationLoader from "component/PaginationLoader";
import SaleAddForm from "./Form/SaleAddForm";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import SaleProductListView from "./List/SaleProductListView";
import SaleServiceListView from "./List/SaleServiceListView";
import SaleVoucherGridView from "./List/SaleVoucherGridView";
import SaleMembershipGridView from "./List/SaleMembershipGridView";
import SaleVoucherToForm from "./Form/SaleVoucherToForm";
import SaleCheckoutForm from "./Form/SaleCheckoutForm";

const SaleDrawer = (props) => {
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedAddForm);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const page = props.page;
  const isRangeInfo = props.isRangeInfo;
  const tabview = useSelector((state) => state.sale.isSaleTabView);
  const isServices = useSelector((state) => state.sale.isServices);
  const isServiceSearchName = useSelector((state) => state.sale.isServiceSearchName);
  const isProducts = useSelector((state) => state.sale.isProducts);
  const isProductSearchName = useSelector((state) => state.sale.isProductSearchName);
  const isAppointmentDetail = useSelector((state) => state.sale.isAppointmentDetail);
  const isVouchers = useSelector((state) => state.sale.isVouchers);
  const isMembership = useSelector((state) => state.sale.isMembership);
  const isOpenedVoucherToForm = useSelector((state) => state.sale.isOpenedVoucherToForm);
  const isOpenedCheckoutForm = useSelector((state) => state.sale.isOpenedCheckoutForm);
  const isCartCheckout = useSelector((state) => state.sale.isCart);

  useEffect(() => {
    const isCartCount = [];
    if (isCartCheckout) {
      Object.keys(isCartCheckout).map((c) => {
        if (isCartCheckout[c].length > 0) {
          isCartCount.push(isCartCheckout[c].length);
        }
      });
    }
    if (isCartCount.length === 0 && isAppointmentDetail === "") {
      dispatch(CloseCheckoutForm());
    }
    if (tabview === "services") {
      if (isServiceSearchName) {
        dispatch(SaleServiceApi({ q: isServiceSearchName }));
      } else {
        dispatch(SaleServiceApi());
      }
    }
    if (tabview === "products") {
      if (isProductSearchName) {
        dispatch(SaleProductApi({ q: isProductSearchName }));
      } else {
        dispatch(SaleProductApi());
      }
    }

    if (tabview === "vouchers") {
      dispatch(SaleVoucherApi());
    }

    if (tabview === "memberships") {
      dispatch(SaleMembershipApi());
    }
  }, [tabview, isCartCheckout, isAppointmentDetail]);

  const handleCloseAddsaleForm = () => {
    if (page !== "createinvoice") {
      dispatch({ type: "sale/reset" });
    }
    dispatch(ClientSearchName(""));
    dispatch(ClientSearchObj(""));
    dispatch(closeAddSaleForm());
  };

  //Service search
  const handleClickSearchService = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(SaleServiceApi({ q: q }));
    }
  };
  const handleKeyUpSearchService = (e) => {
    let q = e.currentTarget.value;
    dispatch(SaleServiceSearchName(q));
    if (q && q.length > 0) {
      dispatch(SaleServiceApi({ q: q })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          // dispatch(closeCategorysearchList());
        }
      });
    } else {
      dispatch(SaleServiceApi());
    }
  };
  const handleCloseSearchService = () => {
    dispatch(SaleServiceSearchName(""));
    dispatch(SaleServiceApi());
  };
  const handleOnBlurService = () => {};

  //Product search
  const handleClickSearchProduct = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(SaleProductApi({ q: q }));
    }
  };
  const handleKeyUpSearchProduct = (e) => {
    let q = e.currentTarget.value;
    dispatch(SaleProductSearchName(q));
    if (q && q.length > 0) {
      dispatch(SaleProductApi({ q: q })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          // dispatch(closeSupplierSearchList());
        }
      });
    } else {
      dispatch(SaleProductApi());
    }
  };
  const handleCloseSearchProduct = () => {
    dispatch(SaleProductSearchName(""));
    dispatch(SaleProductApi());
  };
  const handleOnBlurProduct = () => {};

  //Pagination Product
  const fetchDataSaleProduct = () => {
    dispatch(SaleProductApi({ next_page_url: isProducts.next_page_url }));
  };
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const loadMoreProducts = () => {
    setIsFetchingProducts(true);
    dispatch(SaleProductApi({ next_page_url: isProducts.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingProducts(false);
    }, 2000);
  };

  //Pagination Service
  const fetchDataSaleService = () => {
    dispatch(SaleServiceApi({ next_page_url: isProducts.next_page_url }));
  };
  const [isFetchingServices, setIsFetchingServices] = useState(false);
  const loadMoreServices = () => {
    setIsFetchingServices(true);
    dispatch(SaleServiceApi({ next_page_url: isServices.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingServices(false);
    }, 2000);
  };

  //Pagination Voucher
  const fetchDataSaleVoucher = () => {
    dispatch(SaleVoucherApi({ next_page_url: isVouchers.next_page_url }));
  };
  const [isFetchingVouchers, setIsFetchingVouchers] = useState(false);
  const loadMoreVouchers = () => {
    setIsFetchingVouchers(true);
    dispatch(SaleVoucherApi({ next_page_url: isVouchers.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingVouchers(false);
    }, 2000);
  };

  //Pagination Membership
  const fetchDataSaleMembership = () => {
    dispatch(SaleMembershipApi({ next_page_url: isVouchers.next_page_url }));
  };
  const [isFetchingMembership, setIsFetchingMembership] = useState(false);
  const loadMoreMembership = () => {
    setIsFetchingMembership(true);
    dispatch(SaleMembershipApi({ next_page_url: isMembership.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingMembership(false);
    }, 2000);
  };

  return (
    <>
      <div className={(rightDrawerOpened ? "full-screen-drawer p-0 salevoucher-drawer " : "") + rightDrawerOpened} id="salevoucher-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">{isAppointmentDetail ? t("Checkout") : t("New Sale")}</h1>
            <a className="close-drawer cursor-pointer" onClick={handleCloseAddsaleForm}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <div className="row mx-0">
              <div className="col-md-6 p-0 left-col">
                <div className="common-tab salevoucher-tab border-top-0">
                  <ul className="nav nav-tabs bg-white sticky-top" role="tablist">
                    <li className="nav-item">
                      <a className={"nav-link " + (tabview && tabview === "services" ? " active" : "")} id="services-tab" data-bs-toggle="tab" data-bs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="true" onClick={() => dispatch(SaleTabView("services"))}>
                        {t("Services")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={"nav-link " + (tabview && tabview === "products" ? " active" : "")} id="product-tab" data-bs-toggle="tab" data-bs-target="#product" type="button" role="tab" aria-controls="product" aria-selected="true" onClick={() => dispatch(SaleTabView("products"))}>
                        {t("Products")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={"nav-link " + (tabview && tabview === "vouchers" ? " active" : "")} id="vouchers-tab" data-bs-toggle="tab" data-bs-target="#vouchers" type="button" role="tab" aria-controls="vouchers" aria-selected="true" onClick={() => dispatch(SaleTabView("vouchers"))}>
                        {t("Vouchers")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={"nav-link " + (tabview && tabview === "subscriptions" ? " active" : "")} id="subscriptions-tab" data-bs-toggle="tab" data-bs-target="#subscriptions" type="button" role="tab" aria-controls="subscriptions" aria-selected="true" onClick={() => dispatch(SaleTabView("subscriptions"))}>
                        {t("Subscriptions")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className={"nav-link " + (tabview && tabview === "memberships" ? " active" : "")} id="memberships-tab" data-bs-toggle="tab" data-bs-target="#memberships" type="button" role="tab" aria-controls="memberships" aria-selected="true" onClick={() => dispatch(SaleTabView("memberships"))}>
                        {t("Memberships")}
                      </a>
                    </li>
                  </ul>
                  {tabview && (tabview === "services" || tabview === "products") && (
                    <div className="bg-white px-md-4 px-3 py-lg-3 py-2">
                      <div className="search ">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="far fa-search"></i>
                          </span>
                          {tabview && tabview === "services" && (
                            <>
                              <input type="text" className="form-control search-input" placeholder={t("Search Service")} value={isServiceSearchName} onInput={(e) => dispatch(SaleServiceSearchName(e.target.value))} onClick={handleClickSearchService} onKeyUp={handleKeyUpSearchService} onBlur={handleOnBlurService} />
                              <a className="close cursor-pointer" style={{ display: isServiceSearchName ? "block" : "none" }} onClick={handleCloseSearchService}>
                                <i className="fal fa-times"></i>
                              </a>
                            </>
                          )}
                          {tabview && tabview === "products" && (
                            <>
                              <input type="text" className="form-control search-input" placeholder={t("Search Product")} value={isProductSearchName} onInput={(e) => dispatch(SaleProductSearchName(e.target.value))} onClick={handleClickSearchProduct} onKeyUp={handleKeyUpSearchProduct} onBlur={handleOnBlurProduct} />
                              <a className="close" style={{ display: isProductSearchName ? "block" : "none" }} onClick={handleCloseSearchProduct}>
                                <i className="fal fa-times"></i>
                              </a>
                            </>
                          )}
                          {/* {tabview && tabview === "vouchers" && (
                              <>
                                <input type="text" className="form-control search-input" placeholder={t("Search Voucher")} value={isProductSearchName} onInput={(e) => dispatch(SaleProductSearchName(e.target.value))} onClick={handleClickSearchProduct} onKeyUp={handleKeyUpSearchProduct} onBlur={handleOnBlurProduct} />
                                <a className="close" style={{ display: isProductSearchName ? "block" : "none" }} onClick={handleCloseSearchProduct}>
                                  <i className="fal fa-times"></i>
                                </a>
                              </>
                            )} */}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="container">
                    <div className="tab-content px-md-2 py-md-4 py-3">
                      <div className={"tab-pane" + (tabview && tabview === "services" ? " show active" : "")} id="services">
                        <InfiniteScroll className="" dataLength={isServices && isServices.data && isServices.data.length ? isServices.data.length : "0"} next={fetchDataSaleService} scrollableTarget="services" hasMore={isServices.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <SaleServiceListView view={isServices} searchname={isServiceSearchName} />
                          {!isFetchingServices && isServices.next_page_url && (
                            <div className="col-2 m-auto p-3 text-center">
                              <button onClick={loadMoreServices} className="btn btn-primary">
                                {t("More")}
                              </button>
                            </div>
                          )}
                        </InfiniteScroll>
                      </div>
                      <div className={"tab-pane" + (tabview && tabview === "products" ? " show active" : "")} id="product">
                        <InfiniteScroll className="" dataLength={isProducts && isProducts.data && isProducts.data.length ? isProducts.data.length : "0"} next={fetchDataSaleProduct} scrollableTarget="product" hasMore={isProducts.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <div className="table-responsive bg-white">
                            <table className="table table-hover mb-0">
                              <tbody>
                                <SaleProductListView view={isProducts} />
                                {isProducts.length <= 0 && (
                                  <tr className="">
                                    <td colSpan={2}>{t("No data found")}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          {!isFetchingProducts && isProducts.next_page_url && (
                            <div className="col-2 m-auto p-3 text-center">
                              <button onClick={loadMoreProducts} className="btn btn-primary">
                                {t("More")}
                              </button>
                            </div>
                          )}
                        </InfiniteScroll>
                      </div>
                      <div className={"tab-pane" + (tabview && tabview === "vouchers" ? " show active" : "")} id="vouchers">
                        <InfiniteScroll className="row pt-3" dataLength={isVouchers && isVouchers.data && isVouchers.data.length ? isVouchers.data.length : "0"} next={fetchDataSaleVoucher} scrollableTarget="product" hasMore={isVouchers.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <SaleVoucherGridView view={isVouchers} />
                          {isVouchers.length <= 0 && (
                            <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                              <div className="complete-box-wrp text-center ">
                                <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
                                <h4 className="mb-2 fw-semibold">{t("No vouchers have been added yet.")}</h4>
                              </div>
                            </div>
                          )}
                          {!isFetchingVouchers && isVouchers.next_page_url && (
                            <div className="col-2 m-auto p-3 text-center">
                              <button onClick={loadMoreVouchers} className="btn btn-primary">
                                {t("More")}
                              </button>
                            </div>
                          )}
                        </InfiniteScroll>
                      </div>
                      <div className={"tab-pane" + (tabview && tabview === "subscriptions" ? " show active" : "")} id="subscriptions"></div>
                      <div className={"tab-pane" + (tabview && tabview === "memberships" ? " show active" : "")} id="memberships">
                        <InfiniteScroll className="row" dataLength={isMembership && isMembership.data && isMembership.data.length ? isMembership.data.length : "0"} next={fetchDataSaleMembership} scrollableTarget="product" hasMore={isMembership.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <SaleMembershipGridView view={isMembership} />
                          {isMembership.length <= 0 && (
                            <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                              <div className="complete-box-wrp text-center ">
                                <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
                                <h4 className="mb-2 fw-semibold">{t("No membership have been added yet.")}</h4>
                              </div>
                            </div>
                          )}
                          {!isFetchingMembership && isMembership.next_page_url && (
                            <div className="col-2 m-auto p-3 text-center">
                              <button onClick={loadMoreMembership} className="btn btn-primary">
                                {t("More")}
                              </button>
                            </div>
                          )}
                        </InfiniteScroll>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-0 right-col flex-column justify-content-between d-flex flex-wrap">
                <SaleAddForm appointmentDetail={isAppointmentDetail} isRangeInfo={isRangeInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientAddForm />
      {isOpenedVoucherToForm && <SaleVoucherToForm isRangeInfo={isRangeInfo} />}
      {isOpenedCheckoutForm && <SaleCheckoutForm isRangeInfo={isRangeInfo} />}
    </>
  );
};
SaleDrawer.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  page: PropTypes.string,
};
export default SaleDrawer;
