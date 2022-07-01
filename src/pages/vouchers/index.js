import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { VoucherGridViewApi, OpenAddVoucherForm } from "../../store/slices/voucherSlice";

import config from "../../config";
// import VoucherPreview from "./List/VoucherPreview";
import VoucherAddForm from "./Form/VoucherAddForm";
import VoucherEditForm from "./Form/VoucherEditForm";
// import VoucherSuggetionListView from "./List/VoucherSuggetionListView";
import PaginationLoader from "component/PaginationLoader";
import { SalonModule } from "pages";
import { checkaccess } from "helpers/Functions";
import VoucherGridView from "./List/VoucherGridView";
import SaleDrawer from "pages/sales/SaleDrawer";

const Vouchers = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const GridView = useSelector((state) => state.voucher.isGridView);
  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  const isOpenedAddForm = useSelector((state) => state.voucher.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.voucher.isOpenedEditForm);
  const saleIsOpenedAddForm = useSelector((state) => state.sale.isOpenedAddForm);
  // const isOpenedDetailModal = useSelector((state) => state.voucher.isOpenedDetailModal);

  useEffect(() => {
    dispatch(VoucherGridViewApi());
  }, [dispatch]);

  const handleOpenAddVoucherForm = () => {
    dispatch(OpenAddVoucherForm());
  };

  const fetchDataGrid = () => {
    dispatch(VoucherGridViewApi({ next_page_url: GridView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItemsGrid = () => {
    setIsFetching(true);
    dispatch(VoucherGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  return (
    <>
      <div className="page-content bg-pink service" id={"page-content"}>
        <div className="row bg-white align-items-center sticky-top">
          <div className="common-tab col-md-4 col-4 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start" role="tablist">
              <li className="nav-item">
                <a className="nav-link active cursor-pointer" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">
                  {t("All")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-md-0 mb-2 px-md-0 px-4 mt-md-0 mt-2 order-md-2 order-first">
            <div className="search search-radius">
              {/* <div className="input-group">
                <span className="input-group-text">
                  <i className="far fa-search"></i>
                </span>
                <input type="text" className="form-control search-input" placeholder={t("Search")} value={isSearchName} onInput={(e) => dispatch(VoucherSearchName(e.target.value))} onClick={handleClickSearch} onKeyUp={handleKeyUpSearch} onBlur={handleOnBlur} />
                <a className="close cursor-pointer" style={{ display: isSearchName ? "block" : "none" }} onClick={handleCloseSearch}>
                  <i className="fal fa-times"></i>
                </a>
              </div>
              <div className={"search-result dropdown-box " + isSearchList} id="search-content">
                <InfiniteScroll className="" dataLength={SuggetionView && SuggetionView.data && SuggetionView.data.length ? SuggetionView.data.length : "0"} next={fetchDataSuggetionList} scrollableTarget="search-content" hasMore={SuggetionView.next_page_url ? true : false} loader={<PaginationLoader />}>
                  <ul className="p-0 m-0 list-unstyled"><VoucherSuggetionListView view={SuggetionView} /></ul>
                </InfiniteScroll>
              </div> */}
            </div>
          </div>
          <div className="col-md-4 col-8 text-end ps-0 mb-md-0 mb-2 order-3">
            {checkaccess({ name: "create", role_id: role_id, controller: "vouchers", access }) && (
              <a id="addclient-drawer-link" className="btn btn-primary add-new-btn me-3 px-lg-4  cursor-pointer" onClick={handleOpenAddVoucherForm}>
                {t("New Voucher")}
              </a>
            )}
          </div>
        </div>
        <div className="tab-content list-view-content">
          <div className={"tab-pane show active"} id="all">
            {GridView.length > 0 || GridView.data ? (
              <div className="" id="scrollableGridView">
                <InfiniteScroll className="row" dataLength={GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-grid" hasMore={GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
                  {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && (
                    <a className="box-image-cover cursor-pointer" onClick={handleOpenAddVoucherForm}>
                      <div className="tabs-image">
                        <img src={config.imagepath + "tabs-image.png"} alt="" />
                      </div>
                      <div className="image-content">
                        <h5>
                          <i className="fal fa-plus me-2"></i> {t("Add New")}
                        </h5>
                      </div>
                    </a>
                  )}
                  <VoucherGridView currentUser={currentUser} view={GridView} role_id={role_id} access={access} />
                  {!isFetching && GridView.next_page_url && (
                    <div className="box-image-cover voucher-grid">
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
                {checkaccess({ name: "create", role_id: role_id, controller: "products", access }) && (
                  <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                    <div className="complete-box-wrp text-center ">
                      <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
                      <h4 className="mb-2 fw-semibold">
                        {t("No vouchers have been added yet.")}
                        <a className="add-product ms-1 cursor-pointer" onClick={() => dispatch(OpenAddVoucherForm())}>
                          {t("Please add one")}
                        </a>
                        .
                      </h4>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {isOpenedAddForm && <VoucherAddForm service={isServiceOption} />}
        {isOpenedEditForm && <VoucherEditForm service={isServiceOption} />}
        {checkaccess({ name: "create", role_id: role_id, controller: "sale", access }) && saleIsOpenedAddForm ? <SaleDrawer page={"voucher"} /> : ""}
      </div>
    </>
  );
};

export default Vouchers;
