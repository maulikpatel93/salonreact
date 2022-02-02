import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, FieldArray, Field } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, InputFieldImage, SelectField, SwitchField, MapAddressField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
// import { decimalOnly } from "../../../component/form/Validation";
import { ucfirst } from "helpers/functions";
// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeAddStaffForm, staffStoreApi, addonserviceAction } from "../../../store/slices/staffSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const StaffAddForm = () => {
  const [loading, setLoading] = useState(false);
  const HourList = [
    { days: "Sunday", start_time: "", end_time: "", break_time: [] },
    { days: "Monday", start_time: "", end_time: "", break_time: [] },
    { days: "Tuesday", start_time: "", end_time: "", break_time: [] },
    { days: "Wednesday", start_time: "", end_time: "", break_time: [] },
    { days: "Thursday", start_time: "", end_time: "", break_time: [] },
    { days: "Friday", start_time: "", end_time: "", break_time: [] },
    { days: "Saturday", start_time: "", end_time: "", break_time: [] },
  ];

  const rightDrawerOpened = useSelector((state) => state.staff.isOpenedAddForm);

  const isPriceTierOption = useSelector((state) => state.pricetier.isPriceTierOption);
  const isAddonServices = useSelector((state) => state.staff.isAddonServices);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const handleCloseAddStaffForm = () => {
    dispatch(closeAddStaffForm());
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    profile_photo: "",
    email: "",
    phone_number: "",
    address: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    price_tier_id: "",
    add_on_services: [],
    add_on_category: [],
    time: new Date(),
    working_hours: [
      { days: "Sunday", start_time: "", end_time: "", break_time: [] },
      { days: "Monday", start_time: "", end_time: "", break_time: [] },
      { days: "Tuesday", start_time: "", end_time: "", break_time: [] },
      { days: "Wednesday", start_time: "", end_time: "", break_time: [] },
      { days: "Thursday", start_time: "", end_time: "", break_time: [] },
      { days: "Friday", start_time: "", end_time: "", break_time: [] },
      { days: "Saturday", start_time: "", end_time: "", break_time: [] },
    ],
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("first_name")).required(),
    last_name: Yup.string().trim().max(50).label(t("last_name")).required(),
    profile_photo: Yup.mixed(),
    email: Yup.string().trim().max(100).email().label(t("email")).required(),
    phone_number: Yup.string().trim().matches(config.phone_number_pattern, t(config.phone_number_334_error)).label(t("phone_number")).required(),
    address: Yup.string().trim().label(t("address")),
    street: Yup.string().trim().label(t("street")),
    suburb: Yup.string().trim().label(t("suburb")),
    state: Yup.string().trim().label(t("state")),
    postcode: Yup.string().trim().max(12).label(t("postcode")),
    description: Yup.string().trim().label(t("description")),
    price_tier_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Price_Tier")).required())),
    add_on_services: Yup.array(),
    working_hours: Yup.array().of(
      Yup.object().shape({
        days: Yup.string().trim().label(t("days")).required(),
        start_time: Yup.string().trim().label(t("start_time")).required(),
        end_time: Yup.string().trim().label(t("end_time")).required(),
        break_time: Yup.array().of(
          Yup.object().shape({
            break_title: Yup.string().trim().label(t("break_title")).required(),
            break_start_time: Yup.string().trim().label(t("break_start_time")).required(),
            break_end_time: Yup.string().trim().label(t("break_end_time")).required(),
          }),
        ),
      }),
    ),
  });
  yupconfig();

  const handleStaffSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(staffStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeAddStaffForm());
          sweatalert({ title: t("created"), text: t("created_successfully"), icon: "success" });
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

  const PriceTierOptionsData = isPriceTierOption;

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleStaffSubmit}>
        {(formik) => {
          useEffect(() => {
            if (isAddonServices) {
              Object.keys(isAddonServices).map((item) => {
                let addonservicesData = isAddonServices[item].services;
                if (addonservicesData) {
                  Object.keys(addonservicesData).map((itemservice) => {
                    let service_id = addonservicesData[itemservice].id;
                    let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                    formik.setFieldValue("add_on_services[" + item + "][" + itemservice + "]", isServiceChecked ? service_id : "", false);
                  });
                }
              });
            }
          }, [isAddonServices]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 addstaff-member " : "") + rightDrawerOpened} id="addstaff-member-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-4 py-3">
                    <h1 className="pe-md-5 pe-3 mb-0">{t("New_Staff_Member")}</h1>
                    <a className="close-drawer cursor-pointer" onClick={handleCloseAddStaffForm}>
                      <img src={config.imagepath + "close-icon.svg"} alt="" />
                    </a>
                  </div>
                  <div className="drawer-body">
                    <div className="row mx-0">
                      <div className="col-xl-4 col-md-6 detail">
                        <h3 className="mb-2">{t("Details")}</h3>
                        <h6 className="subtitle">{t("Add_your_staff_member’s_details")}</h6>
                        <div className="row gx-2">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <InputField type="text" name="first_name" value={formik.values.first_name} label={t("first_name")} controlId="staffForm-first_name" />
                            </div>
                            <div className="mb-3">
                              <InputField type="text" name="last_name" value={formik.values.last_name} label={t("last_name")} controlId="staffForm-last_name" />
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <InputFieldImage name="profile_photo" accept="image/*" label={t("profile_photo")} page="staff-form" controlId="staffForm-profile_photo" />
                          </div>
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 mb-3">
                            <InputField type="text" name="phone_number" value={formik.values.phone_number} mask="999-999-9999" label={t("phone_number")} controlId="clientForm-phone_number" />
                          </div>
                          <div className="col-md-6 mb-3">
                            <InputField type="text" name="email" value={formik.values.email} label={t("email")} controlId="clientForm-email" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <MapAddressField name="address" label={t("address")} value={formik.values.address} placeholder={t("typing_address")} controlId="clientForm-address" />
                        </div>
                        <div className="mb-3">
                          <InputField type="text" name="street" value={formik.values.street} label={t("street")} controlId="clientForm-street" />
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 mb-md-4 mb-3">
                            <InputField type="text" name="suburb" value={formik.values.suburb} label={t("suburb")} controlId="clientForm-suburb" />
                          </div>
                          <div className="col-md-3 col-6 mb-md-4 mb-3">
                            <InputField type="text" name="state" value={formik.values.state} label={t("state")} controlId="clientForm-state" />
                          </div>
                          <div className="col-md-3 col-6 mb-md-4 mb-3">
                            <InputField type="text" name="postcode" value={formik.values.postcode} label={t("postcode")} controlId="clientForm-postcode" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <SwitchField
                            name="calendar_booking"
                            label={t("Allow_calendar_bookings")}
                            controlId="clientForm-calendar_booking"
                            value="1"
                            onChange={(e) => {
                              if (e.currentTarget.checked) {
                                setTimeout(() => {
                                  formik.setFieldValue("calendar_booking", 1, false);
                                }, 100);
                              } else {
                                setTimeout(() => {
                                  formik.setFieldValue("calendar_booking", "", false);
                                }, 100);
                              }
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <SelectField name="price_tier_id" placeholder={t("--select--")} value={formik.values.price_tier_id} options={PriceTierOptionsData} label={t("Price_Tier")} controlId="staffForm-price_tier" />
                          <span className="info">
                            <img src={config.imagepath + "info.png"} className="me-2" alt="" />
                            <span className="align-middle">{t("Charge_for_services_based_on_level_of_experience")}</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-6 working-hrs">
                        <h3 className="mb-2">{t("Working_Hours")}</h3>
                        <h6 className="subtitle">{t("Set_the_availability_for_this_staff_member")}</h6>

                        <ul className="list-unstyled mb-0 p-0">
                          {HourList &&
                            HourList.map((item, i) => {
                              let days = item.days;
                              let errors_hour = formik.errors && formik.errors.working_hours && formik.errors.working_hours[i];
                              return (
                                <li key={i}>
                                  <label htmlFor="">{days}</label>
                                  <div className="d-none">
                                    <Field type="hidden" name={`working_hours[${i}][days]`} value={days} className="form-control" id={`staffForm-days-${i}`} />
                                  </div>
                                  <Field type="time" name={`working_hours[${i}][start_time]`} className={(errors_hour && errors_hour.start_time ? "is-invalid" : "") + " form-control"} id={`staffForm-start_time-${i}`} onChange={formik.handleChange} />
                                  <span className="mx-2">to</span>
                                  <Field type="time" name={`working_hours[${i}][end_time]`} className={(errors_hour && errors_hour.end_time ? "is-invalid" : "") + " form-control me-xxl-4 me-2"} id={`staffForm-end_time-${i}`} onChange={formik.handleChange} />
                                  <FieldArray
                                    name={`working_hours.${i}.break_time`}
                                    render={(arrayHelpers) => {
                                      let break_time = formik.values.working_hours && formik.values.working_hours[i] && formik.values.working_hours[i].break_time;
                                      return (
                                        <>
                                          <a
                                            id={`addbreak-link-${i}`}
                                            className="cursor-pointer h6 mb-0 color-wine text-decoration-none"
                                            onClick={() =>
                                              arrayHelpers.push({
                                                break_title: "",
                                                break_start_time: "",
                                                break_end_time: "",
                                              })
                                            }
                                          >
                                            <i className="fal fa-plus pe-1 small"></i>
                                            {t("Break")}
                                          </a>
                                          {break_time && break_time.length > 0
                                            ? break_time.map((bt, j) => {
                                                const errors_breaktime = formik.errors && formik.errors.working_hours && formik.errors.working_hours[i] && formik.errors.working_hours[i].break_time && formik.errors.working_hours[i].break_time[j];
                                                return (
                                                  <div key={i + j}>
                                                    <div className="add-break-time w-100 d-flex align-items-center mt-md-3 mt-2" id={`working_hours-break_time-${j}`}>
                                                      <label htmlFor={`staffForm-break_title-${i}-${item}`}>
                                                        <Field placeholder="" className={(errors_breaktime && errors_breaktime.break_title ? "is-invalid" : "") + " form-control"} name={`working_hours[${i}][break_time][${j}][break_title]`} id={`staffForm-break_title-${i}-${j}`} onChange={formik.handleChange} />
                                                      </label>
                                                      <Field placeholder="" type="time" className={(errors_breaktime && errors_breaktime.break_start_time ? "is-invalid" : "") + " form-control"} name={`working_hours[${i}][break_time][${j}][break_start_time]`} id={`staffForm-break_start_time-${i}-${j}`} onChange={formik.handleChange} />
                                                      <span className="mx-2">to</span>
                                                      <Field placeholder="" type="time" className={(errors_breaktime && errors_breaktime.break_end_time ? "is-invalid" : "") + " form-control"} name={`working_hours[${i}][break_time][${j}][break_end_time]`} id={`staffForm-break_end_time-${i}-${j}`} onChange={formik.handleChange} />
                                                      <a className="close-breaktime ps-xxl-4 ps-2 cursor-pointer" onClick={() => arrayHelpers.remove(j)}>
                                                        <img src={config.imagepath + "close-icon.svg"} alt="" />
                                                      </a>
                                                    </div>
                                                    <div className="">
                                                      {/* <p className="mb-0"><ErrorMessage name={`working_hours[${i}][break_time][${j}][break_start_time]`} /></p>
                                                    <p className="mb-0"><ErrorMessage name={`working_hours[${i}][break_time][${j}][break_end_time]`} /></p> */}
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            : null}
                                        </>
                                      );
                                    }}
                                  />
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="col-xl-4 col-md-12 service">
                        <h3 className="mb-2">{t("Services")}</h3>
                        <h6 className="subtitle">{t("addonservice_staff_note")}</h6>
                        <ul className="list-unstyled mb-0 p-0 m-0">
                          <li className="pt-3 pb-0 mt-0 all-staff">
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                checked={formik.values.add_on_all === 1}
                                value="1"
                                name="add_on_all"
                                onChange={(e) => {
                                  const { checked } = e.target;
                                  if (checked) {
                                    formik.setFieldValue("add_on_all", 1);
                                  } else {
                                    formik.setFieldValue("add_on_all", 0);
                                  }
                                  if (isAddonServices) {
                                    Object.keys(isAddonServices).map((item) => {
                                      let addonservicesData = isAddonServices[item].services;
                                      let tempUser = addonservicesData.map((itemservice) => {
                                        return { ...itemservice, isServiceChecked: checked };
                                      });
                                      dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                    });
                                  }
                                }}
                              />
                              <label>{t("all_services")}</label>
                            </div>
                            <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                              {isAddonServices &&
                                Object.keys(isAddonServices).map((item) => {
                                  let category_id = isAddonServices[item].id;
                                  let category_name = isAddonServices[item].name;
                                  let addonservicesData = isAddonServices[item].services;
                                  return (
                                    <li className="pt-3 pb-3" key={item} data-id={category_id}>
                                      <div className="checkbox">
                                        <input
                                          type="checkbox"
                                          checked={!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true)}
                                          value={category_id}
                                          name={"add_on_category[" + item + "]"}
                                          onChange={(e) => {
                                            const { checked } = e.target;
                                            let tempUser = addonservicesData.map((itemservice) => {
                                              return { ...itemservice, isServiceChecked: checked };
                                            });
                                            dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                          }}
                                        />
                                        <label>
                                          <b>{ucfirst(category_name)}</b>
                                        </label>
                                      </div>
                                      <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                                        {addonservicesData &&
                                          Object.keys(addonservicesData).map((itemservice) => {
                                            let service_id = addonservicesData[itemservice].id;
                                            let service_name = addonservicesData[itemservice].name;
                                            // let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                                            return (
                                              <li className="pt-3 pb-3" key={itemservice} data-id={service_id}>
                                                <div className="checkbox">
                                                  <input
                                                    type="checkbox"
                                                    value={service_id}
                                                    // checked={formik.values.add_on_services[j] === service_id}
                                                    checked={addonservicesData[itemservice]?.isServiceChecked || false}
                                                    id={"add_on_services_" + item + "_" + itemservice}
                                                    name={"add_on_services[" + item + "][" + itemservice + "]"}
                                                    onChange={(e) => {
                                                      const { value, checked } = e.target;
                                                      let tempUser = addonservicesData.map((itemservice) => {
                                                        return parseInt(itemservice.id) === parseInt(value) ? { ...itemservice, isServiceChecked: checked } : itemservice;
                                                      });
                                                      dispatch(addonserviceAction({ ...isAddonServices[item], services: tempUser }));
                                                    }}
                                                  />
                                                  <label>{ucfirst(service_name)}</label>
                                                </div>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </li>
                                  );
                                })}
                              {isAddonServices.length <= 0 ? <li>{t("no_data_found")}</li> : ""}
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="drawer-footer text-center">
                    <button type="submit" className="btn btn-lg" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Create_Staff_Member")}
                    </button>
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

export default StaffAddForm;
