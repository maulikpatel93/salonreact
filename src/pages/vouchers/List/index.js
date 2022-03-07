import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import VoucherListView from "./VoucherListView";
import { voucherListViewApi } from "../../../store/slices/voucherSlice";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";

const VoucherList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const ListView = useSelector((state) => state.voucher.isListView);
  const fetchDataGrid = () => {
    dispatch(voucherListViewApi({ next_page_url: ListView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(voucherListViewApi({ next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  return (
    <>
      <div className="voucher-avilable" id="voucher-avilable">
        {ListView.length > 0 || ListView.data ? (
          <section className="services-table">
            <div className="" id="scrollableGridView">
              <InfiniteScroll className="" dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataGrid} scrollableTarget="voucher-avilable" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />}>
                <VoucherListView currentUser={currentUser} view={ListView} role_id={role_id} access={access} />
                {!isFetching && ListView.next_page_url && (
                  <div className="col-2 m-auto text-center">
                    <button onClick={loadMoreItems} className="btn btn-primary m-4">
                      {t("More")}
                    </button>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </section>
        ) : (
          <>
            {checkaccess({ name: "create", role_id: role_id, controller: "voucher", access }) && (
              <div className="complete-box text-center d-flex flex-column justify-content-center">
                <div className="complete-box-wrp text-center">
                  <img src={config.imagepath + "voucher.png"} alt="" className="mb-md-4 mb-3" />
                  <h4 className="mb-2 fw-semibold">
                    {t("There are no vouchers available.")}
                    <br />
                    {t("Please create one")}.
                  </h4>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VoucherList;
