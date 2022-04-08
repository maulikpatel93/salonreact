import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ucfirst } from "helpers/functions";
import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import useScriptRef from "../../../hooks/useScriptRef";
import { TextareaField } from "component/form/Field";
import moment from "moment";

import { saleStoreApi, closeAddSaleForm, CloseCheckoutForm, SaleServiceRemoveToCart, SaleProductRemoveToCart, SaleVoucherRemoveToCart, SaleMembershipRemoveToCart, SaleOnOffVoucherRemoveToCart, SaleCheckoutData } from "../../../store/slices/saleSlice";

import { closeAppointmentDetailModal, appointmentListViewApi } from "../../../store/slices/appointmentSlice";
import { busytimeListViewApi } from "../../../store/slices/busytimeSlice";

const SaleCheckoutForm = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedCheckoutForm);
  const isCheckoutData = useSelector((state) => state.sale.isCheckoutData);
  const clientdata = isCheckoutData.client ? isCheckoutData.client : "";
  const appointmentDetail = isCheckoutData.appointmentDetail ? isCheckoutData.appointmentDetail : "";
  const client = appointmentDetail && appointmentDetail.client ? appointmentDetail.client : clientdata;
  const isCart = useSelector((state) => state.sale.isCart);
  const isRangeInfo = props.isRangeInfo;
  const initialValues = {
    client_id: "",
    notes: "",
    cart: { services: [], products: [], vouchers: [], onoffvouchers: [], membership: [] },
    appointment_id: "",
    eventdate: "",
  };
  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    notes: Yup.string().trim().label(t("Notes")),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(saleStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddSaleForm());
          dispatch(closeAppointmentDetailModal());
          sweatalert({ title: t("Sale Completed"), text: t("Sale Completed Successfully"), icon: "success" });
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(busytimeListViewApi(isRangeInfo));
          }
          if (scriptedRef.current) {
            setLoading(false);
          }
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
          setSubmitting(false);
          if (scriptedRef.current) {
            setLoading(false);
          }
        }
      });
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };
  const handleCloseCheckoutForm = () => {
    dispatch(CloseCheckoutForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("client_id", client ? client.id : "");
            formik.setFieldValue("appointment_id", appointmentDetail ? appointmentDetail.id : "");
            formik.setFieldValue("eventdate", appointmentDetail ? appointmentDetail.showdate : "");
            if (isCart && isCart.services.length > 0) {
              Object.keys(isCart.services).map((item) => {
                let service_id = isCart.services[item].id;
                //let staff = isCart.services[item].staff;
                let gprice = isCart.services[item].gprice ? isCart.services[item].gprice : "";
                let formik_cart_service_gprice = formik.values.cart && formik.values.cart.services.length > 0 && formik.values.cart.services[item] && formik.values.cart.services[item].gprice > 0 ? formik.values.cart.services[item].gprice : gprice;
                let formik_cart_service_staff_id = formik.values.cart && formik.values.cart.services.length > 0 && formik.values.cart.services[item] && formik.values.cart.services[item].staff_id ? formik.values.cart.services[item].staff_id : "";
                formik.setFieldValue("cart[services][" + item + "][id]", service_id);
                formik.setFieldValue("cart[services][" + item + "][staff_id]", formik_cart_service_staff_id);
                formik.setFieldValue("cart[services][" + item + "][gprice]", String(formik_cart_service_gprice));
              });
            }
            if (isCart && isCart.products.length > 0) {
              Object.keys(isCart.products).map((item) => {
                let product_id = isCart.products[item].id;
                let product_cost_price = isCart.products[item].cost_price;
                let qty = isCart.products[item].qty;
                let product_price = qty > 0 ? parseInt(qty) * parseFloat(product_cost_price) : product_cost_price;
                totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
                formik.setFieldValue("cart[products][" + item + "][id]", product_id);
                formik.setFieldValue("cart[products][" + item + "][qty]", String(qty));
                formik.setFieldValue("cart[products][" + item + "][price]", product_cost_price);
              });
            }
            if (isCart && isCart.vouchers.length > 0) {
              Object.keys(isCart.vouchers).map((item) => {
                let voucher_id = isCart.vouchers[item].id;
                let amount = isCart.vouchers[item].amount;
                let code = isCart.vouchers[item].code;
                let voucher_to = isCart.vouchers[item].voucher_to;
                formik.setFieldValue("cart[vouchers][" + item + "][id]", voucher_id);
                formik.setFieldValue("cart[vouchers][" + item + "][code]", String(code));
                formik.setFieldValue("cart[vouchers][" + item + "][amount]", String(amount));
                formik.setFieldValue("cart[vouchers][" + item + "][voucher_to]", voucher_to);
              });
            }

            if (isCart && isCart.onoffvouchers.length > 0) {
              Object.keys(isCart.onoffvouchers).map((item) => {
                let id = isCart.onoffvouchers[item].id;
                let first_name = isCart.onoffvouchers[item].first_name;
                let last_name = isCart.onoffvouchers[item].last_name;
                let is_send = isCart.onoffvouchers[item].is_send;
                let email = isCart.onoffvouchers[item].email;
                let amount = isCart.onoffvouchers[item].amount;
                let message = isCart.onoffvouchers[item].message;
                formik.setFieldValue("cart[onoffvouchers][" + item + "][id]", id ? id : "");
                formik.setFieldValue("cart[onoffvouchers][" + item + "][first_name]", first_name);
                formik.setFieldValue("cart[onoffvouchers][" + item + "][last_name]", last_name);
                formik.setFieldValue("cart[onoffvouchers][" + item + "][is_send]", is_send);
                formik.setFieldValue("cart[onoffvouchers][" + item + "][email]", email);
                formik.setFieldValue("cart[onoffvouchers][" + item + "][amount]", String(amount));
                formik.setFieldValue("cart[onoffvouchers][" + item + "][message]", message);
              });
            }

            if (isCart && isCart.membership.length > 0) {
              Object.keys(isCart.membership).map((item) => {
                let id = isCart.membership[item].id;
                let cost = isCart.membership[item].cost;
                formik.setFieldValue("cart[membership][" + item + "][id]", id);
                formik.setFieldValue("cart[membership][" + item + "][cost]", cost);
              });
            }
          }, [client, isCart, appointmentDetail]);
          let totalprice = 0;
          if (appointmentDetail && appointmentDetail.cost) {
            totalprice += isNaN(parseFloat(appointmentDetail.cost)) === false && parseFloat(appointmentDetail.cost);
          }
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 salecheckout-drawer " : "") + rightDrawerOpened} id="salecheckout-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-4 py-3">
                    <h1 className="pe-md-5 pe-3 mb-0">{t("New Sale - Payment")}</h1>
                    <a className="close-drawer cursor-pointer" onClick={handleCloseCheckoutForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body p-3 newsale-probox">
                    <a className="cursor-pointer text-primary h5 ms-4" onClick={handleCloseCheckoutForm}>
                      {t("Edit")}
                    </a>
                    <div className="row">
                      <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 m-auto">
                        <div className="flex-column justify-content-between d-flex flex-wrap pb-4">
                          <div className="user-box">
                            <div className="d-flex align-items-center">
                              {client && client.profile_photo_url ? (
                                <div className="user-img me-3">
                                  <img src={client && client.profile_photo_url} alt="" className="rounded-circle wh-60" />
                                </div>
                              ) : (
                                <div className="user-initial me-3">{client && client.first_name.charAt(0) + "" + client.last_name.charAt(0)}</div>
                              )}
                              <div className="user-id">
                                <h3 className="mb-0">{client && client.first_name + "" + client.last_name}</h3>
                                <span>{client && client.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {appointmentDetail && (
                          <div className="product-box mt-0 mb-3">
                            <div className="product-header" id="#checkout-probox">
                              <div className="row">
                                <div className="col-9">
                                  <h4 className="mb-0 fw-semibold">{appointmentDetail.service.name}</h4>
                                  <p className="mb-0">{t("With {{ staff_name }} from {{ eventdate }} at {{ start_time }} - {{ end_time }}", { staff_name: ucfirst(appointmentDetail.staff.first_name + " " + appointmentDetail.staff.last_name), eventdate: appointmentDetail.showdate, start_time: moment(appointmentDetail.dateof + "T" + appointmentDetail.start_time).format("hh:mm A"), end_time: moment(appointmentDetail.dateof + "T" + appointmentDetail.end_time).format("hh:mm A") })} </p>
                                </div>
                                <h4 className="col-3 mb-0 text-end">${appointmentDetail.cost}</h4>
                              </div>
                            </div>
                          </div>
                        )}
                        {isCart &&
                          isCart.services.length > 0 &&
                          Object.keys(isCart.services).map((item) => {
                            let service_id = isCart.services[item].id;
                            let service_name = isCart.services[item].name;
                            let staff = isCart.services[item].staff;
                            let gprice = isCart.services[item].gprice;
                            totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);

                            return (
                              <div className="product-box mt-0 mb-3" key={item}>
                                <div className="product-header" id="#checkout-probox">
                                  <a
                                    className="close close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleServiceRemoveToCart({ id: service_id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, services: formik.values.cart.services && formik.values.cart.services.length > 0 ? formik.values.cart.services.filter((item) => item.id != service_id) : [] } });
                                    }}
                                  >
                                    <i className="fal fa-times"></i>
                                  </a>
                                  <div className="row">
                                    <div className="col-9">
                                      <h4 className="mb-0 fw-semibold">{service_name}</h4>
                                      <p className="mb-0">{t("With {{ staff_name }}", { staff_name: staff && ucfirst(staff.name) })} </p>
                                    </div>
                                    <h4 className="col-3 mb-0 text-end">${gprice}</h4>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {isCart &&
                          isCart.products.length > 0 &&
                          Object.keys(isCart.products).map((item) => {
                            let product_id = isCart.products[item].id;
                            let product_name = isCart.products[item].name;
                            let cost_price = isCart.products[item].cost_price;
                            let qty = isCart.products[item].qty;
                            let image_url = isCart.products[item].image_url;
                            let product_price = parseInt(qty) && parseInt(qty) > 0 ? parseInt(qty) * parseFloat(cost_price) : parseFloat(cost_price);
                            totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
                            return (
                              <div className="product-box mt-0 mb-3 ps-2" key={item}>
                                <div className="product-header" id="#checkout-probox">
                                  <a
                                    className="close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleProductRemoveToCart({ id: product_id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, products: formik.values.cart.products && formik.values.cart.products.length > 0 ? formik.values.cart.products.filter((item) => item.id != product_id) : [] } });
                                    }}
                                  >
                                    <i className="fal fa-times"></i>
                                  </a>
                                  <div className="d-flex">
                                    <div className="pro-img">
                                      {image_url ? (
                                        <div className="user">
                                          <a data-fancybox="" data-src={image_url}>
                                            <img src={image_url} alt="" className="rounded-circle wh-40" />
                                          </a>
                                        </div>
                                      ) : (
                                        <div className="user-initial wh-40 p-1">{product_name.charAt(0)}</div>
                                      )}
                                    </div>
                                    <div className="pro-content">
                                      <div className="row">
                                        <div className="col-9">
                                          <h4 className="mb-2 fw-semibold">{ucfirst(product_name)}</h4>
                                          <p className="qty align-items-center mb-0">
                                            <span className="">{`${qty} * $${cost_price}`} </span>
                                          </p>
                                        </div>
                                        <h4 className="col-3 mb-0 text-end">${product_price}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {isCart &&
                          isCart.vouchers.length > 0 &&
                          Object.keys(isCart.vouchers).map((item) => {
                            let voucher_id = isCart.vouchers[item].id;
                            let voucher_name = isCart.vouchers[item].name;
                            let voucher_price = isCart.vouchers[item].amount;
                            let voucher_to = isCart.vouchers[item].voucher_to;

                            totalprice += isNaN(parseFloat(voucher_price)) === false && parseFloat(voucher_price);
                            let image_url = config.imagepath + "voucher.png";
                            return (
                              <div className="product-box mt-0 mb-3 ps-2" key={item}>
                                <div className="product-header" id="#checkout-probox">
                                  <a
                                    className="close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleVoucherRemoveToCart({ id: voucher_id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, vouchers: formik.values.cart.vouchers && formik.values.cart.vouchers.length > 0 ? formik.values.cart.vouchers.filter((item) => item.id != voucher_id) : [] } });
                                    }}
                                  >
                                    <i className="fal fa-times"></i>
                                  </a>
                                  <div className="d-flex">
                                    <div className="pro-img">
                                      <div className="user">
                                        <a data-fancybox="" data-src={image_url}>
                                          <img src={image_url} alt="" className="rounded-circle wh-40" />
                                        </a>
                                      </div>
                                    </div>
                                    <div
                                      className="pro-content cursor-pointer"
                                      onClick={() => {
                                        const voucherdata = isCart.vouchers[item];
                                        dispatch(OpenVoucherToForm());
                                        dispatch(VoucherToFormData({ type: "Voucher", voucher: voucherdata }));
                                      }}
                                    >
                                      <div className="row">
                                        <div className="col-9">
                                          <h4 className="mb-2 fw-semibold">{ucfirst(voucher_name)}</h4>
                                          <p className="mb-0">{`${t("To (Recipient)")} : ${voucher_to.first_name} ${voucher_to.last_name}`}</p>
                                        </div>
                                        <h4 className="col-3 mb-0 text-end">${voucher_price}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {isCart &&
                          isCart.onoffvouchers.length > 0 &&
                          Object.keys(isCart.onoffvouchers).map((item) => {
                            let id = isCart.onoffvouchers[item].id;
                            let first_name = isCart.onoffvouchers[item].first_name;
                            let last_name = isCart.onoffvouchers[item].last_name;
                            let email = isCart.onoffvouchers[item].email;
                            let amount = isCart.onoffvouchers[item].amount;
                            totalprice += isNaN(parseFloat(amount)) === false && parseFloat(amount);
                            let image_url = config.imagepath + "voucher.png";
                            return (
                              <div className="product-box mt-0 mb-3 ps-2" key={item}>
                                <div className="product-header" id="#checkout-probox">
                                  <a
                                    className="close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleOnOffVoucherRemoveToCart({ id: id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, onoffvouchers: formik.values.cart.onoffvouchers && formik.values.cart.onoffvouchers.length > 0 ? formik.values.cart.onoffvouchers.filter((ov) => ov.id != id) : [] } });
                                      // formik.setValues({ ...formik.values, cart: { ...formik.values.cart, onoffvouchers: formik.values.cart.onoffvouchers && formik.values.cart.onoffvouchers.length > 0 ? formik.values.cart.onoffvouchers.slice(0, item).concat(formik.values.cart.onoffvouchers.slice(item + 1, formik.values.cart.onoffvouchers.length)) : [] } });
                                    }}
                                  >
                                    <i className="fal fa-times"></i>
                                  </a>
                                  <div className="d-flex">
                                    <div className="pro-img">
                                      <div className="user">
                                        <a data-fancybox="" data-src={image_url}>
                                          <img src={image_url} alt="" className="rounded-circle wh-40" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="pro-content cursor-pointer">
                                      <div className="row">
                                        <div className="col-9">
                                          <h4 className="mb-2 fw-semibold">{ucfirst(first_name) + " " + ucfirst(last_name)}</h4>
                                          {email && <p className="mb-0">{`${t("To (Recipient)")} : ${email}`}</p>}
                                        </div>
                                        <h4 className="col-3 mb-0 text-end">${amount}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {isCart &&
                          isCart.membership.length > 0 &&
                          Object.keys(isCart.membership).map((item) => {
                            let membership_id = isCart.membership[item].id;
                            let membership_name = isCart.membership[item].name;
                            let membership_price = isCart.membership[item].cost;

                            totalprice += isNaN(parseFloat(membership_price)) === false && parseFloat(membership_price);
                            let image_url = config.imagepath + "membership-lg.png";
                            return (
                              <div className="membership-box mt-0 mb-3 ps-2" key={item}>
                                <div className="membership-header" id="#checkout-probox">
                                  <a
                                    className="close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleMembershipRemoveToCart({ id: membership_id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, membership: formik.values.cart.membership && formik.values.cart.membership.length > 0 ? formik.values.cart.membership.filter((item) => item.id != membership_id) : [] } });
                                    }}
                                  >
                                    <i className="fal fa-times"></i>
                                  </a>
                                  <div className="d-flex">
                                    <div className="pro-img align-self-center">
                                      <div className="user">
                                        <a data-fancybox="" data-src={image_url}>
                                          <img src={image_url} alt="" className="object-fit-none h-20 w-auto px-2" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="pro-content align-self-center">
                                      <div className="row">
                                        <div className="col-9">
                                          <h4 className="mb-0 fw-semibold">{ucfirst(membership_name)}</h4>
                                        </div>
                                        <h4 className="col-3 mb-0 text-end">${membership_price}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        <div className="">
                          <TextareaField type="text" name="notes" rows={1} placeholder={t("Add a note...")} value={formik.values.notes} label={""} className="form-control lg" controlId="salonForm-notes" />
                        </div>
                        <div className="px-4 d-flex py-3 total">
                          <span className="h2 pe-2 mb-0">{t("Total")}</span>
                          <span className="h2 text-end ms-auto mb-0">${totalprice}</span>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <button type="submit" id="payment-link" className="btn btn-pay btn-lg w-100 p-3" disabled={loading}>
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Paid by Credit Card")}
                            </button>
                          </div>
                          <div className="col-4">
                            <button type="submit" className="btn btn-pay btn-lg w-100 p-3" disabled={loading}>
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Paid by Cash")}
                            </button>
                          </div>
                          <div className="col-4">
                            <button type="submit" className="btn btn-pay-voucher btn-lg w-100 pay-voucher p-3" disabled={loading}>
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Pay by Voucher")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
SaleCheckoutForm.propTypes = {
  appointmentDetail: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default SaleCheckoutForm;
