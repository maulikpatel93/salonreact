// import React from "react";
// import { useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ReactPaginate from 'react-paginate';

const Membership = () => {
  // const dispatch = useDispatch();
  // const { t } = useTranslation();
  return (
    <>
      <div className="complete-box text-center d-flex flex-column justify-content-center mt-xs-4">
        <div className="complete-box-wrp text-center">
          <img src="assets/images/voucher.png" alt="" className="mb-md-4 mb-3" />
          <h5 className="mb-2 fw-semibold">
            There are no memberships available.
            <a href="#">Please create one first.</a>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Membership;
