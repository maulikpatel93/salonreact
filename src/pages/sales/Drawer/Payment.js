import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";

const Payment = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="full-screen-drawer" id="payment-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">Payment</h1>
            <a href="#" className="close-drawer">
              <img src="assets/images/close-icon.svg" alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <div className="row mx-0">
              <div className="col-md-6 p-0 left-col">
                <div className="bg-white py-3 px-4">
                  <div className="search">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="far fa-search"></i>
                      </span>
                      <input type="text" className="form-control search-input" placeholder="Search services and products..." />
                      <a href="#" className="close" style={{ display: "none" }}>
                        <i className="fal fa-times"></i>
                      </a>
                    </div>
                    <div className="search-result dropdown-box">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mega-menu">
                  <div className="d-flex align-items-center">
                    <label className="mb-0 color-wine title">Add an Item</label>
                  </div>
                  <ul className="main-menu position-relative">
                    <li>
                      <a href="#">Add Services</a>

                      <ul className="level-1">
                        <li>
                          <a href="#">Beauty</a>
                          <ul className="level-2">
                            <li>
                              <a href="#">
                                Eyebrow tint <span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Eyelash Extensions - 30 Minute Refill<span>$40</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Eyelash Extensions - 60 Minute Refill<span>$60</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Eyelash Extensions - Classic Set<span>$60</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Eyelash Extensions - 30 Minute Removal<span>$70</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" id="new-sale-link">
                                Eyelash Tint<span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Wax - Eyebrow, Lip & Chin<span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Wax - Eyebrow<span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Wax - Eyebrow & Lip<span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Wax - Full Face<span>$20</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Wax - Lip or Chin<span>$20</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">colouring with one color</a>
                        </li>
                        <li>
                          <a href="#">cutting</a>
                        </li>
                        <li>
                          <a href="#">highlights</a>
                        </li>
                        <li>
                          <a href="#">multi-tonal colour</a>
                        </li>
                        <li>
                          <a href="#">package</a>
                        </li>
                        <li>
                          <a href="#">styling</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Add Products</a>
                    </li>
                    <li>
                      <a href="#">Add Voucher</a>
                    </li>
                    <li>
                      <a href="#">Add Subscription</a>
                    </li>
                    <li>
                      <a href="#">Add Membership</a>
                    </li>
                  </ul>
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
                  <div className="product-box">
                    <div className="product-header" data-bs-toggle="collapse" href="#checkout-probox">
                      <a href="#" className="close">
                        <i className="fal fa-times"></i>
                      </a>
                      <div className="row">
                        <div className="col-9">
                          <h4 className="mb-0 fw-semibold">Hair Cut & Blow Dry</h4>
                          <p>With Amanda Jones from 9:00am - 10:00am</p>
                        </div>
                        <h4 className="col-3 mb-0 text-end">$120</h4>
                      </div>
                    </div>
                    <div className="collapse" id="checkout-probox">
                      <div className="card card-body">
                        <form action="">
                          <div className="row gx-2">
                            <div className="qty">
                              <label htmlFor="">Qty</label>
                              <input type="text" defaultValue="1" className="form-control" />
                            </div>
                            <div className="price">
                              <label htmlFor="">Price</label>
                              <input type="text" defaultValue="$120" className="form-control" />
                            </div>
                            <div className="discount">
                              <label htmlFor="">Discount</label>
                              <div className="input-group">
                                <input type="text" defaultValue="0" className="form-control" />
                                <span className="ms-1">$</span>
                                <span className="disabled ms-1">%</span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto p-4">
                  <form action="">
                    <input type="text" placeholder="Add a note..." className="form-control lg" />
                  </form>
                </div>
                <div className="full-screen-drawer-footer">
                  <ul className="list-unstyled mb-0">
                    <li className="px-4 d-flex py-3 border-bottom">
                      <span className="h3 pe-2 mb-0">Total</span>
                      <span className="h3 text-end ms-auto mb-0">$120</span>
                    </li>
                    <li className="px-4 d-flex py-3 border-bottom">
                      <span className="h3 pe-2 mb-0">Payment by Credit Card</span>
                      <span className="h3 text-end ms-auto mb-0">$120</span>
                    </li>
                    <li className="px-4 d-flex py-3 border-bottom">
                      <span className="h3 pe-2 mb-0 fw-semibold">Balance</span>
                      <span className="h3 text-end ms-auto mb-0 fw-semibold">$0</span>
                    </li>
                  </ul>
                  <div className="p-4">
                    <a href="#" id="salecomplete-invoice-link" className="w-100 btn btn-lg">
                      Click To Complete Sale
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Payment.propTypes = {
  //   view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};

export default Payment;
