import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";
import { ClientMembershipListViewApi } from "store/slices/clientmembershipSlice";
import Moment from "react-moment";

const Membership = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const membershipViews = useSelector((state) => state.clientmembership.isListView);
  const membershipObjectData = membershipViews && membershipViews.data ? membershipViews.data : membershipViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataMembershipList = () => {
    dispatch(ClientMembershipListViewApi({ client_id: detail.id, next_page_url: membershipViews.next_page_url }));
  };

  return (
    <>
      <div className="drawer-header">
        <h2 className="mb-4 pe-md-5 mb-lg-5">{t("Membership")}</h2>
      </div>
      <div className="content-wrp" id="membershiplist">
        <InfiniteScroll className="row gx-0" dataLength={membershipObjectData && membershipObjectData.length ? membershipObjectData.length : "0"} next={fetchDataMembershipList} scrollableTarget="membershiplist" hasMore={membershipViews.next_page_url ? true : false} loader={<PaginationLoader />}>
          {membershipObjectData.length > 0 ? (
            <>
              {Object.keys(membershipObjectData).map((item, i) => {
                let id = membershipObjectData[item].id;
                let membership = membershipObjectData[item].membership;
                let membership_name = membership && membership.name;
                let membership_credit = membership && membership.credit;
                let cost = membershipObjectData[item].cost;
                //let client_id = membershipObjectData[item].client_id;
                //let note = membershipObjectData[item].note;
                let created_at = membershipObjectData[item].created_at;
                return (
                  <div className="text-decoration-none event-box-pink" href="" key={i} data-id={id}>
                    <h6 className="mb-1 color-wine fw-semibold d-flex justify-content-between align-items-start">
                      {membership_name} <span className="active">{t("Active")}</span>
                    </h6>
                    <h6 className="mb-1 color-default">
                      {t("Issued")} : <Moment format="do MMMM YYYY">{created_at}</Moment>
                    </h6>
                    <div className="row">
                      <h6 className="col-md-6 mb-1"> {t("Purchase amount")}: </h6>
                      <h6 className="col-md-6 mb-1 text-end">${cost} </h6>
                    </div>
                    <div className="row">
                      <h6 className="col-6 mb-1">{t("Credit")}:</h6>
                      <h6 className="col-6 mb-1 text-end">${membership_credit}</h6>
                    </div>
                    <div className="row">
                      <h6 className="col-6 mb-0 fw-semibold">Balance</h6>
                      <h6 className="col-6 mb-0 text-end fw-semibold">$1000</h6>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
              <div className="complete-box-wrp text-center">
                <img src={config.imagepath + "nots.png"} alt="" className="mb-md-4 mb-3" />
                <h5 className="mb-2 fw-semibold">{t("There are no memberships available.")}</h5>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Membership;
