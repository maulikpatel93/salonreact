import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
// validation Formik
import * as Yup from "yup";
import { Formik, Field } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, SelectField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly, digitOnly } from "../../../component/form/Validation";
// import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { CloseAddSubscriptionForm, CloseEditSubscriptionForm, SubscriptionServiceApi, SubscriptionServiceRemoveToCart, SubscriptionUpdateApi } from "store/slices/subscriptionSlice";
import SubscriptionServiceListView from "../List/SubscriptionServiceListView";

const SubscriptionEditForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const rightDrawerOpened = useSelector((state) => state.subscription.isOpenedEditForm);
  const isServices = useSelector((state) => state.subscription.isServices);
  const isSubscriptionServicesObj = useSelector((state) => state.subscription.isSubscriptionServices);
  const detail = useSelector((state) => state.subscription.isDetailData);
  // useEffect(() => {
  //   dispatch(SubscriptionServiceApi());
  // }, []);

  const initialValues = {
    name: "",
    amount: "",
    repeats: "Yes",
    repeat_time: 1,
    repeat_time_option: "",
    subservice: [],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(100).label(t("Subscription Name")).required(),
    amount: Yup.string().trim().label(t("Amount")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    repeat_time: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time")).required(t("Required")).test("Digits only", t("Digits only"), decimalOnly),
      }),
    repeat_time_option: Yup.string()
      .nullable()
      .when("repeats", {
        is: "Yes",
        then: Yup.string().trim().label(t("Repeat time option")).required(t("Required")),
      }),
    subservice: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().trim().label(t("ID")).required().test("Digits only", t("Digits only"), digitOnly),
        qty: Yup.string().trim().label("").min(1).required("*").test("Digits only", t("Digits only"), digitOnly),
      }),
    ),
  });
  yupconfig();

  const handlesubscriptionSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(SubscriptionUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
          dispatch(CloseEditSubscriptionForm());
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
  const handleCloseEditSubscriptionForm = () => {
    dispatch(CloseEditSubscriptionForm());
  };
  // const repeatsOptionsData = [
  //   { value: "No", label: t("No") },
  //   { value: "Yes", label: t("Yes") },
  // ];
  const repeattimeOptionsData = [
    { value: "Weekly", label: t("Week(s)") },
    { value: "Monthly", label: t("Month(s)") },
    { value: "Yearly", label: t("Year(s)") },
  ];

  //Pagination Service
  const fetchDataSaleService = () => {
    dispatch(SaleServiceApi({ next_page_url: isProducts.next_page_url }));
  };
  const [isFetchingServices, setIsFetchingServices] = useState(false);
  const loadMoreServices = () => {
    setIsFetchingServices(true);
    dispatch(SaleServiceApi({ next_page_url: isServices.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingServices(false);
    }, 2000);
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubscriptionSubmit}>
        {(formik) => {
          useEffect(() => {
            formik.setFieldValue("repeats", "Yes", false);
            formik.setFieldValue("repeat_time", 1, false); // count of month
            if (detail) {
              const fields = ["id", "name", "amount", "repeat_time_option"];
              fields.forEach((field) => {
                let detail_field = detail[field] ? detail[field] : "";
                formik.setFieldValue(field, detail_field, false);
              });
            }
          }, [detail]);
          useEffect(() => {
            if (isSubscriptionServicesObj.length > 0) {
              Object.keys(isSubscriptionServicesObj).map((item) => {
                let id = isSubscriptionServicesObj[item].id;
                let editqty = isSubscriptionServicesObj[item].qty ? isSubscriptionServicesObj[item].qty : 1;
                let defaultPrice = isSubscriptionServicesObj[item].defaultserviceprice;
                let service_price = defaultPrice.length === 1 ? parseFloat(defaultPrice[0].price) : "";
                let service_addonprice = defaultPrice.length === 1 ? parseFloat(defaultPrice[0].add_on_price) : "";
                // let qty = formik.values && formik.values.subservice.length > 0 && formik.values.subservice[item] && formik.values.subservice[item].qty ? formik.values.subservice[item].qty : editqty;
                formik.setFieldValue("subservice[" + item + "][id]", id, false);
                formik.setFieldValue("subservice[" + item + "][qty]", editqty, false);
                formik.setFieldValue("subservice[" + item + "][service_price]", service_price, false);
                formik.setFieldValue("subservice[" + item + "][service_addonprice]", service_addonprice, false);
              });
            }
          }, [isSubscriptionServicesObj]);
          return (
            <div className={rightDrawerOpened + " full-screen-drawer p-0 subscription-drawer"} id="addproduct-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("Edit Subscription")}</h3>
                    <div className="ms-auto">
                      <button type="button" className="close btn btn-cancel me-1 cursor-pointer" onClick={handleCloseEditSubscriptionForm}>
                        {t("Cancel")}
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body px-4 pt-2">
                    <div className="row mx-0">
                      <div className="col-md-4 p-xl-5 p-4">
                        <div className="mb-md-4 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Subscription Name")}</h4>
                          <p className="mb-2">{t("Add a name to easily identify the subscription.")}</p>
                          <InputField type="text" name="name" value={formik.values.name} label={t("Subscription Name")} controlId="subscriptionForm-name" />
                        </div>
                        <div className="mb-md-4 mb-3">
                          <h4 className="fw-semibold mb-2">Cost</h4>
                          <p className="mb-2">{t("Add how much the subscription will cost.")}</p>
                          <InputField name="amount" value={formik.values.amount} label={t("Amount")} controlId="subscriptionForm-amount" placeholder="$" />
                        </div>
                        <div className="mb-md-4 ">
                          <h4 className="fw-semibold mb-2">{t("Frequency of Payment and Services")}</h4>
                          <p className="mb-2">{t("Choose how often the subscription repeats. Note, payment will automatically be taken and the services will reset at this interval.")}</p>
                          <SelectField name="repeat_time_option" placeholder={t("--Select--")} value={formik.values.repeat_time_option} options={repeattimeOptionsData} label={"Repeats"} controlId="subscriptionForm-repeat_time_option" />
                        </div>
                      </div>
                      <div className="col-md-4 p-xl-5 p-4 subscription-service">
                        <h4 className="fw-semibold mb-2">Add Services</h4>
                        <p>Select the services to include in the subsription.</p>
                        <InfiniteScroll className="" dataLength={isServices && isServices.data && isServices.data.length ? isServices.data.length : "0"} next={fetchDataSaleService} scrollableTarget="services" hasMore={isServices.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <SubscriptionServiceListView view={isServices} />
                          {!isFetchingServices && isServices.next_page_url && (
                            <div className="col-2 m-auto p-3 text-center">
                              <button onClick={loadMoreServices} className="btn btn-primary">
                                {t("More")}
                              </button>
                            </div>
                          )}
                        </InfiniteScroll>
                      </div>
                      <div className="col-md-4 p-xl-5 p-4">
                        <h4 className="fw-semibold mb-2">{t("Services Included")}</h4>
                        <p>{t("Set the quantity of the services included, or remove them.")}</p>

                        {isSubscriptionServicesObj.length > 0 &&
                          Object.keys(isSubscriptionServicesObj).map((item) => {
                            let id = isSubscriptionServicesObj[item].id;
                            let service_name = isSubscriptionServicesObj[item].name;
                            let defaultPrice = isSubscriptionServicesObj[item].defaultserviceprice;
                            let service_price = defaultPrice.length === 1 ? defaultPrice[0].price : "";
                            let qty = formik.values && formik.values.subservice.length > 0 && formik.values.subservice[item] && formik.values.subservice[item].qty ? formik.values.subservice[item].qty : "";
                            return (
                              <div className="card card-body mb-3" key={item}>
                                <div className="d-flex flex-wrap align-items-center">
                                  <div className="col-lg-8 col-12 d-flex align-items-center pe-lg-2 mb-lg-0 mb-2">
                                    <InputField
                                      type="text"
                                      name={`subservice[${item}][qty]`}
                                      value={qty}
                                      className="form-control qty text-center me-xxl-4 me-2"
                                      controlId={"subscriptionForm-subservice" + item}
                                      onChange={(e) => {
                                        dispatch({ type: "subscription/subscriptionservicecart/fulfilled", payload: { ...isSubscriptionServicesObj[item], qty: e.target.value } });
                                        formik.handleChange(e);
                                      }}
                                    />
                                    <h5 className="fw-semibold mb-0">{service_name}</h5>
                                  </div>
                                  <div className="col-lg-4 col-12 d-flex justify-content-between  align-items-center">
                                    <h5 className="fw-semibold mb-0">${service_price}</h5>
                                    <a
                                      className="close d-block cursor-pointer"
                                      onClick={() => {
                                        dispatch(SubscriptionServiceRemoveToCart({ id: id }));
                                        formik.setValues({ ...formik.values, subservice: formik.values.subservice && formik.values.subservice.length > 0 ? formik.values.subservice.filter((item) => item.id != id) : [] });
                                      }}
                                    >
                                      <i className="fal fa-times"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {isSubscriptionServicesObj.length <= 0 ? <div className="fw-bold p-3">{t("No data found")}</div> : ""}
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

// SubscriptionEditForm.propTypes = {
//   service: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default SubscriptionEditForm;
