import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, ReactSelectField, SelectField, TextareaField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import PropTypes from "prop-types";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeAddAppointmentForm, appointmentStoreApi, appointmentListViewApi, clientAppointmentListViewApi } from "../../../store/slices/appointmentSlice";
import { servicePriceApi } from "../../../store/slices/serviceSlice";
import { openAddClientForm, openClientSearchList, closeClientSearchList, clientSuggetionListApi, clientSearchName } from "store/slices/clientSlice";
import SuggetionListView from "pages/clients/List/SuggetionListView";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import { MinutesToHours, getHours, getMinutes, ucfirst } from "helpers/functions";
import { decimalOnly } from "../../../component/form/Validation";
import { busytimeListViewApi } from "store/slices/busytimeSlice";

const AppointmentAddForm = (props) => {
  const [loading, setLoading] = useState(false);
  // const [clientId, setClientId] = useState("");
  const rightDrawerOpened = useSelector((state) => state.appointment.isOpenedAddForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();
  const isSearchList = useSelector((state) => state.client.isSearchList);
  const isSearchName = useSelector((state) => state.client.isSearchName);
  const SuggetionView = useSelector((state) => state.client.isSuggetionListView);
  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const isServicePrice = useSelector((state) => state.service.isServicePrice);
  const appointmentDetail = useSelector((state) => state.appointment.isDetailData);
  const isRangeInfo = props.isRangeInfo;
  const client = appointmentDetail && appointmentDetail.client;

  const handlecloseAddAppointmentForm = () => {
    dispatch(closeAddAppointmentForm());
  };

  const fetchDataSuggetionList = () => {
    dispatch(clientSuggetionListApi({ next_page_url: SuggetionView.next_page_url, q: isSearchName }));
  };

  const handleClickSearch = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearch = (e) => {
    let q = e.currentTarget.value;
    dispatch(clientSearchName(q));
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    } else {
      dispatch(closeClientSearchList());
    }
  };
  const handleCloseSearch = () => {
    dispatch(clientSearchName(""));
    dispatch(closeClientSearchList());
  };
  const handleOnBlur = () => {
    // setTimeout(() => {
    //   dispatch(closeClientSearchList());
    // }, 200);
  };
  const initialValues = {
    client_id: "",
    service_id: "",
    staff_id: "",
    dateof: "",
    start_time: "",
    duration: "",
    cost: "",
    repeats: "",
    booking_notes: "",
    client_name: "",
  };

  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    service_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Service")).required())),
    staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Staff")).required())),
    dateof: Yup.date()
      .label(t("Date"))
      .required()
      .min(new Date(Date.now() - 86400000), t("Date cannot be in the past")),
    start_time: Yup.string().trim().label(t("Start Time")).required(),
    duration: Yup.string().trim().matches(config.duration_pattern, t(config.duration_HM_error)).label(t("Duration")).required(),
    cost: Yup.string().trim().label(t("Cost")).required().test("Decimal only", t("The field should have decimal only"), decimalOnly),
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    booking_notes: Yup.string().trim().label(t("Booking Notes")),
    client_name: Yup.string().trim().label(t("Client")),
  });
  yupconfig();
  const handleAppointmentSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(appointmentStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // let data = action.payload;
          // let startdate = data.date + "T" + data.start_time;
          setStatus({ success: true });
          resetForm();
          dispatch(servicePriceApi({ service_id: "" }));
          dispatch(closeAddAppointmentForm());
          dispatch(clientAppointmentListViewApi({ client: values.client_id }));
          if (isRangeInfo) {
            dispatch(appointmentListViewApi(isRangeInfo));
            dispatch(busytimeListViewApi(isRangeInfo));
          }
          sweatalert({ title: t("Booked"), text: t("Appointment Booked Successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
            setStatus({ success: false });
          }else if (status === 410) {
            setStatus({ warning: action.payload && action.payload.message });
            setLoading(false);
          }
          setSubmitting(false);
        }
      });
      if (scriptedRef.current) {
        setLoading(false);
      }
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };

  const handleClientAddForm = () => {
    dispatch(openAddClientForm());
  };

  const serviceOptionsData = isServiceOption;
  const staffOptionsData = isStaffOption.length > 0 ? isStaffOption : null;

  const repeatsOptionsData = [
    { value: "No", label: t("No") },
    { value: "Yes", label: t("Yes") },
  ];
  // useEffect(() => {
  //   props.apicall('2022-02-16');
  // }, [props.isRangeInfo]);
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAppointmentSubmit}>
        {(formik) => {
          useEffect(() => {
            if (isServicePrice) {
              let duration = isServicePrice.duration ? MinutesToHours(isServicePrice.duration) : "";
              let cost = isServicePrice.serviceprice && isServicePrice.serviceprice.filter((item) => item.name == "General");
              formik.setFieldValue("duration", duration);
              formik.setFieldValue("cost", cost ? cost[0].price : "");
              formik.setFieldValue("staff_id", "");
            }
            if (client) {
              formik.setFieldValue("client_id", client.id ? client.id : "");
              dispatch(clientSearchName(ucfirst(client.first_name + " " + client.last_name)));
            }
            formik.setFieldValue("repeats", "No");
          }, [isServicePrice, client]);
          return (
            <div className={"drawer appointment-drawer " + rightDrawerOpened} id="addappoinment-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Add Appointment")}</h2>
                    <a
                      className="close-drawer cursor-pointer"
                      onClick={() => {
                        dispatch(servicePriceApi({ service_id: "" }));
                        handlecloseAddAppointmentForm();
                      }}
                    >
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  {/* <button onClick={props.apicall('2022-02-16')}>Click me</button> */}
                  <div className="drawer-body pymd-5 py-3">
                    <div className="mb-3 search">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="">{t("Client")}</label>
                        <a id="addclient-link" className="h6 mb-0 cursor-pointer" onClick={handleClientAddForm}>
                          <i className="fal fa-plus pe-1 small"></i>
                          {t("New Client")}
                        </a>
                      </div>
                      <div className="input-group">
                        <span className="input-group-text" id="inputGroupPrepend">
                          <i className="far fa-search"></i>
                        </span>
                        <input
                          type="text"
                          name="client_name"
                          id="appointmentForm-client_name"
                          className={(formik.touched && formik.touched.client_id && formik.errors && formik.errors.client_id ? "is-invalid" : "") + " form-control search-input"}
                          placeholder={t("Search")}
                          value={isSearchName}
                          onInput={(e) => {
                            formik.setFieldValue("client_id", "");
                            dispatch(clientSearchName(e.target.value));
                          }}
                          onClick={handleClickSearch}
                          onKeyUp={handleKeyUpSearch}
                          onBlur={handleOnBlur}
                        />
                        <a
                          className="close cursor-pointer"
                          style={{ display: isSearchName ? "block" : "none" }}
                          onClick={() => {
                            formik.setFieldValue("client_id", "");
                            handleCloseSearch();
                          }}
                        >
                          <i className="fal fa-times"></i>
                        </a>
                        {/* {formik.errors && formik.errors.client_id && <div className="invalid-feedback">{formik.errors.client_id}</div>} */}
                      </div>
                      <div className={"search-result dropdown-box " + isSearchList} id="search-content">
                        <InfiniteScroll className="" dataLength={SuggetionView.data && SuggetionView.data.length ? SuggetionView.data.length : "0"} next={fetchDataSuggetionList} scrollableTarget="search-content" hasMore={SuggetionView.next_page_url ? true : false} loader={<PaginationLoader />}>
                          <ul className="p-0 m-0 list-unstyled">
                            <SuggetionListView view={SuggetionView} page={"appointmentAddForm"} formik={formik} />
                          </ul>
                        </InfiniteScroll>
                      </div>
                      <InputField type="hidden" name="client_id" id="appointmentForm-client_id" />
                    </div>
                    <div className="mb-3">
                      {/* <InputField type="date" name="date" value={formik.values.date_of_birth} label={t("Date")} controlId="appointmentForm-date" placeholder={t("Select Date")}/> */}
                      <label htmlFor="">{t("Date")}</label>
                      <DatePicker
                        name="dateof"
                        id="appointmentForm-dateof"
                        value={formik.values.dateof}
                        inputClass={(formik.touched && formik.touched.dateof && formik.errors && formik.errors.dateof ? "is-invalid" : "") + " form-control date"}
                        placeholder={t("Select Date")}
                        format={"dddd, DD MMMM YYYY"}
                        minDate={new Date()}
                        onChange={(e) => {
                          let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("dddd, DD MMMM YYYY") : "";
                          formik.setFieldValue("dateof", getselectedDatePicker);
                        }}
                      />
                      {formik.touched && formik.touched.dateof && formik.errors && formik.errors.dateof && <div className="invalid-feedback d-block">{formik.errors.dateof}</div>}
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-4 mb-3">
                        <InputField type="time" name="start_time" value={formik.values.start_time} label={t("Start Time")} controlId="appointmentForm-start_time" />
                      </div>
                      <div className="col-sm-8 mb-3">
                        <ReactSelectField name="service_id" placeholder={t("Choose Service")} value={formik.values.service_id} options={serviceOptionsData} label={t("Service")} controlId="appointmentForm-service_id" isMulti={false} />
                      </div>
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-6 mb-3">
                        <ReactSelectField name="staff_id" placeholder={t("Choose Staff")} value={formik.values.staff_id} options={staffOptionsData} label={t("Staff")} controlId="appointmentForm-staff_id" isMulti={false} />
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <InputField name="duration" value={formik.values.duration} label={t("Duration")} mask="99:99" controlId="appointmentForm-duration" placeholder="--:--" />
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <InputField name="cost" value={formik.values.cost} label={t("Cost")} controlId="appointmentForm-cost" placeholder="$" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <SelectField name="repeats" value={formik.values.repeats} options={repeatsOptionsData} label={t("Repeats")} controlId="appointmentForm-repeats" />
                      {/* <a href="#" className="btn btn-outline-primary mt-3">
                        Add Another Service
                      </a> */}
                    </div>
                    <div className="mb-3">
                      <TextareaField type="text" name="booking_notes" placeholder={t("Add any notes about the appointment")} value={formik.values.booking_notes} label={t("Booking notes")} controlId="appointmentForm-booking_notes" />
                    </div>
                    {formik.status && formik.status.warning && <p className="text-danger mb-0 pt-1 pb-1">{formik.status.warning}</p>}
                  </div>
                  <div className="drawer-footer">
                    <div className="row justify-content-between">
                      <div className="col-auto h5 mb-3">{(getHours(formik.values.duration, "H:m") || getMinutes(formik.values.duration, "H:m")) && t("Total of {{hour}}hr {{minute}}minutes", { hour: getHours(formik.values.duration, "H:m"), minute: getMinutes(formik.values.duration, "H:m") })}</div>
                      <div className="col-auto h5 mb-3 float-end">${formik.values.cost ? formik.values.cost : "00.00"}</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Save Appointment")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
AppointmentAddForm.propTypes = {
  isRangeInfo: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default AppointmentAddForm;
