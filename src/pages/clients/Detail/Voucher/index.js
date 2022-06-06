import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { ClientVoucherListViewApi } from "store/slices/clientvoucherSlice";
import config from "../../../../config";
import Moment from "react-moment";
import moment from "moment";

const Voucher = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const voucherViews = useSelector((state) => state.clientvoucher.isListView);
  const voucherObjectData = voucherViews && voucherViews.data ? voucherViews.data : voucherViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataVoucherList = () => {
    dispatch(ClientVoucherListViewApi({ client_id: detail.id, next_page_url: voucherViews.next_page_url }));
  };
  return (
    <>
      <InfiniteScroll className="row gx-0" dataLength={voucherObjectData && voucherObjectData.length ? voucherObjectData.length : "0"} next={fetchDataVoucherList} scrollableTarget="voucherlist" hasMore={voucherViews.next_page_url ? true : false} loader={<PaginationLoader />}>
        {voucherObjectData.length > 0 ? (
          <>
            {Object.keys(voucherObjectData).map((item, i) => {
              console.log(voucherObjectData[item]);
              let code = voucherObjectData[item].code;
              let expiry_at = voucherObjectData[item].voucher ? voucherObjectData[item].voucher.expiry_at : "";
              let amount = voucherObjectData[item].amount;
              let remaining_balance = voucherObjectData[item].remaining_balance;
              let toname = voucherObjectData[item].first_name + " " + voucherObjectData[item].last_name;
              return (
                <div className="mb-lg-2" key={i}>
                  <a className="text-decoration-none event-box">
                    <h6 className="mb-1 color-wine fw-semibold d-flex justify-content-between align-items-start">
                      {t("Code") + " : " + code} <span className="active">{t("Active")}</span>
                    </h6>
                    {expiry_at ? <h6 className="mb-1">{t("Expires on {{date}}", { date: moment(expiry_at).format("Do MMMM YYYY") })}</h6> : ""}
                    <div className="row">
                      {/* <h6 className="col-md-6 mb-1">
                        <b>From:</b> Jo Smith
                      </h6> */}
                      <h6 className="col-md-6 mb-1">
                        <b>{t("To")}:</b> {toname}
                      </h6>
                    </div>
                    <div className="row">
                      <h6 className="col-6 mb-1">
                        <b>{t("Initial Value")}</b>
                      </h6>
                      <h6 className="col-6 mb-1 text-end">${amount}</h6>
                    </div>
                    <div className="row">
                      <h6 className="col-6 mb-0">
                        <b>{t("Balance")}</b>
                      </h6>
                      <h6 className="col-6 mb-0 text-end">
                        <b>${remaining_balance}</b>
                      </h6>
                    </div>
                  </a>
                </div>
              );
            })}
          </>
        ) : (
          <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
            <div className="complete-box-wrp text-center">
              <img src={config.imagepath + "nots.png"} alt="" className="mb-md-4 mb-3" />
              <h5 className="mb-2 fw-semibold">{t("There are no vouchers available.")}</h5>
            </div>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
};

export default Voucher;
