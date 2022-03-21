import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { closeAddSaleForm } from "store/slices/saleSlice";

const SaleDrawer = () => {
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedAddForm);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleCloseAddsaleForm = () => {
    dispatch(closeAddSaleForm());
  };
  return (
    <>
      <div className={(rightDrawerOpened ? "full-screen-drawer p-0 salevoucher-drawer " : "") + rightDrawerOpened} id="salevoucher-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">{t("New Sale")}</h1>
            <a className="close-drawer cursor-pointer" onClick={handleCloseAddsaleForm}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <div className="row mx-0">
              <div className="col-md-6 p-0 left-col mb-md-0 mb-3">
                <div className="common-tab salevoucher-tab border-top-0">
                  <ul className="nav nav-tabs bg-white" role="tablist">
                    <li className="nav-item">
                      <a href="#" className="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="true">
                        Services
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" id="product-tab" data-bs-toggle="tab" data-bs-target="#product" type="button" role="tab" aria-controls="product" aria-selected="true">
                        Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link active" id="vouchers-tab" data-bs-toggle="tab" data-bs-target="#vouchers" type="button" role="tab" aria-controls="vouchers" aria-selected="true">
                        Vouchers
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" id="subscriptions-tab" data-bs-toggle="tab" data-bs-target="#subscriptions" type="button" role="tab" aria-controls="subscriptions" aria-selected="true">
                        Subscriptions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" id="memberships-tab" data-bs-toggle="tab" data-bs-target="#memberships" type="button" role="tab" aria-controls="memberships" aria-selected="true">
                        Memberships
                      </a>
                    </li>
                  </ul>
                  <div className="bg-white px-md-4 px-3 py-lg-3 py-2">
                    <div className="search ">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="far fa-search"></i>
                        </span>
                        <input type="text" className="form-control search-input" placeholder="Search services" />
                        <a href="#" className="close" style={{ display:"none" }}>
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
                  <div className="container">
                    <div className="tab-content px-md-2 py-md-4 py-3">
                      <div className="tab-pane" id="services">
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item mb-md-4 mb-3">
                            <h2 className="accordion-header" id="headingOne">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Hair
                              </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div className="accordion-body p-0">
                                <ul className="list-unstyled mb-0">
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Women’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Men’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Kid’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Blow Dry
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Beauty
                              </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                              <div className="accordion-body p-0">
                                <ul className="list-unstyled mb-0">
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Women’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Men’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Kid’s Haircut
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="" className="mb-0 fw-semibold">
                                          Blow Dry
                                        </label>
                                      </div>
                                      <div className="col-md-3 col-6 time">45 mins</div>
                                      <div className="col-md-3 col-6 price text-end">$100</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="product">
                        <div className="table-responsive bg-white">
                          <table className="table mb-0">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="row align-items-center flex-nowrap">
                                    <div className="pro-img">
                                      <img src="assets/images/product-img.png" alt="" />
                                    </div>
                                    <div className="pro-title">
                                      <h6 className="mb-1">Wella Fushion Intense Repair Shampoo</h6>
                                    </div>
                                  </div>
                                </td>
                                <td >$100.00</td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="row align-items-center flex-nowrap">
                                    <div className="pro-img">
                                      <img src="assets/images/product-img.png" alt="" />
                                    </div>
                                    <div className="pro-title">
                                      <h6 className="mb-1">Wella Fushion Intense Repair Shampoo</h6>
                                    </div>
                                  </div>
                                </td>
                                <td >$100.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane show active" id="vouchers">
                        <div className="row gx-3">
                          <div className="col-md-6 text-center mb-3">
                            <a href="#" id="invoice-link" className="d-block voucher-box">
                              <h5 className="mb-1 fw-semibold">One-Off Voucher</h5>
                              <h6 className="mb-0">Custom Value</h6>
                            </a>
                          </div>
                          <div className="col-md-6 text-center mb-3">
                            <a href="#" id="invoice-link" className="d-block voucher-box">
                              <h5 className="mb-1 fw-semibold">$25 off Men’s Haircuts</h5>
                              <h6 className="mb-0">$25</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="subscriptions"></div>
                      <div className="tab-pane" id="memberships"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-0 right-col flex-column justify-content-between d-flex flex-wrap">
                <div className="p-4 search-panel">
                  <div className="search large-input">
                    <div className="text-end">
                      <a href="#" id="addclient-link" className="h6 color-wine text-decoration-none mb-3">
                        <i className="fal fa-plus pe-1 small"></i>New Client
                      </a>
                    </div>
                    <div className="input-group mb-md-3 mb-1">
                      <span className="input-group-text">
                        <i className="far fa-search"></i>
                      </span>
                      <input type="text" className="form-control search-input" placeholder="Start typing client’s name" />
                      <a href="#" className="close">
                        <i className="fal fa-times"></i>
                      </a>
                    </div>
                    <div className="search-result dropdown-box">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <h3 className="mb-0">Jo Smith</h3>
                              <span className="mb-0">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <h3 className="mb-0">Jo Smith</h3>
                              <span className="mb-0">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-id">
                              <h3 className="mb-0">Jo Smith</h3>
                              <span className="mb-0">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="add-item-panel p-4" style={{ display:"none" }}>
                  <div className="flex-column justify-content-between d-flex flex-wrap">
                    <div className="user-box">
                      <div className="d-flex align-items-center">
                        <div className="user-initial me-3">js</div>
                        <div className="user-id">
                          <h3 className="mb-0">
                            Jo Smith{" "}
                            <a href="#" className="close ms-2">
                              <i className="fal fa-times"></i>
                            </a>
                          </h3>
                          <span>jo.smith@hotmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="complete-box text-center flex-column justify-content-center mt-md-5 mt-4">
                  <div className="complete-box-wrp text-center">
                    <img src="assets/images/voucher.png" alt="" className="mb-md-4 mb-3" />
                    <h4 className="mb-2 fw-semibold">There are no items added to the sale yet. Please choose one.</h4>
                  </div>
                </div>
                <div className="p-4 newsale-probox">
                  <div className="product-box mt-0 mb-3">
                    <div className="product-header" id="#checkout-probox">
                      <a href="#" className="close close d-block">
                        <i className="fal fa-times"></i>
                      </a>
                      <div className="row">
                        <div className="col-9">
                          <h4 className="mb-0 fw-semibold">Women’s Haircut</h4>
                        </div>
                        <h4 className="col-3 mb-0 text-end">$120</h4>
                      </div>
                    </div>
                    <div className=" d-block" id="checkout-probox">
                      <div className="card card-body">
                        <form action="">
                          <div className="row  align-items-center">
                            <div className="col-auto d-flex align-items-center mt-1">
                              <label htmlFor="" className="mb-0 me-3">
                                Staff
                              </label>
                              <select name="" id="" className="form-control">
                                <option>Amanda Jones</option>
                                <option>Amanda Jones demo</option>
                              </select>
                            </div>
                            <div className="col-auto price-input d-flex align-items-center mt-1">
                              <label htmlFor="" className="mb-0 me-3">
                                Cost
                              </label>
                              <input type="text" defaultValue="$120" className="form-control" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="product-box mt-0 mb-3 ps-2">
                    <div className="product-header" id="#checkout-probox">
                      <a href="#" className="close d-block">
                        <i className="fal fa-times"></i>
                      </a>
                      <div className="d-flex">
                        <div className="pro-img">
                          <img src="assets/images/product-img.png" alt="" />
                        </div>
                        <div className="pro-content">
                          <div className="row">
                            <div className="col-9">
                              <h4 className="mb-2 fw-semibold">Women’s Haircut</h4>
                              <div className="qty d-flex align-items-center">
                                <label htmlFor="" className="mb-0 me-3">
                                  Qty
                                </label>
                                <input type="text" defaultValue="1" className="form-control" />
                              </div>
                            </div>
                            <h4 className="col-3 mb-0 text-end">$120</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto p-4">
                  <form action="">
                    <input type="text" placeholder="Add a note..." className="form-control lg" />
                  </form>
                </div>
                <div className="full-screen-drawer-footer payment-option">
                  <div className="px-4 d-flex py-3 total">
                    <span className="h2 pe-2 mb-0">Total</span>
                    <span className="h2 text-end ms-auto mb-0">$120</span>
                  </div>
                  <div className="p-4">
                    <div className="row">
                      <div className="col">
                        <a href="#" id="payment-link" className="btn-dark btn-lg w-100">
                          Paid by Credit Card
                        </a>
                      </div>
                      <div className="col">
                        <a href="#" className="btn-dark btn-lg w-100">
                          Paid by Cash
                        </a>
                      </div>
                      <div className="col-lg mt-lg-0 mt-2">
                        <a href="#" className="btn-dark btn-lg w-100 pay-voucher">
                          Pay by Voucher
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="full-screen-drawer-footer" style={{ display:"none" }} id="paybycreditcard">
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

export default SaleDrawer;
