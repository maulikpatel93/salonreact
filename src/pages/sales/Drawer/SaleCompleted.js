import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { CloseSaleCompleted } from "store/slices/saleSlice";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";
import moment from "moment";
import SaleEmailInvoice from "../Form/SaleEmailInvoice";

const SaleCompleted = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedSaleCompleted);
  const isSaleCompletedData = useSelector((state) => state.sale.isSaleCompletedData);
  const client = isSaleCompletedData && isSaleCompletedData.client;
  const client_name = client && ucfirst(client.first_name) + " " + ucfirst(client.last_name);
  const CartObject = isSaleCompletedData && isSaleCompletedData.cart;
  const invoicedate = isSaleCompletedData.invoicedate;
  const appointment = isSaleCompletedData.appointment;
  const paidby = isSaleCompletedData.paidby;
  const status = isSaleCompletedData.status;
  let totalprice = 0;
  // console.log(isSaleCompletedData);
  return (
    <>
      <div className={(rightDrawerOpened ? "full-screen-drawer salecompleted-drawer " : "") + rightDrawerOpened} id="salecomplete-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-4 py-3">
            <h1 className="pe-md-5 pe-3 mb-0">{t("Sale Completed")}</h1>
            <a className="close-drawer cursor-pointer" onClick={() => dispatch(CloseSaleCompleted())}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <div className="row mx-0">
              <div className="col-md-6 p-4 d-flex flex-column">
                <ul className="sale-comlete-data list-unstyled list-group list-group-flush">
                  <li className="list-group-item">
                    <h5 className="mb-1 fw-semibold">{t("Tax Invoice")} #0001</h5>
                    <p className="mb-0">
                      <Moment format="Do MMMM YYYY">{invoicedate}</Moment>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <label>{t("Invoice to")}:</label>
                    <h6 className="mb-0">{client_name}</h6>
                  </li>
                  {CartObject &&
                    CartObject.length > 0 &&
                    Object.keys(CartObject).map((item) => {
                      let type = CartObject[item].type;
                      if (type === "Appointment") {
                        let service_name = CartObject[item].services && CartObject[item].services.name;
                        let staff = CartObject[item].staff;
                        let cost = CartObject[item].cost;
                        totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{service_name}</label>
                                <h6 className="mb-1">{t("With {{ staff_name }} from {{ eventdate }} at {{ start_time }} - {{ end_time }}", { staff_name: ucfirst(staff.first_name + " " + staff.last_name), eventdate: appointment.showdate, start_time: moment(appointment.dateof + "T" + appointment.start_time).format("hh:mm A"), end_time: moment(appointment.dateof + "T" + appointment.end_time).format("hh:mm A") })}</h6>
                              </div>
                              <label className="col-2 text-end">${cost}</label>
                            </div>
                          </li>
                        );
                      }
                      if (type === "Service") {
                        let service_name = CartObject[item].services && CartObject[item].services.name;
                        let staff = CartObject[item].staff;
                        let cost = CartObject[item].cost;
                        totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{service_name}</label>
                                <h6 className="mb-1">{t("With {{ staff_name }}", { staff_name: staff && ucfirst(staff.first_name) + " " + ucfirst(staff.last_name) })}</h6>
                              </div>
                              <label className="col-2 text-end">${cost}</label>
                            </div>
                          </li>
                        );
                      }
                      if (type === "Product") {
                        let product_name = CartObject[item].products && CartObject[item].products.name;
                        let qty = CartObject[item].qty;
                        let cost = CartObject[item].cost;
                        let product_price = parseFloat(cost) * parseInt(qty);
                        totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{product_name}</label>
                                <span>
                                  {t("Quantity")}: {qty}
                                </span>
                              </div>
                              <label className="col-2 text-end">${product_price}</label>
                            </div>
                          </li>
                        );
                      }
                      if (type === "Voucher") {
                        let voucher_name = CartObject[item].vouchers && CartObject[item].vouchers.name;
                        let cost = CartObject[item].cost;
                        let voucher_to = CartObject[item].voucherto && CartObject[item].voucherto.length > 0 && CartObject[item].voucherto[0];
                        let voucher_to_name = voucher_to && ucfirst(voucher_to.first_name) + " " + ucfirst(voucher_to.last_name);
                        totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{voucher_name}</label>
                                <span>{`${t("To (Recipient)")} : ${voucher_to_name}`}</span>
                              </div>
                              <label className="col-2 text-end">${cost}</label>
                            </div>
                          </li>
                        );
                      }
                      if (type === "OnOffVoucher") {
                        let cost = CartObject[item].cost;
                        let voucher_to = CartObject[item].voucherto && CartObject[item].voucherto.length > 0 && CartObject[item].voucherto[0];
                        let voucher_to_name = voucher_to && ucfirst(voucher_to.first_name) + " " + ucfirst(voucher_to.last_name);
                        totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{t("On Off Voucher")}</label>
                                <span>{`${t("To (Recipient)")} : ${voucher_to_name}`}</span>
                              </div>
                              <label className="col-2 text-end">${cost}</label>
                            </div>
                          </li>
                        );
                      }
                      if (type === "Membership") {
                        let membership_name = CartObject[item].membership && CartObject[item].membership.name;
                        let cost = CartObject[item].cost;
                        totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                        return (
                          <li className="list-group-item" key={item}>
                            <div className="row gx-1 justify-content-between">
                              <div className="col-10">
                                <label htmlFor="">{membership_name}</label>
                              </div>
                              <label className="col-2 text-end">${cost}</label>
                            </div>
                          </li>
                        );
                      }
                    })}

                  {/* <li>
                    <div className="row gx-1 justify-content-between">
                      <div className="col-10">
                        <h6 className="mb-0">Includes GST of</h6>
                      </div>
                      <h6 className="mb-0 col-2 text-end">$10.91</h6>
                    </div>
                  </li> */}
                  <li className="list-group-item total">
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 col-10">{t("Total AUD")}</label>
                      <label className="mb-0 col-2 text-end">${totalprice}</label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 fw-normal col-10">Payment by Credit Card</label>
                      <label className="mb-0 fw-normal col-2 text-end">$120</label>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row gx-1 justify-content-between">
                      <label className="mb-0 fw-normal col-10">Balance</label>
                      <label className="mb-0 fw-normal col-2 text-end">$0</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 px-0 right-col flex-column justify-content-between d-flex flex-wrap">
                <div className="p-4">
                  <div className="user-box">
                    <a className="d-flex align-items-center">
                      {client && client.profile_photo_url ? (
                        <div className="user-img me-3">
                          <img src={client && client.profile_photo_url} alt="" className="rounded-circle wh-60" />
                        </div>
                      ) : (
                        <div className="user-initial me-3">{client && client.first_name.charAt(0) + "" + client.last_name.charAt(0)}</div>
                      )}
                      <div className="user-id">
                        <h3 className="mb-0">{client_name}</h3>
                        <span>{client && client.email}</span>
                      </div>
                    </a>
                  </div>
                  <div className="complete-box text-center d-flex flex-column justify-content-center mt-md-5 mt-4">
                    <div className="complete-box-wrp text-center">
                      <img src={config.imagepath + "celebrate.png"} alt="" className="mb-md-4 mb-3" />
                      <h3 className="mb-2 fw-semibold">
                        {t("Congratulations!")} <br />
                        {t("Sale Completed")}
                      </h3>
                      <h6>
                        <Moment format="Do MMMM YYYY">{invoicedate}</Moment> <br />
                        {t("Payment by {{ paidby }}", { paidby: paidby })}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="full-screen-drawer-footer p-5">
                  <SaleEmailInvoice isSaleCompletedData={isSaleCompletedData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// SaleCompleted.propTypes = {
//     view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
// };

export default SaleCompleted;
