import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, Field } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, MapAddressField, ReactSelectField, TextareaField, SwitchField, InputFieldImage } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeAddAppointmentForm, appointmentStoreApi } from "../../../store/slices/appointmentSlice";
import { openAddClientForm, clientGridViewApi, openClientSearchList, closeClientSearchList, clientSuggetionListApi, clientSearchName } from "store/slices/clientSlice";
import SuggetionListView from "pages/clients/List/SuggetionListView";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

const AppointmentAddForm = () => {
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState("");
  const rightDrawerOpened = useSelector((state) => state.appointment.isOpenedAddForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const isSearchList = useSelector((state) => state.client.isSearchList);
  const isSearchName = useSelector((state) => state.client.isSearchName);
  const SuggetionView = useSelector((state) => state.client.isSuggetionListView);

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
    date: "",
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
    date: Yup.string().trim().label(t("Date")).required(),
    start_time: Yup.string().trim().label(t("Start Time")).required(),
    duration: Yup.string().trim().label(t("Duration")).required(),
    cost: Yup.string().trim().label(t("Cost")).required(),
    repeats: Yup.string().trim().label(t("Repeats")).required(),
    booking_notes: Yup.string().trim().label(t("Booking Notes")),
    client_name: Yup.string().trim().label(t("Client")),
  });
  yupconfig();

  const handleAppointmentSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(appointmentStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddAppointmentForm());
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
        } else if (action.meta.requestStatus == "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status == 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
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
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAppointmentSubmit}>
        {(formik) => {
          // useEffect(() => {
          //   formik.setFieldValue("date", getselectedDatePicker, false);
          // }, [getselectedDatePicker]);
          console.log(formik.values);
          return (
            <div className={"drawer appointment-drawer " + rightDrawerOpened} id="addappoinment-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 pe-3">{t("Add Appointment")}</h2>
                    <a className="close-drawer cursor-pointer" onClick={handlecloseAddAppointmentForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body pymd-5 py-3">
                    <div className="mb-3 search">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="">{t("Client")}</label>
                        <a id="addclient-link" className="h6 mb-0" onClick={handleClientAddForm}>
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
                          className={(formik.errors && formik.errors.client_id ? "is-invalid" : "") + " form-control search-input"}
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
                        name="date"
                        id="appointmentForm-date"
                        value={formik.values.date}
                        inputClass={(formik.errors && formik.errors.date ? "is-invalid" : "") + " form-control date"}
                        placeholder={t("Select Date")}
                        format={"dddd, DD MMMM YYYY"}
                        onChange={(e) => {
                          let getselectedDatePicker = e ? moment(e?.toDate?.().toString()).format("dddd, DD MMMM YYYY") : "";
                          formik.setFieldValue("date", getselectedDatePicker);
                        }}
                      />
                      {formik.errors && formik.errors.date && <div className="invalid-feedback d-block">{formik.errors.date}</div>}
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-4 mb-3">
                        <InputField type="time" name="start_time" value={formik.values.start_time} label={t("Start Time")} controlId="appointmentForm-start_time" />
                      </div>
                      <div className="col-sm-8 mb-3">
                        <label htmlFor="">Service</label>
                        <select name="" id="" className="form-control">
                          <option value="">Choose Service</option>
                          <option value="">Service</option>
                          <option value="">Service</option>
                        </select>
                      </div>
                    </div>
                    <div className="row gx-2">
                      <div className="col-sm-6 mb-3">
                        <label htmlFor="">Staff</label>
                        <select name="" id="" className="form-control">
                          <option value="">Choose Staff</option>
                          <option value="">Member</option>
                          <option value="">Member</option>
                        </select>
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <label htmlFor="">Duration</label>
                        <input type="text" className="form-control" placeholder="--/--" />
                      </div>
                      <div className="col-sm-3 col-6 mb-3">
                        <label htmlFor="">Cost</label>
                        <input type="text" className="form-control" placeholder="$" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Repeats</label>
                      <select name="" id="" className="form-control">
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                      <a href="#" className="btn btn-outline-primary mt-3">
                        Add Another Service
                      </a>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Booking notes</label>
                      <textarea id="my-textarea" className="form-control" name="" rows="5" placeholder="Add any notes about the appointment"></textarea>
                    </div>
                  </div>
                  <div className="drawer-footer">
                    <div className="row justify-content-between">
                      <div className="col-auto h5 mb-3">Total of 1hr 45 minutes</div>
                      <div className="col-auto h5 mb-3">$180.00</div>
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

export default AppointmentAddForm;
