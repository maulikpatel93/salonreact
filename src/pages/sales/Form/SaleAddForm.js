import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { ucfirst } from "helpers/functions";
import PropTypes from "prop-types";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { decimalOnly, digitOnly } from "../../../component/form/Validation";
import { sweatalert } from "../../../component/Sweatalert2";
import useScriptRef from "../../../hooks/useScriptRef";
import { InputField, InlineInputField, ReactSelectField } from "component/form/Field";
import moment from "moment";

import { SaleServiceRemoveToCart, SaleProductRemoveToCart, saleStoreApi, closeAddSaleForm, SaleVoucherRemoveToCart, SaleMembershipRemoveToCart, OpenVoucherToForm, VoucherToFormData, SaleOnOffVoucherRemoveToCart, SaleCheckoutData, OpenCheckoutForm, SaleCartUpdate, SaleProductToCartApi } from "../../../store/slices/saleSlice";
import { OpenAddClientForm, OpenClientSearchList, CloseClientSearchList, ClientSuggetionListApi, ClientSearchName, ClientSearchObj } from "store/slices/clientSlice";
import { closeAppointmentDetailModal, appointmentListViewApi } from "../../../store/slices/appointmentSlice";
import { busytimeListViewApi } from "../../../store/slices/busytimeSlice";
import ClientSuggetionListView from "pages/clients/List/ClientSuggetionListView";

const SaleAddForm = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const isRangeInfo = props.isRangeInfo;
  const isSearchListClient = useSelector((state) => state.client.isSearchList);
  const isSearchNameClient = useSelector((state) => state.client.isSearchName);
  const isSearchObjClient = useSelector((state) => state.client.isSearchObj);
  const SuggetionViewClient = useSelector((state) => state.client.isSuggetionListView);
  const appointmentDetail = props.appointmentDetail;

  const isCart = useSelector((state) => state.sale.isCart);
  console.log(isCart);
  const initialValues = {
    client_id: "",
    client_name: "",
    // notes: "",
    cart: { services: [], products: [], vouchers: [], onoffvouchers: [], membership: [] },
    appointment_id: "",
    eventdate: "",
    client: "",
    appointmentDetail: "",
  };
  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    client_name: Yup.string().trim().label(t("Client")),
    // notes: Yup.string().trim().label(t("Notes")),
    cart: Yup.object().shape({
      services: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().label(t("ID")).required().test("Digits only", t("The field should have digits only"), digitOnly),
          staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Staff")).required())),
          gprice: Yup.string().trim().label(t("Cost Price")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
        }),
      ),
      products: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().label(t("ID")).required().test("Digits only", t("The field should have digits only"), digitOnly),
          qty: Yup.string().trim().label(t("Quantity")).min(1).required().test("Digits only", t("The field should have digits only"), digitOnly),
          price: Yup.string().trim().label(t("Cost Price")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
        }),
      ),
      vouchers: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().label(t("ID")).required().test("Digits only", t("The field should have digits only"), digitOnly),
          amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
        }),
      ),
      onoffvouchers: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().label(t("ID")).test("Digits only", t("The field should have digits only"), digitOnly),
          first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
          last_name: Yup.string().trim().max(50).label(t("Last Name")).required(),
          email: Yup.string().trim().max(100).email().label(t("Email Address")),
          amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly).required(),
          message: Yup.string().trim().label(t("Message")),
        }),
      ),
      membership: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().trim().label(t("ID")).required().test("Digits only", t("The field should have digits only"), digitOnly).required(),
          cost: Yup.string().trim().label(t("Cost Price")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly).required(),
        }),
      ),
    }),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(OpenCheckoutForm());
      dispatch(SaleCheckoutData(values));
      setStatus({ success: true });
      setLoading(false);
      // dispatch(saleStoreApi(values)).then((action) => {
      //   if (action.meta.requestStatus === "fulfilled") {
      //     setStatus({ success: true });
      //     resetForm();
      //     dispatch(closeAddSaleForm());
      //     dispatch(closeAppointmentDetailModal());
      //     sweatalert({ title: t("Sale Completed"), text: t("Sale Completed Successfully"), icon: "success" });
      //     if (isRangeInfo) {
      //       dispatch(appointmentListViewApi(isRangeInfo));
      //       dispatch(busytimeListViewApi(isRangeInfo));
      //     }
      //     if (scriptedRef.current) {
      //       setLoading(false);
      //     }
      //   } else if (action.meta.requestStatus === "rejected") {
      //     const status = action.payload && action.payload.status;
      //     const errors = action.payload && action.payload.message && action.payload.message.errors;
      //     if (status === 422) {
      //       setErrors(errors);
      //     }
      //     setStatus({ success: false });
      //     setSubmitting(false);
      //     if (scriptedRef.current) {
      //       setLoading(false);
      //     }
      //   }
      // });
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };

  //Client search
  const fetchDataSuggetionListClient = () => {
    dispatch(ClientSuggetionListApi({ next_page_url: SuggetionViewClient.next_page_url, q: isSearchNameClient }));
  };

  const handleClickSearchClient = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(OpenClientSearchList());
      dispatch(ClientSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchClient = (e) => {
    let q = e.currentTarget.value;
    dispatch(ClientSearchName(q));
    if (q && q.length > 0) {
      dispatch(OpenClientSearchList());
      dispatch(ClientSuggetionListApi({ q: q }));
    } else {
      dispatch(CloseClientSearchList());
      dispatch(ClientSearchName(""));
      dispatch(ClientSearchObj(""));
    }
  };
  const handleCloseSearchClient = () => {
    dispatch(ClientSearchName(""));
    dispatch(ClientSearchObj(""));
    dispatch(CloseClientSearchList());
  };
  const handleOnBlurClient = () => {
    // setTimeout(() => {
    //   dispatch(CloseClientSearchList());
    // }, 200);
  };

  const handleClientAddForm = () => {
    dispatch(OpenAddClientForm());
  };

  const isCartCount = [];
  if (isCart) {
    Object.keys(isCart).map((c) => {
      if (isCart[c].length > 0) {
        isCartCount.push(isCart[c].length);
      }
    });
  }
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {
            if (isSearchObjClient) {
              formik.setFieldValue("client", isSearchObjClient);
            }
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
                let formik_cart_products_qty = formik.values.cart && formik.values.cart.products.length > 0 && formik.values.cart.products[item] && formik.values.cart.products[item].qty ? formik.values.cart.products[item].qty : "1";
                let product_price = formik_cart_products_qty > 0 ? parseInt(formik_cart_products_qty) * parseFloat(product_cost_price) : product_cost_price;
                totalprice += isNaN(parseFloat(product_price)) === false && parseFloat(product_price);
                formik.setFieldValue("cart[products][" + item + "][id]", product_id);
                formik.setFieldValue("cart[products][" + item + "][qty]", formik_cart_products_qty);
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
                formik.setFieldValue("cart[membership][" + item + "][cost]", String(cost));
              });
            }
            if (appointmentDetail) {
              formik.setFieldValue("appointmentDetail", appointmentDetail);
              formik.setFieldValue("client_id", appointmentDetail.client_id);
              formik.setFieldValue("appointment_id", appointmentDetail.id);
              formik.setFieldValue("eventdate", appointmentDetail.showdate);
              // dispatch(ClientSearchName(appointmentDetail.client && ));
              dispatch(ClientSearchObj(appointmentDetail.client));
              dispatch(ClientSearchName(appointmentDetail.client && ucfirst(appointmentDetail.client.first_name + " " + appointmentDetail.client.last_name)));
            }
          }, [isCart, appointmentDetail, isSearchObjClient]);
          let totalprice = 0;
          if (appointmentDetail && appointmentDetail.cost) {
            totalprice += isNaN(parseFloat(appointmentDetail.cost)) === false && parseFloat(appointmentDetail.cost);
          }
          return (
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className={isSearchObjClient ? "add-item-panel p-4" : "search-panel p-4"}>
                {isSearchObjClient ? (
                  <div className="flex-column justify-content-between d-flex flex-wrap">
                    <div className="user-box">
                      <div className="d-flex align-items-center">
                        {/* <div className="user-initial me-3">js</div> */}
                        {isSearchObjClient.profile_photo_url ? (
                          <div className="user-img me-3">
                            <img src={isSearchObjClient.profile_photo_url} alt="" className="rounded-circle wh-60" />
                          </div>
                        ) : (
                          <div className="user-initial me-3">{isSearchObjClient.first_name.charAt(0) + "" + isSearchObjClient.last_name.charAt(0)}</div>
                        )}
                        <div className="user-id">
                          <h3 className="mb-0">
                            {isSearchNameClient}
                            <a
                              className="close ms-2 cursor-pointer"
                              onClick={() => {
                                formik.setFieldValue("client_id", "");
                                handleCloseSearchClient();
                              }}
                            >
                              {appointmentDetail ? "" : <i className="fal fa-times"></i>}
                            </a>
                          </h3>
                          <span>{isSearchObjClient && isSearchObjClient.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="search large-input">
                    <div className="text-end">
                      <a id="addclient-link" className="h6 color-wine text-decoration-none mb-3 cursor-pointer" onClick={handleClientAddForm}>
                        <i className="fal fa-plus pe-1 small"></i> {t("New Client")}
                      </a>
                    </div>
                    <div className="input-group mb-md-3 mb-1">
                      <span className="input-group-text">
                        <i className="far fa-search"></i>
                      </span>
                      <input
                        type="text"
                        name="client_name"
                        id="salonForm-client_name"
                        className={(formik.touched && formik.touched.client_id && formik.errors && formik.errors.client_id ? "is-invalid" : "") + " form-control search-input"}
                        placeholder={t("Start typing client's name")}
                        value={isSearchNameClient}
                        onInput={(e) => {
                          formik.setFieldValue("client_id", "");
                          dispatch(ClientSearchName(e.target.value));
                        }}
                        onClick={handleClickSearchClient}
                        onKeyUp={handleKeyUpSearchClient}
                        onBlur={handleOnBlurClient}
                      />
                      <a
                        className="close cursor-pointer"
                        style={{ display: isSearchNameClient ? "block" : "none" }}
                        onClick={() => {
                          formik.setFieldValue("client_id", "");
                          handleCloseSearchClient();
                        }}
                      >
                        <i className="fal fa-times"></i>
                      </a>
                    </div>
                    <div className={"search-result dropdown-box " + isSearchListClient} id="search-content">
                      <InfiniteScroll className="" dataLength={SuggetionViewClient && SuggetionViewClient.data && SuggetionViewClient.data.length ? SuggetionViewClient.data.length : "0"} next={fetchDataSuggetionListClient} scrollableTarget="search-content" hasMore={SuggetionViewClient.next_page_url ? true : false} loader={<PaginationLoader />}>
                        <ul className="p-0 m-0 list-unstyled">
                          <ClientSuggetionListView view={SuggetionViewClient} page={"saleaddForm"} formik={formik} />
                        </ul>
                      </InfiniteScroll>
                    </div>
                  </div>
                )}
                <InputField type="hidden" name="client_id" id="saleForm-client_id" value={formik.values.client_id} />
              </div>
              {appointmentDetail || (isCart && (isCart.services.length > 0 || isCart.products.length > 0 || isCart.vouchers.length > 0 || isCart.onoffvouchers.length > 0 || isCart.membership.length > 0)) ? (
                <div className="p-4 newsale-probox">
                  {appointmentDetail && (
                    <div className="product-box mt-0 mb-3">
                      <div className="product-header" id="#checkout-probox">
                        <div className="row">
                          <div className="col-9">
                            <h4 className="mb-0 fw-semibold">{appointmentDetail.service.name}</h4>
                            <p className="mb-0">{t("With {{ staff_name }} from {{ eventdate }} at {{ start_time }} - {{ end_time }}", { staff_name: ucfirst(appointmentDetail.staff.first_name + " " + appointmentDetail.staff.last_name), eventdate: appointmentDetail.showdate, start_time: moment(appointmentDetail.dateof + "T" + appointmentDetail.start_time).format("hh:mm A"), end_time: moment(appointmentDetail.dateof + "T" + appointmentDetail.end_time).format("hh:mm A") })} </p>
                            <div className="d-none">
                              <InputField type="hidden" name="appointment_id" value={formik.values.appointment_id} id={`"salonform-cart-appointment-0-id"`} />
                            </div>
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
                      // let service_price = isCart.services[item].serviceprice;
                      // let generalPrice = service_price.filter((x) => x.name == "General");
                      // let gprice = generalPrice.length === 1 ? generalPrice[0].price : "0.00";
                      let staffservices = isCart.services[item].staffservices;
                      let formik_cart_service_gprice = formik.values.cart && formik.values.cart.services.length > 0 && formik.values.cart.services[item] && formik.values.cart.services[item].gprice ? formik.values.cart.services[item].gprice : "";
                      let formik_cart_service_staff_id = formik.values.cart && formik.values.cart.services.length > 0 && formik.values.cart.services[item] && formik.values.cart.services[item].staff_id ? formik.values.cart.services[item].staff_id : "";
                      totalprice += isNaN(parseFloat(formik_cart_service_gprice)) === false && parseFloat(formik_cart_service_gprice);
                      let staffOptionsData = [];
                      if (staffservices.length > 0) {
                        Object.keys(staffservices).map((staffindex) => {
                          let id = staffservices[staffindex].id;
                          let first_name = staffservices[staffindex].first_name;
                          let last_name = staffservices[staffindex].last_name;
                          // let image_url = staffservices[item].profile_photo_url;
                          let name = ucfirst(first_name) + " " + ucfirst(last_name);
                          staffOptionsData.push({ value: id, label: name });
                        });
                      }
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
                              </div>
                              <h4 className="col-3 mb-0 text-end">${formik_cart_service_gprice}</h4>
                            </div>
                          </div>
                          <div className=" d-block" id="checkout-probox">
                            <div className="card card-body">
                              <div className="row ">
                                <div className="col-md-4 align-items-center mt-1">
                                  <ReactSelectField name={`cart[services][${item}][staff_id]`} placeholder={t("Choose Staff")} value={formik_cart_service_staff_id} options={staffOptionsData} label={t("Staff")} controlId={`"salonform-cart-services-${item}-staff_id"`} isMulti={false} page={"newsale"} service_id={service_id} />
                                </div>
                                <div className="col-md-4 price-input align-items-center mt-1">
                                  <InputField
                                    type="text"
                                    name={`cart[services][${item}][gprice]`}
                                    value={formik_cart_service_gprice}
                                    label={t("Cost")}
                                    controlId={`"salonform-cart-services-${item}-cost"`}
                                    page={"saleform"}
                                    placeholder="$"
                                    onChange={(e) => {
                                      dispatch(SaleCartUpdate({ type: "services", id: service_id, gprice: e.target.value }));
                                      formik.handleChange(e);
                                    }}
                                  />
                                </div>
                              </div>
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
                      // let cost_price = isCart.products[item].cost_price;
                      let image_url = isCart.products[item].image_url;

                      let formik_cart_products_qty = formik.values.cart && formik.values.cart.products.length > 0 && formik.values.cart.products[item] && formik.values.cart.products[item].qty ? formik.values.cart.products[item].qty : "";
                      let product_price = formik_cart_products_qty > 0 ? parseInt(formik_cart_products_qty) * parseFloat(cost_price) : cost_price;
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
                                  <div className="user-initial">{product_name.charAt(0)}</div>
                                )}
                              </div>
                              <div className="pro-content">
                                <div className="row">
                                  <div className="col-9">
                                    <h4 className="mb-2 fw-semibold">{ucfirst(product_name)}</h4>
                                    <div className="qty align-items-center">
                                      <InlineInputField
                                        type="text"
                                        name={`cart[products][${item}][qty]`}
                                        value={formik_cart_products_qty}
                                        label={t("Qty")}
                                        controlId={`"salonform-cart-products-${item}-qty"`}
                                        page={"saleform"}
                                        onChange={(e) => {
                                          dispatch(SaleCartUpdate({ type: "products", id: product_id, qty: e.target.value }));
                                          formik.handleChange(e);
                                        }}
                                      />
                                    </div>
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
                              <div
                                className="pro-content cursor-pointer"
                                onClick={() => {
                                  const onoffvouchersdata = isCart.onoffvouchers[item];
                                  dispatch(OpenVoucherToForm());
                                  dispatch(VoucherToFormData({ type: "OnOffVoucher", onoffvoucher: onoffvouchersdata }));
                                }}
                              >
                                <div className="row">
                                  <div className="col-9">
                                    <h4 className="mb-2 fw-semibold">{ucfirst(first_name) + " " + ucfirst(last_name)}</h4>
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
                </div>
              ) : (
                <div className="complete-box text-center flex-column justify-content-center mt-md-5 mt-4">
                  <div className="complete-box-wrp text-center">
                    <img src={config.imagepath + "voucher.png"} alt="" className="mb-md-4 mb-3" />
                    <h4 className="mb-2 fw-semibold">{t("There are no items added to the sale yet. Please choose one.")}</h4>
                  </div>
                </div>
              )}
              {isCartCount.length === 0 && appointmentDetail === "" ? (
                ""
              ) : (
                <>
                  <div className="full-screen-drawer-footer payment-option mt-5">
                    <div className="px-4 d-flex py-3 total">
                      <span className="h2 pe-2 mb-0">{t("Total")}</span>
                      <span className="h2 text-end ms-auto mb-0">${totalprice}</span>
                    </div>
                  </div>
                  <div className="full-screen-drawer-footer" id="checkout">
                    <div className="p-4">
                      <button type="submit" id="salecomplete-invoice-link" className="w-100 btn btn-checkout btn-lg" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Checkout")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
SaleAddForm.propTypes = {
  appointmentDetail: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default SaleAddForm;
