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
import { InputField, InlineInputField, TextareaField, ReactSelectField } from "component/form/Field";
import moment from "moment";

import { saleStoreApi, closeAddSaleForm, CloseCheckoutForm, SaleServiceRemoveToCart } from "../../../store/slices/saleSlice";

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
  const isCart = isCheckoutData.cart ? isCheckoutData.cart : "";

  const isRangeInfo = props.isRangeInfo;
  const initialValues = {
    client_id: "",
    notes: "",
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
          useEffect(() => {}, []);
          let totalprice = 0;
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
                  <div className="drawer-body">
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
                            let staff_id = isCart.services[item].staff_id;
                            let gprice = isCart.services[item].gprice;
                              console.log(isCart.services[item]);
                            let staffservices = isCart.services[item].staffservices;
                            totalprice += isNaN(parseFloat(gprice)) === false && parseFloat(gprice);
                            let staffdata = staffservices.length > 0 ? staffservices.filter((event) => event.id === staff_id) : "";
                            let staff = staffdata ? staffdata[0] : ""
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
                                      <p className="mb-0">{t("With {{ staff_name }}", { staff_name: staff && ucfirst(staff.first_name + " " + staff.last_name) })} </p>
                                    </div>
                                    <h4 className="col-3 mb-0 text-end">${gprice}</h4>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
