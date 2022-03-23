import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import SupplierGridView from "./SupplierGridView";
import { openAddSupplierForm, supplierGridViewApi } from "../../../store/slices/supplierSlice";
import PaginationLoader from "component/PaginationLoader";

const Suppliers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const GridView = useSelector((state) => state.supplier.isGridView);
  const fetchDataGrid = () => {
    dispatch(supplierGridViewApi({ next_page_url: GridView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(supplierGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  return (
    <>
      {GridView.length > 0 || GridView.data ? (
        <div className="" id="scrollableGridView">
          <InfiniteScroll className="row" dataLength={GridView && GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-supplier" hasMore={GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
            <a className="box-image-cover cursor-pointer" onClick={() => dispatch(openAddSupplierForm())}>
              <div className="tabs-image">
                <img src={config.imagepath + "suppliers.png"} alt="" />
              </div>
              <div className="image-content">
                <h5>
                  <i className="fal fa-plus me-2"></i> {t("Add New")}
                </h5>
              </div>
            </a>
            <SupplierGridView currentUser={currentUser} view={GridView} />
            {!isFetching && GridView.next_page_url && (
              <div className="box-image-cover">
                <div className="tabs-image">
                  <img src={config.imagepath + "suppliers.png"} alt="" />
                </div>
                <div className="image-content">
                  <button onClick={loadMoreItems} className="btn btn-primary">
                    {t("More")}
                  </button>
                </div>
              </div>
            )}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
          <div className="complete-box-wrp text-center ">
            <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
            <h4 className="mb-2 fw-semibold">
              {t("No suppliers have been created yet.")}
              <a className="add-suppliers ms-1 cursor-pointer" onClick={() => dispatch(openAddSupplierForm())}>
                {t("Please create one")}
              </a>
              .
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Suppliers;
