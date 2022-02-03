import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import PriceTierGridView from "./PriceTierGridView";
import { openAddPriceTierForm, pricetierGridViewApi } from "../../../store/slices/pricetierSlice";
import PriceTierAddForm from "./PriceTierAddForm";
import PriceTierEditForm from "./PriceTierEditForm";
import PaginationLoader from "component/PaginationLoader";

const PriceTier = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const tabview = useSelector((state) => state.staff.isTabView);
  const GridView = useSelector((state) => state.pricetier.isGridView);
  const isOpenedAddForm = useSelector((state) => state.pricetier.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.pricetier.isOpenedEditForm);

  const fetchDataGrid = () => {
    dispatch(pricetierGridViewApi({ next_page_url: GridView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(pricetierGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  return (
    <>
      <div className="" id="scrollableGridView">
        <InfiniteScroll className="row" dataLength={GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-price_tier" hasMore={tabview && tabview == "price_tier" && GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
          <a className="box-image-cover cursor-pointer" id="addstaff-member-link" onClick={() => dispatch(openAddPriceTierForm())}>
            <div className="tabs-image">
              <img src={config.imagepath + "tires.png"} alt="" />
            </div>
            <div className="image-content">
              <h5>
                <i className="fal fa-plus me-2"></i> {t("add_price_tier")}
              </h5>
            </div>
          </a>
          {isOpenedAddForm && <PriceTierAddForm />}
          {isOpenedEditForm && <PriceTierEditForm />}
          <PriceTierGridView currentUser={currentUser} view={GridView} />
          {!isFetching && GridView.next_page_url && (
            <div className="box-image-cover">
              <div className="tabs-image">
                <img src={config.imagepath + "tires.png"} alt="" />
              </div>
              <div className="image-content">
                <button onClick={loadMoreItems} className="btn btn-primary">
                  {t("more")}
                </button>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PriceTier;
