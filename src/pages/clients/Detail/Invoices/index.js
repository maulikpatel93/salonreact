// import React from "react";
// import { useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ReactPaginate from 'react-paginate';

const Invoices = () => {
  // const dispatch = useDispatch();
  // const { t } = useTranslation();
  return (
    <>
      <div className="event-box">
        <div className="d-flex align-items-start">
          <a className="ms-auto invoice-link">
            <img src="assets/images/past.png" alt="" />
          </a>
          <div className="w-100 px-md-3 px-2">
            <h6 className="mb-1 color-wine fw-semibold">0004</h6>
            <h6 className="mb-1">Invoice date: Monday, 12th July 2021</h6>
            <h6 className="mb-0 fw-semibold">$120.00</h6>
          </div>
          <span className="active">Paid</span>
        </div>
      </div>
      <div className="event-box">
        <div className="d-flex align-items-start">
          <a className="ms-auto invoice-link">
            <img src="assets/images/past.png" alt="" />
          </a>
          <div className="w-100 px-md-3 px-2">
            <h6 className="mb-1 color-wine fw-semibold">0004</h6>
            <h6 className="mb-1">Invoice date: Monday, 12th July 2021</h6>
            <h6 className="mb-0 fw-semibold">$120.00</h6>
          </div>
          <span className="active">Paid</span>
        </div>
      </div>
      <div className="event-box">
        <div className="d-flex align-items-start">
          <a className="ms-auto invoice-link">
            <img src="assets/images/past.png" alt="" />
          </a>
          <div className="w-100 px-md-3 px-2">
            <h6 className="mb-1 color-wine fw-semibold">0004</h6>
            <h6 className="mb-1">Invoice date: Monday, 12th July 2021</h6>
            <h6 className="mb-0 fw-semibold">$120.00</h6>
          </div>
          <span className="active">Paid</span>
        </div>
      </div>
    </>
  );
};

export default Invoices;
