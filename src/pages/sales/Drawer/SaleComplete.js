import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";

const SaleComplete = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="full-screen-drawer" id="salecomplete-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">Sale Completed</h1>
            <a href="#" className="close-drawer">
              <img src="assets/images/close-icon.svg" alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <div className="row mx-0">
              <div className="col-md-6 p-4 d-flex flex-column">
                <ul className="sale-comlete-data list-unstyled">
                  <li>
                    <h5 className="mb-1 fw-semibold">Tax Invoice #0001</h5>
                    <p className="mb-0">28th August 2021</p>
                  </li>
                  <li>
                    <label>Invoice to:</label>
                    <h6 className="mb-0">Jo Smith</h6>
                  </li>
                  <li>
                    <div className="row gx-1 justify-content-between">
                      <div className="col-10">
                        <label htmlFor="">Hair Cut & Blow Dry</label>
                        <h6 className="mb-1">With Amanda Jones from 9:00am - 10:00am</h6>
                        <span>Quantity: 1</span>
                      </div>
                      <label className="col-2 text-end">$120</label>
                    </div>
                  </li>
                  <li>
                    <div className="row gx-1 justify-content-between">
                      <div className="col-10">
                        <h6 className="mb-0">Includes GST of</h6>
                      </div>
                      <h6 className="mb-0 col-2 text-end">$10.91</h6>
                    </div>
                  </li>
                  <li className="total">
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 col-10">Total AUD</label>
                      <label className="mb-0 col-2 text-end">$120</label>
                    </div>
                  </li>
                  <li>
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 fw-normal col-10">Payment by Credit Card</label>
                      <label className="mb-0 fw-normal col-2 text-end">$120</label>
                    </div>
                  </li>
                  <li>
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 fw-normal col-10">Balance</label>
                      <label className="mb-0 fw-normal col-2 text-end">$0</label>
                    </div>
                  </li>
                </ul>
                <div className="d-flex mt-auto flex-lg-nowrap flex-wrap align-items-end">
                  <a href="#" className="btn-dark me-md-4 ">
                    print invoice
                  </a>
                  <form action="" className="w-100 mt-lg-0 mt-2">
                    <div className="d-flex align-items-end">
                      <div className="w-100">
                        <label htmlFor="">Email Invoice</label>
                        <input type="email" placeholder="josmith@gmail.com" className="form-control" />
                      </div>
                      <input type="submit" className="btn-dark ms-3" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 px-0 right-col flex-column justify-content-between d-flex flex-wrap">
                <div className="p-4">
                  <div className="user-box">
                    <a href="#" className="d-flex align-items-center">
                      <div className="user-initial me-3">js</div>
                      <div className="user-id">
                        <h3 className="mb-0">Jo Smith</h3>
                        <span>jo.smith@hotmail.com</span>
                      </div>
                    </a>
                  </div>
                  <div className="complete-box text-center d-flex flex-column justify-content-center mt-md-5 mt-4">
                    <div className="complete-box-wrp text-center">
                      <img src="assets/images/celebrate.png" alt="" className="mb-md-4 mb-3" />
                      <h3 className="mb-2 fw-semibold">
                        Congratulations! <br />
                        Sale Completed{" "}
                      </h3>
                      <h6>
                        28th August 2021 <br />
                        Payment by credit card{" "}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="full-screen-drawer-footer p-4">
                  <a href="#" className="btn btn-lg w-100">
                    make next appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
SaleComplete.propTypes = {
  //   view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};

export default SaleComplete;
