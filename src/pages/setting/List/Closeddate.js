import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { OpenAddStripeForm } from "store/slices/stripeSlice";
import { CloseddateDeleteApi, CloseddateDetailApi, CloseddateListViewApi, OpenAddCloseddateForm, OpenEditCloseddateForm } from "store/slices/closedateSlice";
import CloseDateAddForm from "../Form/CloseDateAddForm";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import CloseDateEditForm from "../Form/CloseDateEditForm";
import { swalConfirm } from "../../../component/Sweatalert2";
import Moment from "react-moment";

const Closeddate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const isListView = useSelector((state) => state.closedate.isListView);
  const isListViewObjectData = isListView && isListView.data ? isListView.data : isListView;
  const isOpenedAddForm = useSelector((state) => state.closedate.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.closedate.isOpenedEditForm);

  useEffect(() => {
    dispatch(CloseddateListViewApi());
  }, []);

  const fetchDataList = () => {
    dispatch(CloseddateListViewApi({ next_page_url: isListView.next_page_url }));
  };

  const handleClosedDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete?"), message: t("Success"), confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(CloseddateDeleteApi({ id: event.id }));
    }
  };

  return (
    <>
      <div className="row mx-0">
        <div className="col-xl-6 left-content bg-white text-md-start text-center">
          <h4 className="fw-semibold mb-2">{t("Closed Dates")}</h4>
          <h6>{t("Add any dates your business will be closed, for example for public holidays, scheduled maintenance, staff training days etc. Bookings will not be able to be placed during these dates.")}</h6>
          <a id="addclosedate" className="btn btn-primary fw-bold cursor-pointer" onClick={() => dispatch(OpenAddCloseddateForm())}>
            {t("Add Closed Date")}
          </a>
        </div>
        <div className="col-xl-6 right-content">
          <InfiniteScroll className="row" dataLength={isListViewObjectData && isListViewObjectData.length ? isListViewObjectData.length : "0"} next={fetchDataList} scrollableTarget="page-content-ClosedDates" hasMore={isListView.next_page_url ? true : false} loader={<PaginationLoader />}>
            {Object.keys(isListViewObjectData).map((item, i) => {
              let id = isListViewObjectData[item].id;
              let start_date = isListViewObjectData[item].start_date;
              let end_date = isListViewObjectData[item].end_date;
              let reason = isListViewObjectData[item].reason;
              return (
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 text-start" key={i}>
                  <div className="row align-items-center">
                    <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                      <h5 className="fw-semibold mb-1">
                        <Moment format="ddd, MMMM Do YYYY">{start_date}</Moment> - <Moment format="ddd, MMMM Do YYYY">{end_date}</Moment>
                      </h5>
                      <h6 className="mb-0">{reason}</h6>
                    </div>
                    <div className="col-xxl-3 col-md-4 text-end">
                      <a
                        id="editclosedate"
                        className="edit me-1 cursor-pointer"
                        onClick={() => {
                          dispatch(OpenEditCloseddateForm());
                          dispatch(CloseddateDetailApi({ id }));
                        }}
                      >
                        {t("Edit")}
                      </a>
                      <a className="delete cursor-pointer" data-obj={JSON.stringify(isListViewObjectData[item])} onClick={handleClosedDelete}>
                        <i className="fas fa-trash text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
      {isOpenedAddForm && <CloseDateAddForm />}
      {isOpenedEditForm && <CloseDateEditForm />}
    </>
  );
};

export default Closeddate;
