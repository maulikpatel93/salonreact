import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ucfirst } from "helpers/functions";
import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik, Field, useFormikContext } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import useScriptRef from "../../../hooks/useScriptRef";
import { InputField, TextareaField } from "component/form/Field";
import moment from "moment";
import { saleStoreApi, closeAddSaleForm, CloseCheckoutForm, SaleServiceRemoveToCart, SaleProductRemoveToCart, SaleVoucherRemoveToCart, SaleMembershipRemoveToCart, SaleOnOffVoucherRemoveToCart, SaleCheckoutData, OpenSaleCompleted, SaleCompletedData, OpenCardPaymentForm, CloseCardPaymentForm, CardPaymentData, OpenVoucherApplyForm, SaleSubscriptionRemoveToCart } from "../../../store/slices/saleSlice";

import { closeAppointmentDetailModal, appointmentListViewApi } from "../../../store/slices/appointmentSlice";
import { busytimeListViewApi } from "../../../store/slices/busytimeSlice";
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from "component/card/CardUtils";
import CardPaymentForm from "./CardPaymentForm";
import { StripePaymentStatus } from "store/slices/stripeSlice";
import VoucherApplyForm from "./VoucherApplyForm";

const SaleCheckoutForm = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.sale.isOpenedCheckoutForm);
  const isCheckoutData = useSelector((state) => state.sale.isCheckoutData);
  const isOpenCardPaymentForm = useSelector((state) => state.sale.isOpenCardPaymentForm);
  const clientdata = isCheckoutData.client ? isCheckoutData.client : "";
  const appointmentDetail = isCheckoutData.appointmentDetail ? isCheckoutData.appointmentDetail : "";
  const client = appointmentDetail && appointmentDetail.client ? appointmentDetail.client : clientdata;
  const isCart = useSelector((state) => state.sale.isCart);
  const isStripePaymentStatus = useSelector((state) => state.stripe.isStripePaymentStatus);
  const isOpenedVoucherApplyForm = useSelector((state) => state.sale.isOpenedVoucherApplyForm);

  const isRangeInfo = props.isRangeInfo;

  const initialValues = {
    client_id: "",
    description: "",
    cart: { services: [], products: [], vouchers: [], onoffvouchers: [], membership: [] },
    appointment_id: "",
    cost: "",
    eventdate: "",
    is_stripe: 0,
    totalprice: "",
  };
  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    description: Yup.string().trim().label(t("Notes")),
    is_stripe: Yup.mixed(),
    // cardname: Yup.string().trim().label(t("Card Holder Name")),
    // cardnumber: Yup.string()
    //   .trim()
    //   .nullable()
    //   .when("is_stripe", {
    //     is: 1,
    //     // then: Yup.string().trim().matches(config.cardNumberPattern, t(config.cardNumberPattern_error)).label(t("Card Number")).required(),
    //     then: Yup.string().trim().label(t("Card Number")).required(),
    //   }),
    // cardexpiry: Yup.string()
    //   .trim()
    //   .nullable()
    //   .when("is_stripe", {
    //     is: 1,
    //     then: Yup.string().trim().label(t("Card Expiry")).required(),
    //   }),
    // cardcvc: Yup.string()
    //   .trim()
    //   .nullable()
    //   .when("is_stripe", {
    //     is: 1,
    //     then: Yup.string().trim().label(t("CVC")).required(),
    //   }),
  });
  yupconfig();
  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(saleStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          const stripeObj = action.payload;
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddSaleForm());
          dispatch(closeAppointmentDetailModal());
          dispatch(SaleCompletedData(action.payload));
          dispatch(OpenSaleCompleted());
          // sweatalert({ title: t("Sale Completed"), text: t("Sale Completed Successfully"), icon: "success" });
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
          if (status === 410) {
            const stripeObj = action.payload && action.payload.message;
            dispatch(StripePaymentStatus(stripeObj));
            dispatch(OpenCardPaymentForm());
            // if (payment_status === "requires_confirmation") {
            //   console.log(payment_status);
            // }
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
    dispatch(CloseCardPaymentForm());
  };

  // const MyInput = ({ field, form, ...props }) => {
  //   // console.log(form.setFieldValue);

  //   return form.setFieldValue("totalprice", props.value);
  // };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("client_id", client ? client.id : "");
          }, [client]);
          useEffect(() => {
            formik.setFieldValue("appointment_id", appointmentDetail ? appointmentDetail.id : "");
            formik.setFieldValue("eventdate", appointmentDetail ? appointmentDetail.showdate : "");
            formik.setFieldValue("cost", appointmentDetail ? isNaN(parseFloat(appointmentDetail.cost)) === false && parseFloat(appointmentDetail.cost) : "");
          }, [appointmentDetail]);
          useEffect(() => {
            if (isCart && isCart.services.length > 0) {
              Object.keys(isCart.services).map((item) => {
                let service_id = isCart.services[item].id;
                let staff = isCart.services[item].staff;
                let gprice = isCart.services[item].gprice ? isCart.services[item].gprice : "";
                // totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);
                formik.setFieldValue("cart[services][" + item + "][id]", service_id);
                formik.setFieldValue("cart[services][" + item + "][staff_id]", staff && staff.id);
                formik.setFieldValue("cart[services][" + item + "][gprice]", String(gprice));
              });
            }
            if (isCart && isCart.products.length > 0) {
              Object.keys(isCart.products).map((item) => {
                let product_id = isCart.products[item].id;
                let product_cost_price = isCart.products[item].cost_price;
                let qty = isCart.products[item].qty;
                let product_price = qty > 0 ? parseInt(qty) * parseFloat(product_cost_price) : product_cost_price;
                // totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
                formik.setFieldValue("cart[products][" + item + "][id]", product_id);
                formik.setFieldValue("cart[products][" + item + "][qty]", String(qty));
                formik.setFieldValue("cart[products][" + item + "][cost_price]", product_cost_price);
              });
            }
            if (isCart && isCart.vouchers.length > 0) {
              Object.keys(isCart.vouchers).map((item) => {
                let voucher_id = isCart.vouchers[item].id;
                let voucher_price = isCart.vouchers[item].amount;
                let code = isCart.vouchers[item].code;
                let voucher_to = isCart.vouchers[item].voucher_to;
                // totalprice += isNaN(parseFloat(voucher_price)) === false && parseFloat(voucher_price);
                formik.setFieldValue("cart[vouchers][" + item + "][id]", voucher_id);
                formik.setFieldValue("cart[vouchers][" + item + "][code]", String(code));
                formik.setFieldValue("cart[vouchers][" + item + "][amount]", String(voucher_price));
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
                // totalprice += isNaN(parseFloat(amount)) === false && parseFloat(amount);
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
                // totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
                formik.setFieldValue("cart[membership][" + item + "][id]", id);
                formik.setFieldValue("cart[membership][" + item + "][cost]", cost);
              });
            }
            if (isCart && isCart.subscription.length > 0) {
              Object.keys(isCart.subscription).map((item) => {
                let id = isCart.subscription[item].id;
                let amount = isCart.subscription[item].amount;
                formik.setFieldValue("cart[subscription][" + item + "][id]", id);
                formik.setFieldValue("cart[subscription][" + item + "][amount]", String(amount));
              });
            }
          }, [isCart, appointmentDetail]);

          let totalprice = 0;
          if (appointmentDetail && appointmentDetail.cost) {
            totalprice += isNaN(parseFloat(appointmentDetail.cost)) === false && parseFloat(appointmentDetail.cost);
          }
          let isCartForm = isCart;
          if (isCartForm && isCartForm.services.length > 0) {
            Object.keys(isCartForm.services).map((item) => {
              let gprice = isCartForm.services[item].gprice ? isCartForm.services[item].gprice : "";
              totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);
            });
          }
          if (isCartForm && isCartForm.products.length > 0) {
            Object.keys(isCartForm.products).map((item) => {
              let product_cost_price = isCartForm.products[item].cost_price;
              let qty = isCartForm.products[item].qty;
              let product_price = qty > 0 ? parseInt(qty) * parseFloat(product_cost_price) : product_cost_price;
              totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
            });
          }
          if (isCartForm && isCartForm.vouchers.length > 0) {
            Object.keys(isCartForm.vouchers).map((item) => {
              let voucher_price = isCartForm.vouchers[item].amount;
              totalprice += isNaN(parseFloat(voucher_price)) === false && parseFloat(voucher_price);
            });
          }

          if (isCartForm && isCartForm.onoffvouchers.length > 0) {
            Object.keys(isCartForm.onoffvouchers).map((item) => {
              let amount = isCartForm.onoffvouchers[item].amount;
              totalprice += isNaN(parseFloat(amount)) === false && parseFloat(amount);
            });
          }

          if (isCartForm && isCartForm.membership.length > 0) {
            Object.keys(isCartForm.membership).map((item) => {
              let cost = isCartForm.membership[item].cost;
              totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
            });
          }
          if (isCartForm && isCartForm.subscription.length > 0) {
            Object.keys(isCartForm.subscription).map((item) => {
              let cost = isCartForm.subscription[item].amount;
              totalprice += isNaN(parseFloat(cost)) === false && parseFloat(cost);
            });
          }
          useEffect(() => {
            formik.setFieldValue("totalprice", totalprice);
          }, [totalprice]);
          // console.log(formatCreditCardNumber(formik.values.cardnumber));
          // formik.setFieldValue("cardnumber", formatCreditCardNumber(formik.values.cardnumber));
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
                            // totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);
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
                            // totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
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

                            // totalprice += isNaN(parseFloat(voucher_price)) === false && parseFloat(voucher_price);
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
                            // totalprice += isNaN(parseFloat(amount)) === false && parseFloat(amount);
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

                            // totalprice += isNaN(parseFloat(membership_price)) === false && parseFloat(membership_price);
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
                        {isCart &&
                          isCart.subscription.length > 0 &&
                          Object.keys(isCart.subscription).map((item) => {
                            let subscription_id = isCart.subscription[item].id;
                            let subscription_name = isCart.subscription[item].name;
                            let subscription_price = isCart.subscription[item].amount;
                            // totalprice += isNaN(parseFloat(subscription_price)) === false && parseFloat(subscription_price);
                            let image_url = config.imagepath + "subscription.png";
                            return (
                              <div className="membership-box mt-0 mb-3 ps-2" key={item}>
                                <div className="membership-header" id="#checkout-probox">
                                  <a
                                    className="close d-block cursor-pointer"
                                    onClick={() => {
                                      dispatch(SaleSubscriptionRemoveToCart({ id: subscription_id }));
                                      formik.setValues({ ...formik.values, cart: { ...formik.values.cart, subscription: formik.values.cart.subscription && formik.values.cart.subscription.length > 0 ? formik.values.cart.subscription.filter((item) => item.id != subscription_id) : [] } });
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
                                          <h4 className="mb-0 fw-semibold">{ucfirst(subscription_name)}</h4>
                                        </div>
                                        <h4 className="col-3 mb-0 text-end">${subscription_price}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        <div className="">
                          <TextareaField type="text" name="description" rows={1} placeholder={t("Add a note...")} value={formik.values.description} label={""} className="form-control lg" controlId="checkoutForm-description" />
                        </div>
                        <div className="px-4 d-flex py-3 total">
                          <span className="h2 pe-2 mb-0">{t("Total")}</span>
                          <span className="h2 text-end ms-auto mb-0">${formik.values.totalprice}</span>
                        </div>
                        <div className="row">
                          <div className="col-12 mb-3">
                            {currentUser.stripe_account_id && (
                              <button
                                type="submit"
                                id="payment-link"
                                className="btn btn-primary btn-lg w-100 p-3"
                                disabled={loading}
                                onClick={() => {
                                  formik.setFieldValue("is_stripe", 1);
                                  // dispatch(OpenCardPaymentForm());
                                  // dispatch(CardPaymentData(formik));
                                }}
                              >
                                {loading && <span className="spinner-border spinner-border-sm"></span>}
                                {t("Paid by Stripe (Credit Card)")}
                              </button>
                            )}
                          </div>
                          <div className="col-4">
                            <button
                              type="submit"
                              id="payment-link"
                              className="btn btn-pay btn-lg w-100 p-3"
                              disabled={loading}
                              onClick={() => {
                                formik.setFieldValue("is_stripe", 0);
                                formik.setFieldValue("paidby", "CreditCard");
                              }}
                            >
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Paid by Credit Card")}
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="submit"
                              className="btn btn-pay btn-lg w-100 p-3"
                              disabled={loading}
                              onClick={() => {
                                formik.setFieldValue("is_stripe", 0);
                                formik.setFieldValue("paidby", "Cash");
                              }}
                            >
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Paid by Cash")}
                            </button>
                          </div>
                          <div className="col-4">
                            <button type="button" className="btn btn-pay-voucher btn-lg w-100 pay-voucher p-3" disabled={loading} onClick={() => dispatch(OpenVoucherApplyForm())}>
                              {loading && <span className="spinner-border spinner-border-sm"></span>}
                              {t("Pay by Voucher")}
                            </button>
                          </div>
                        </div>
                        {/* {isOpenCardPaymentForm ? (
                          <div className="row gy-3 mt-4">
                            <div className="col-md-4">
                              <InputField type="text" name="cardnumber" value={formatCreditCardNumber(formik.values.cardnumber)} label={t("Card Number")} controlId="checkoutForm-cardnumber" placeholder="**** **** **** ****" />
                            </div>
                            <div className="col-md-4">
                              <InputField type="text" name="cardexpiry" placeholder="MM/YY" value={formatExpirationDate(formik.values.cardexpiry)} label={t("Card Expiry")} controlId="checkoutForm-cardexpiry" />
                            </div>
                            <div className="col-md-4">
                              <InputField type="text" name="cardcvc" placeholder="***" value={formatCVC(formik.values.cardcvc)} label={t("Card Cvc")} controlId="checkoutForm-cardcvc" />
                            </div>
                            <div className="col-md-12">
                              <button type="submit" className="btn btn-pay btn-lg w-100 p-3" disabled={loading} onClick={() => formik.setFieldValue("paidby", "CreditCard")}>
                                {loading && <span className="spinner-border spinner-border-sm"></span>}
                                {t("Pay")}
                              </button>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
      {isOpenCardPaymentForm && <CardPaymentForm />}
      {isOpenedVoucherApplyForm && <VoucherApplyForm client={client} />}
    </React.Fragment>
  );
};
SaleCheckoutForm.propTypes = {
  appointmentDetail: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  amount: PropTypes.string,
};
export default SaleCheckoutForm;
