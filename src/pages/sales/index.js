import React from "react";
import { SalonModule } from "pages";

const Sales = () => {
  SalonModule();
  return (
    <>
       <div className="page-content">
                <section className="sales-list">
                    <div className="container">
                        <div className="row justify-content-between py-3 sales-list-header">
                            <div className="col-xl-8 col-lg-7 d-md-flex align-items-center">
                                <div className="list-group custom-tab me-sm-2 mb-sm-0 mb-2" id="myList" role="tablist">
                                    <a className="list-group-item list-group-item-action active" data-bs-toggle="list" href="#viewinvoices" role="tab">View Invoices</a>
                                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#createinvoice" role="tab">Create Invoice</a>
                                </div>
                                <form action="" className="d-inline-block">
                                    <input type="text" className="form-control date" defaultvalue="Last 30 days"/>
                                </form>
                            </div>
                            <div className="col-xl-4 col-lg-5 mt-lg-0 mt-2">
                                <div className="search ms-auto">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="far fa-search"></i></span>
                                        <input type="text" className="form-control search-input" placeholder="Search by invoice # or customer name"/>
                                        <a href="javascript:void(0)" className="close" style={{ display:'none' }}><i className="fal fa-times"></i></a>
                                    </div>
                                    <div className="search-result dropdown-box">
                                        <ul className="p-0 m-0 list-unstyled">
                                            <li>
                                            <a href="#" className="d-flex">
                                                <div className="user-img me-2"><img src="assets/images/Avatar.png" alt=""/></div>
                                                <div className="user-id">
                                                    <span className="user-name">Jo Smith</span>
                                                    <span className="user-id">jo.smith@gmail.com</span>
                                                </div>
                                            </a>
                                            </li>
                                            <li>
                                            <a href="#" className="d-flex">
                                                <div className="user-img me-2"><img src="assets/images/Avatar.png" alt=""/></div>
                                                <div className="user-id">
                                                    <span className="user-name">Jo Smith</span>
                                                    <span className="user-id">jo.smith@gmail.com</span>
                                                </div>
                                            </a>
                                            </li>
                                            <li>
                                            <a href="#" className="d-flex">
                                                <div className="user-img me-2"><img src="assets/images/Avatar.png" alt=""/></div>
                                                <div className="user-id">
                                                    <span className="user-name">Jo Smith</span>
                                                    <span className="user-id">jo.smith@gmail.com</span>
                                                </div>
                                            </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane active" id="viewinvoices" role="tabpanel">
                            
                        </div>
                        <div className="tab-pane" id="createinvoice" role="tabpanel">
                           
                        </div>
                    </div>
                    <div className="full-screen-drawer" id="salecomplete-drawer">
                        <div className="drawer-wrp position-relative">
                            <div className="drawer-header px-4 py-3">
                                <h1 className="pe-md-5 pe-3 mb-0">Sale Completed</h1>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
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
                                                <a href="#" className="btn-dark me-md-4 ">print invoice</a>
                                                <form action="" className="w-100 mt-lg-0 mt-2">
                                                    <div className="d-flex align-items-end">
                                                        <div className="w-100">
                                                            <label htmlFor="">Email Invoice</label>
                                                            <input type="email" placeholder="josmith@gmail.com" className="form-control"/>
                                                        </div>
                                                        <input type="submit" className="btn-dark ms-3"/>
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
                                                    <img src="assets/images/celebrate.png" alt="" className="mb-md-4 mb-3"/>
                                                    <h3 className="mb-2 fw-semibold">Congratulations! <br/>Sale Completed </h3>
                                                    <h6>28th August 2021 <br/>Payment by credit card </h6>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="full-screen-drawer-footer p-4">
                                            <a href="#" className="btn btn-lg w-100">make next appointment</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-screen-drawer" id="salecheckout-drawer">
                        <div className="drawer-wrp position-relative">
                            <div className="drawer-header px-4 py-3">
                                <h1 className="pe-md-5 pe-3 mb-0">Checkout</h1>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
                            </div>
                            <div className="drawer-body">
                                <div className="row mx-0">
                                    <div className="col-md-6 p-0 left-col">
                                        <div className="bg-white py-3 px-4"> 
                                            <div className="search">
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="far fa-search"></i></span>
                                                    <input type="text" className="form-control search-input" placeholder="Search services and products..."/>
                                                    <a href="javascript:void(0)" className="close" style={{ display: 'none' }}><i className="fal fa-times"></i></a>
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
                                                <li><a href="javascript:void(0)">Add Services</a>
                                                    
                                                    <ul className="level-1">
                                                        <li><a href="javascript:void(0)">Beauty</a>
                                                            <ul className="level-2">
                                                                <li><a href="#">Eyebrow tint <span>$20</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Refill<span>$40</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 60 Minute Refill<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - Classic Set<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Removal<span>$70</span></a></li>
                                                                <li><a href="javascript:void(0);" id="new-sale-link">Eyelash Tint<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow, Lip & Chin<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow & Lip<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Full Face<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Lip or Chin<span>$20</span></a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#">colouring with one color</a></li>
                                                        <li><a href="#">cutting</a></li>
                                                        <li><a href="#">highlights</a></li>
                                                        <li><a href="#">multi-tonal colour</a></li>
                                                        <li><a href="#">package</a></li>
                                                        <li><a href="#">styling</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Add Products</a></li>
                                                <li><a href="#">Add Voucher</a></li>
                                                <li><a href="#">Add Subscription</a></li>
                                                <li><a href="#">Add Membership</a></li>
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
                                                    <a href="javascript:void(0)" className="close"><i className="fal fa-times"></i></a>
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
                                                                    <input type="text" defaultvalue="1" className="form-control"/>
                                                                </div>
                                                                <div className="price">
                                                                    <label htmlFor="">Price</label>
                                                                    <input type="text" defaultvalue="$120" className="form-control"/>
                                                                </div>
                                                                <div className="discount">
                                                                    <label htmlFor="">Discount</label>
                                                                    <div className="input-group">
                                                                        <input type="text" defaultvalue="0" className="form-control"/>
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
                                                <input type="text" placeholder="Add a note..." className="form-control lg"/>
                                            </form>                                            
                                        </div>
                                        <div className="full-screen-drawer-footer">
                                            <div className="px-4 d-flex py-3 total">
                                                <span className="h2 pe-2 mb-0">Total</span>
                                                <span className="h2 text-end ms-auto mb-0">$120</span>
                                            </div>
                                            <div className="p-4">
                                                <div className="row">
                                                    <div className="col"><a href="javascript:void(0)" id="payment-link" className="btn-dark btn-lg w-100">Credit Card</a></div>
                                                    <div className="col"><a href="#" className="btn-dark btn-lg w-100">Cash</a></div>
                                                    <div className="col-lg mt-lg-0 mt-2"><a href="#" className="btn-dark btn-lg w-100">Voucher Code</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-screen-drawer" id="payment-drawer">
                        <div className="drawer-wrp position-relative">
                            <div className="drawer-header px-4 py-3">
                                <h1 className="pe-md-5 pe-3 mb-0">Payment</h1>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
                            </div>
                            <div className="drawer-body">
                                <div className="row mx-0">
                                    <div className="col-md-6 p-0 left-col">
                                        <div className="bg-white py-3 px-4"> 
                                            <div className="search">
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="far fa-search"></i></span>
                                                    <input type="text" className="form-control search-input" placeholder="Search services and products..."/>
                                                    <a href="javascript:void(0)" className="close" style={{ display: 'none' }}><i className="fal fa-times"></i></a>
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
                                                <li><a href="javascript:void(0)">Add Services</a>
                                                    
                                                    <ul className="level-1">
                                                        <li><a href="javascript:void(0)">Beauty</a>
                                                            <ul className="level-2">
                                                                <li><a href="#">Eyebrow tint <span>$20</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Refill<span>$40</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 60 Minute Refill<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - Classic Set<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Removal<span>$70</span></a></li>
                                                                <li><a href="javascript:void()" id="new-sale-link">Eyelash Tint<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow, Lip & Chin<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow & Lip<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Full Face<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Lip or Chin<span>$20</span></a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#">colouring with one color</a></li>
                                                        <li><a href="#">cutting</a></li>
                                                        <li><a href="#">highlights</a></li>
                                                        <li><a href="#">multi-tonal colour</a></li>
                                                        <li><a href="#">package</a></li>
                                                        <li><a href="#">styling</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Add Products</a></li>
                                                <li><a href="#">Add Voucher</a></li>
                                                <li><a href="#">Add Subscription</a></li>
                                                <li><a href="#">Add Membership</a></li>
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
                                                    <a href="javascript:void(0)" className="close"><i className="fal fa-times"></i></a>
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
                                                                    <input type="text" defaultvalue="1" className="form-control"/>
                                                                </div>
                                                                <div className="price">
                                                                    <label htmlFor="">Price</label>
                                                                    <input type="text" defaultvalue="$120" className="form-control"/>
                                                                </div>
                                                                <div className="discount">
                                                                    <label htmlFor="">Discount</label>
                                                                    <div className="input-group">
                                                                        <input type="text" defaultvalue="0" className="form-control"/>
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
                                                <input type="text" placeholder="Add a note..." className="form-control lg"/>
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
                                                <a href="javascript:void(0)" id="salecomplete-invoice-link" className="w-100 btn btn-lg">Click To Complete Sale</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-screen-drawer" id="salecomplete-invoice-drawer">
                        <div className="drawer-wrp position-relative">
                            <div className="drawer-header px-4 py-3">
                                <h1 className="pe-md-5 pe-3 mb-0">Sale Completed</h1>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
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
                                                <a href="#" className="btn-dark me-md-4 ">print invoice</a>
                                                <form action="" className="w-100 mt-lg-0 mt-2">
                                                    <div className="d-flex align-items-end">
                                                        <div className="w-100">
                                                            <label htmlFor="">Email Invoice</label>
                                                            <input type="email" placeholder="josmith@gmail.com" className="form-control"/>
                                                        </div>
                                                        <input type="submit" className="btn-dark ms-3"/>
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
                                                    <img src="assets/images/celebrate.png" alt="" className="mb-md-4 mb-3"/>
                                                    <h3 className="mb-2 fw-semibold">Congratulations! <br/>Sale Completed </h3>
                                                    <h6>28th August 2021 <br/>Payment by credit card </h6>
                                               </div>
                                            </div>
                                        </div>
                                        <div className="full-screen-drawer-footer p-4">
                                            <a href="#" className="btn btn-lg w-100">make next appointment</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-screen-drawer" id="newsale-drawer">
                        <div className="drawer-wrp position-relative">
                            <div className="drawer-header px-4 py-3">
                                <h1 className="pe-md-5 pe-3 mb-0">New Sale</h1>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
                            </div>
                            <div className="drawer-body">
                                <div className="row mx-0">
                                    <div className="col-md-6 p-0 left-col">
                                        <div className="bg-white py-3 px-4"> 
                                            <div className="search">
                                                <div className="input-group">
                                                    <span className="input-group-text"><i className="far fa-search"></i></span>
                                                    <input type="text" className="form-control search-input" placeholder="Search services and products..."/>
                                                    <a href="javascript:void(0)" className="close" style={{ display: 'none' }}><i className="fal fa-times"></i></a>
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
                                                <li><a href="javascript:void(0)">Add Services</a>
                                                    
                                                    <ul className="level-1">
                                                        <li><a href="javascript:void(0)">Beauty</a>
                                                            <ul className="level-2">
                                                                <li><a href="#">Eyebrow tint <span>$20</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Refill<span>$40</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 60 Minute Refill<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - Classic Set<span>$60</span></a></li>
                                                                <li><a href="#">Eyelash Extensions - 30 Minute Removal<span>$70</span></a></li>
                                                                <li><a href="javascript:void()" id="new-sale-link">Eyelash Tint<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow, Lip & Chin<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Eyebrow & Lip<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Full Face<span>$20</span></a></li>
                                                                <li><a href="#">Wax - Lip or Chin<span>$20</span></a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#">colouring with one color</a></li>
                                                        <li><a href="#">cutting</a></li>
                                                        <li><a href="#">highlights</a></li>
                                                        <li><a href="#">multi-tonal colour</a></li>
                                                        <li><a href="#">package</a></li>
                                                        <li><a href="#">styling</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Add Products</a></li>
                                                <li><a href="#">Add Voucher</a></li>
                                                <li><a href="#">Add Subscription</a></li>
                                                <li><a href="#">Add Membership</a></li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-6 px-0 right-col">
                                        <div className="p-4 search-panel">                                            
                                            <div className="search large-input">
                                                <div className="text-end">
                                                    <a href="javascript:void(0);" id="addclient-link" className="h6 color-wine text-decoration-none mb-3"><i className="fal fa-plus pe-1 small"></i>New Client</a>
                                                </div>
                                                <div className="input-group mb-md-3 mb-1">
                                                    <span className="input-group-text"><i className="far fa-search"></i></span>
                                                    <input type="text" className="form-control search-input" placeholder="Start typing client’s name"/>
                                                    <a href="javascript:void(0)" className="close"><i className="fal fa-times"></i></a>
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
                                            
                                            <div className="complete-box text-center flex-column justify-content-center mt-md-5 mt-4">
                                                <div className="complete-box-wrp text-center">
                                                     <img src="assets/images/user-girls.png" alt="" className="mb-md-4 mb-3"/>
                                                     <h4 className="mb-2 fw-semibold">No client has been added to the order yet. Please add one.</h4>
                                                </div>
                                             </div>
                                        </div>
                                        <div className="add-item-panel p-4" style={{ display: 'none' }}>
                                            <div className="flex-column justify-content-between d-flex flex-wrap">
                                                <div className="user-box">
                                                    <div className="d-flex align-items-center">
                                                        <div className="user-initial me-3">js</div>
                                                        <div className="user-id">
                                                            <h3 className="mb-0">Jo Smith <a href="javascript:void(0)" className="close ms-2"><i className="fal fa-times"></i></a></h3>
                                                            <span>jo.smith@hotmail.com</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="product-box">
                                                        <div className="product-header" data-bs-toggle="collapse" href="#checkout-probox">
                                                            <a href="javascript:void(0);" className="close"><i className="fal fa-times"></i></a>
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
                                                                            <input type="text" defaultvalue="1" className="form-control"/>
                                                                        </div>
                                                                        <div className="price">
                                                                            <label htmlFor="">Price</label>
                                                                            <input type="text" defaultvalue="$120" className="form-control"/>
                                                                        </div>
                                                                        <div className="discount">
                                                                            <label htmlFor="">Discount</label>
                                                                            <div className="input-group">
                                                                                <input type="text" defaultvalue="0" className="form-control"/>
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
                                                        <input type="text" placeholder="Add a note..." className="form-control lg"/>
                                                    </form>                                            
                                                </div>
                                                <div className="full-screen-drawer-footer">
                                                    <div className="px-4 d-flex py-3 total">
                                                        <span className="h2 pe-2 mb-0">Total</span>
                                                        <span className="h2 text-end ms-auto mb-0">$120</span>
                                                    </div>
                                                    <div className="py-4">
                                                        <div className="row">
                                                            <div className="col"><a href="javascript:void(0)" id="payment-link" className="btn-dark btn-lg w-100">Credit Card</a></div>
                                                            <div className="col"><a href="#" className="btn-dark btn-lg w-100">Cash</a></div>
                                                            <div className="col-lg mt-lg-0 mt-2"><a href="#" className="btn-dark btn-lg w-100">Voucher Code</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="drawer" id="addclient-drawer">
                        <div className="drawer-wrp position-relative include-footer">
                            <div className="drawer-header">
                                <h2 className="mb-4 pe-md-5 pe-3">New Client</h2>
                                <a href="javascript:void(0)" className="close-drawer"><img src="assets/images/close-icon.svg" alt=""/></a>
                            </div>
                            <div className="drawer-body pb-md-5 pb-3">
                                <form action="">
                                    <div className="row gx-2">
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">First Name</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Last Name</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row gx-2">
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Mobile</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Email Address</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row gx-2">
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Date of Birth</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Gender</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 search">
                                        <label htmlFor="">Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="far fa-search"></i></span>
                                            <input type="text" className="form-control search-input" placeholder="Start typing address"/>
                                            <a href="javascript:void(0)" className="close" style={{ display: 'none' }}><i className="fal fa-times"></i></a>
                                        </div>
                                        <div className="search-result dropdown-box">
                                            <ul className="p-0 m-0 list-unstyled">
                                                <li>
                                                <a href="#" className="d-flex">
                                                    <div className="user-img me-2"><img src="assets/images/Avatar.png" alt=""/></div>
                                                    <div className="user-id">
                                                        <span className="user-name">Jo Smith</span>
                                                        <span className="user-id">jo.smith@gmail.com</span>
                                                    </div>
                                                </a>
                                                </li>
                                                <li>
                                                <a href="#" className="d-flex">
                                                    test
                                                </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Street</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="row gx-2">
                                        <div className="col-sm-6 mb-3">
                                            <label htmlFor="">Suburb</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="col-sm-3 col-6 mb-3">
                                            <label htmlFor="">State</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultvalue=""></option>
                                                <option defaultvalue="">Yes</option>
                                                <option defaultvalue="">No</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-3 col-6 mb-3">
                                            <label htmlFor="">Postcode</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Client Notes</label>
                                        <textarea id="my-textarea" className="form-control" name="" rows="5" placeholder="For example, allergic to latex"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Notifcations</label>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            <span>Send SMS notifications to client</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                            <span>Send email notifications to client</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                            <span>Client agrees to receive marketing emails</span>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            <div className="drawer-footer">
                                <input type="submit" className="btn w-100 btn-lg" defaultvalue="Save Client"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    </>
  );
};

export default Sales;
