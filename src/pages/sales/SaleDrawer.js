import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

import { closeAddSaleForm, SaleTabView, SaleServiceApi, SaleServiceSearchName, SaleProductApi, SaleProductSearchName } from "store/slices/saleSlice";
import { clientSearchName, clientSearchObj } from "store/slices/clientSlice";
import PaginationLoader from "component/PaginationLoader";
import SaleAddForm from "./Form/SaleAddForm";
import ClientAddForm from "pages/clients/Form/ClientAddForm";
import SaleProductListView from "./List/SaleProductListView";
import SaleServiceListView from "./List/SaleServiceListView";

const SaleDrawer = (props) => {
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedAddForm);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isRangeInfo = props.isRangeInfo;
  const tabview = useSelector((state) => state.sale.isSaleTabView);
  const isServices = useSelector((state) => state.sale.isServices);
  const isServiceSearchName = useSelector((state) => state.sale.isServiceSearchName);
  const isProducts = useSelector((state) => state.sale.isProducts);
  const isProductSearchName = useSelector((state) => state.sale.isProductSearchName);
  const isAppointmentDetail = useSelector((state) => state.sale.isAppointmentDetail);

  useEffect(() => {
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
  }, [tabview]);

  const handleCloseAddsaleForm = () => {
    dispatch({ type: "sale/reset" });
    dispatch(clientSearchName(""));
    dispatch(clientSearchObj(""));
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
              <div className="col-md-6 p-0 left-col mb-md-0 mb-3">
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
                        {tabview && tabview === "vouchers" && (
                          <>
                            <input type="text" className="form-control search-input" placeholder={t("Search Voucher")} value={isProductSearchName} onInput={(e) => dispatch(SaleProductSearchName(e.target.value))} onClick={handleClickSearchProduct} onKeyUp={handleKeyUpSearchProduct} onBlur={handleOnBlurProduct} />
                            <a className="close" style={{ display: isProductSearchName ? "block" : "none" }} onClick={handleCloseSearchProduct}>
                              <i className="fal fa-times"></i>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
                        <div className="row gx-3">
                          <div className="col-md-6 text-center mb-3">
                            <a href="#" id="invoice-link" className="d-block voucher-box">
                              <h5 className="mb-1 fw-semibold">One-Off Voucher</h5>
                              <h6 className="mb-0">Custom Value</h6>
                            </a>
                          </div>
                          <div className="col-md-6 text-center mb-3">
                            <a href="#" id="invoice-link" className="d-block voucher-box">
                              <h5 className="mb-1 fw-semibold">$25 off Men’s Haircuts</h5>
                              <h6 className="mb-0">$25</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className={"tab-pane" + (tabview && tabview === "subscriptions" ? " show active" : "")} id="subscriptions"></div>
                      <div className={"tab-pane" + (tabview && tabview === "memberships" ? " show active" : "")} id="memberships"></div>
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
    </>
  );
};
SaleDrawer.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default SaleDrawer;
