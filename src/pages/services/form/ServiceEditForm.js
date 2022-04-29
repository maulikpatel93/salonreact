import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, SwitchField, TextareaField, ReactSelectField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
import { ucfirst } from "helpers/functions";
import Swal from "sweetalert2";

import { closeEditServiceForm, serviceUpdateApi, addonservices, addonservicesAction, addonstaffAction } from "../../../store/slices/serviceSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const ServiceEditForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.service.isOpenedEditForm);
  const detail = useSelector((state) => state.service.isDetailData);
  const isCategoryOption = useSelector((state) => state.category.isCategoryOption);
  const isTaxOption = useSelector((state) => state.tax.isTaxOption);
  const isAddonServices = useSelector((state) => state.service.isAddonServices);
  const isAddonStaff = useSelector((state) => state.service.isAddonStaff);
  const isPriceTierOption = useSelector((state) => state.pricetier.isPriceTierOption);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseEditCategoryForm = () => {
    dispatch(closeEditServiceForm());
    dispatch({ type: "service/detail/rejected" });
    dispatch(removeImage());
  };

  const initialValues = {
    name: "",
    category_id: "",
    description: "",
    service_price: [],
    duration: "",
    padding_time: "",
    tax_id: "",
    service_booked_online: "",
    deposit_booked_online: "",
    deposit_booked_price: "",
    add_on_all: 0,
    add_on_services: [],
    add_on_category: [],
    add_on_price_tier: [],
    add_on_staff: [],
    pagetype: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).label(t("Service Name")).trim().required(),
    category_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Category")).required())),
    description: Yup.string().trim().label(t("Description")).required(),
    duration: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Duration")).required())),
    padding_time: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Padding Time")).required())),
    tax_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Tax")).required())),
    service_price: Yup.array().of(
      Yup.object().shape({
        price_tier_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required(t("Required")) : Yup.string().nullable().label(t("Price Tier")).required())),
        price: Yup.string().trim().label(t("Price")).required(t("Required")).test("Decimal only", t("The field should have decimal only"), decimalOnly),
        add_on_price: Yup.string().trim(t("Required")).label(t("Add-on Price")).test("Decimal only", t("The field should have decimal only"), decimalOnly),
      }),
    ),
    service_booked_online: Yup.mixed().nullable(),
    deposit_booked_online: Yup.mixed().nullable(),
    deposit_booked_price: Yup.string()
      .nullable()
      .when("deposit_booked_online", {
        is: 1,
        then: Yup.string().trim().label(t("Deposit booked price")).required().test("Digits only", t("The field should have digits only"), decimalOnly),
      }),
    add_on_services: Yup.array(),
    add_on_staff: Yup.array(),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(serviceUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeEditServiceForm());
          dispatch(addonservices({ isNotId: action.payload.id }));
          sweatalert({ title: t("Updated"), text: t("Updated Successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          const data = action.payload && action.payload.message && action.payload.message.appointmentMatchAll;
          if (status === 422) {
            setErrors(errors);
          } else if (status === 410) {
            setLoading(false);
            let htmlAppointmentMatchAll = "";
            if (data) {
              htmlAppointmentMatchAll += `<p class="text-danger text-justify">${t("You cannot remove / update this staff because these staff services have already booked an appointment.")}</p><div class="table-respoinsive"><table class="table appointmentStaffList"><thead><tr><th class="text-start">${t("Staff")}</th><th>${t("Total Appointment")}</th></tr></thead><tbody>`;
              Object.keys(data).map((item) => {
                let first_name = data[item].staff.first_name;
                let last_name = data[item].staff.last_name;
                let email = data[item].staff.email;
                let appointmentcount = data[item].appointmentcount;
                htmlAppointmentMatchAll += `<tr><td class="text-start">${ucfirst(first_name + " " + last_name)}<br>${email}</td><td>${appointmentcount}</td></tr>`;
              });
              htmlAppointmentMatchAll += "<tbody></tbody></table></div>";
            }
            Swal.fire({
              title: "Do you want to save the changes?",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Save",
              // denyButtonText: 'No',
              html: htmlAppointmentMatchAll,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                values.pagetype = "appointmentpopup";
                handlecategoriesubmit(values, { setErrors, setStatus, setSubmitting, resetForm });
              }
            });
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

  const categoryOptionsData = isCategoryOption;
  const taxOptionsData = isTaxOption;
  const durationOptionsData = [
    { value: "30", label: "30 " + t("Minute") },
    { value: "50", label: "50 " + t("Minute") },
    { value: "60", label: "60 " + t("Minute") },
  ];
  const paddingtimeOptionsData = [
    { value: "30", label: "30 " + t("Minute") },
    { value: "50", label: "50 " + t("Minute") },
    { value: "60", label: "60 " + t("Minute") },
  ];

  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            if (detail) {
              const fields = ["id", "name", "category_id", "tax_id", "description", "duration", "padding_time", "service_booked_online", "deposit_booked_online", "deposit_booked_price", "tax_id", "category_id"];
              fields.forEach((field) => {
                if (["service_booked_online", "deposit_booked_online"].includes(field)) {
                  formik.setFieldValue(field, detail[field] ? parseInt(detail[field]) : "", false);
                } else {
                  let detail_field = detail[field] ? detail[field] : "";
                  formik.setFieldValue(field, detail_field, false);
                }
              });
              // let service_price = detail.serviceprice;
              // service_price.forEach((service_price, item) => {
              //   let price = service_price.price ? service_price.price : "";
              //   let add_on_price = service_price.add_on_price ? service_price.add_on_price : "";
              //   formik.setFieldValue("service_price[" + item + "][price]", price, false);
              //   formik.setFieldValue("service_price[" + item + "][add_on_price]", add_on_price, false);
              // });
            }

            if (isPriceTierOption.length > 0) {
              Object.keys(isPriceTierOption).map((item) => {
                let price_tier_id = isPriceTierOption[item].value;
                formik.setFieldValue("service_price[" + item + "][price_tier_id]", price_tier_id, false);
                if (detail) {
                  let obj = detail.serviceprice && detail.serviceprice.filter((item) => item.pricetier.id === price_tier_id);
                  let objprice = obj.length > 0 ? obj[0].price : "";
                  let objadd_on_price = obj.length > 0 ? obj[0].add_on_price : "";
                  let price = objprice;
                  let add_on_price = objadd_on_price;
                  if (formik.values.service_price.length > 0) {
                    if (formik.values.service_price[item]) {
                      price = formik.values.service_price[item].price !== undefined ? formik.values.service_price[item].price : objprice;
                      add_on_price = formik.values.service_price[item].add_on_price !== undefined ? formik.values.service_price[item].add_on_price : objadd_on_price;
                    }
                  }
                  formik.setFieldValue("service_price[" + item + "][price]", price, false);
                  formik.setFieldValue("service_price[" + item + "][add_on_price]", add_on_price, false);
                }
              });
            }
          }, [detail, isPriceTierOption]);
          console.log(formik.values);
          useEffect(() => {
            if (isAddonStaff.length > 0) {
              Object.keys(isAddonStaff).map((item) => {
                let addonstaffData = isAddonStaff[item].staff;
                if (addonstaffData) {
                  Object.keys(addonstaffData).map((itemstaff) => {
                    let service_id = addonstaffData[itemstaff].id;
                    let isStaffChecked = addonstaffData[itemstaff].isStaffChecked;
                    formik.setFieldValue("add_on_staff[" + item + "][" + itemstaff + "]", isStaffChecked ? service_id : "", false);
                  });
                }
              });
            }
          }, [isAddonStaff]);
          useEffect(() => {
            if (isAddonServices.length > 0) {
              Object.keys(isAddonServices).map((item) => {
                let addonservicesData = isAddonServices[item].services;
                // console.log(!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true));
                if (addonservicesData) {
                  Object.keys(addonservicesData).map((itemservice) => {
                    let service_id = addonservicesData[itemservice].id;
                    let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                    // let service_name = addonservicesData[itemservice].name;
                    // console.log(service_name + " " + isServiceChecked);
                    formik.setFieldValue("add_on_services[" + item + "][" + itemservice + "]", isServiceChecked ? service_id : "", false);
                  });
                }
              });
            }
          }, [isAddonServices]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="editservice-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("Edit Service")}</h3>
                    <div className="ms-auto">
                      <a className="close btn btn-primary me-1 cursor-pointer" onClick={handleCloseEditCategoryForm}>
                        {t("Cancel")}
                      </a>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="col-xxl-6 col-xl-10 col-md-12 mx-auto add-form px-md-4 px-1 py-lg-5 py-3">
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Description")}</h4>
                          <p>{t("Add the name and description of this service.")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="mb-3">
                            <InputField type="text" name="name" value={formik.values.name} label={t("Service Name")} controlId="serviceForm-name" />
                          </div>
                          <div className="mb-3">
                            <ReactSelectField name="category_id" placeholder={t("Select a category")} value={formik.values.category_id} options={categoryOptionsData} label={t("Category")} controlId="serviceForm-category_id" isMulti={false} />
                          </div>
                          <div className="mb-3">
                            <TextareaField name="description" placeholder={t("Add a short description")} value={formik.values.description} label={t("Description")} controlId="serviceForm-description" />
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Price")}</h4>
                          <p className="text-sm">{t("Add the pricing options of the service. If you wish to offer this service at a special price when booked with another service, enter an add-on price for it.")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-3 mb-2 col-4"></div>
                            <div className="col-lg-3 col-md-4 col-4 mb-2">{t("Price")}</div>
                            <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">{t("Add-on Price")}</div>
                          </div>
                          {isPriceTierOption.length > 0 &&
                            Object.keys(isPriceTierOption).map((item, i) => {
                              // let price_tier_id = isPriceTierOption[item].value;
                              let price_tier_name = isPriceTierOption[item].label;
                              let errors_price = formik.errors && formik.errors.service_price && formik.errors.service_price[item];
                              return (
                                <div className="row" key={i}>
                                  <div className="col-md-3 mb-2 col-4">
                                    <label htmlFor="">{ucfirst(price_tier_name)}</label>
                                  </div>
                                  <div className="col-lg-3 col-md-4 col-4 mb-2">
                                    <Field placeholder={"$"} value={formik.values.service_price[item] ? formik.values.service_price[item].price : ""} className={(errors_price && errors_price.price ? "is-invalid" : "") + " form-control"} name={`service_price[${item}][price]`} id={"serviceForm-" + item + "-price"} onChange={formik.handleChange} />
                                    {errors_price && errors_price.price && <ErrorMessage name={`service_price[${item}][price]`} component="div" className="invalid-feedback d-block" />}
                                    {/* <InputField type="text" name={"service_price[" + item + "][price]"}  placeholder="$" label={""} controlId={"serviceForm-" + item + "-price"} /> */}
                                  </div>
                                  <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">
                                    <Field placeholder={"$"} value={formik.values.service_price[item] ? formik.values.service_price[item].add_on_price : ""} className={(errors_price && errors_price.add_on_price ? "is-invalid" : "") + " form-control"} name={`service_price[${item}][add_on_price]`} id={"serviceForm-" + item + "-add_on_price"} onChange={formik.handleChange} />
                                    {errors_price && errors_price.price && <ErrorMessage name={`service_price[${item}][add_on_price]`} component="div" className="invalid-feedback d-block" />}
                                    {/* <InputField type="text" name={"service_price[" + item + "][add_on_price]"} value={service_addonprice} placeholder="$" label={""} controlId={"serviceForm-" + item + "-add_on_price"} /> */}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Duration")}</h4>
                          <p>{t("How long is this service?")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-auto">
                              <ReactSelectField name="duration" placeholder={t("Search...")} value={formik.values.duration} options={durationOptionsData} label={t("Duration")} controlId="serviceForm-duration" isMulti={false} />
                            </div>
                            <div className="col-auto">
                              <ReactSelectField name="padding_time" placeholder={t("Search...")} value={formik.values.padding_time} options={paddingtimeOptionsData} label={t("Padding Time")} controlId="serviceForm-padding_time" isMulti={false} />
                            </div>
                          </div>
                          <p>{t("Padding time can be added for preparation or clean-up and it will block out the additional time in your calendar.")}</p>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Tax")}</h4>
                          <p>{t("Set the tax rate.")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-8 mb-3">
                              <ReactSelectField name="tax_id" placeholder={t("Search...")} value={formik.values.tax_id} options={taxOptionsData} label={t("Tax") + " (" + t("Included in price") + ")"} controlId="serviceForm-tax_id" isMulti={false} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("Online bookings")}</h4>
                          <p>{t("Choose if this service can be booked online")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-12">
                              <SwitchField
                                name="service_booked_online"
                                label={t("Service can be booked online")}
                                controlId="serviceForm-service_booked_online"
                                value={"1"}
                                onChange={(e) => {
                                  if (e.currentTarget.checked) {
                                    setTimeout(() => {
                                      formik.setFieldValue("service_booked_online", 1, false);
                                    }, 100);
                                  } else {
                                    setTimeout(() => {
                                      formik.setFieldValue("service_booked_online", "", false);
                                    }, 100);
                                  }
                                  formik.handleChange(e);
                                }}
                              />
                            </div>
                            <div className="col-md-12">
                              <SwitchField
                                name="deposit_booked_online"
                                label={t("Deposit required when booked online")}
                                controlId="serviceForm-deposit_booked_online"
                                value={"1"}
                                onChange={(e) => {
                                  if (e.currentTarget.checked) {
                                    setTimeout(() => {
                                      formik.setFieldValue("deposit_booked_online", 1, false);
                                    }, 100);
                                  } else {
                                    setTimeout(() => {
                                      formik.setFieldValue("deposit_booked_online", "", false);
                                    }, 100);
                                  }
                                  formik.handleChange(e);
                                }}
                              />
                              <div className="row" style={{ display: formik.values.deposit_booked_online == "" || formik.values.deposit_booked_online == 0 ? "none" : "" }}>
                                <div className="mb-3 col-md-6">
                                  <InputField type="text" name="deposit_booked_price" value={formik.values.deposit_booked_price} label={t("Deposit booked price")} controlId="serviceForm-deposit_booked_price" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isAddonStaff.length > 0 ? (
                        <>
                          <hr className="drawer-category-hr"></hr>
                          <div className="row mx-0 addstaff-member pb-0">
                            <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                              <h4 className="fw-semibold mb-2">{t("Staff")}</h4>
                              <p>{t("Choose which staff members are able to perform this service.")}</p>
                            </div>
                            <div className="col-md-6 pe-md-0 service mt-0 pt-0">
                              <ul className="list-unstyled mb-0 p-0 m-0">
                                <li className="pt-3 pb-0 mt-0 all-staff">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      checked={formik.values.add_on_allstaff === 1}
                                      value="1"
                                      name="add_on_allstaff"
                                      onChange={(e) => {
                                        const { checked } = e.target;
                                        if (checked) {
                                          formik.setFieldValue("add_on_allstaff", 1);
                                        } else {
                                          formik.setFieldValue("add_on_allstaff", 0);
                                        }
                                        if (isAddonStaff) {
                                          Object.keys(isAddonStaff).map((item) => {
                                            let addonstaffData = isAddonStaff[item].staff;
                                            let tempUser = addonstaffData.map((itemstaff) => {
                                              return { ...itemstaff, isStaffChecked: checked };
                                            });
                                            dispatch(addonstaffAction({ ...isAddonStaff[item], staff: tempUser }));
                                          });
                                        }
                                      }}
                                    />
                                    <label>{t("All Staff")}</label>
                                  </div>
                                  <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                                    {isAddonStaff &&
                                      Object.keys(isAddonStaff).map((item) => {
                                        let price_tier_id = isAddonStaff[item].id;
                                        let price_tier_name = isAddonStaff[item].name;
                                        let addonstaffData = isAddonStaff[item].staff;
                                        return (
                                          <li className="pt-3 pb-3" key={item} data-id={price_tier_id}>
                                            <div className="checkbox">
                                              <input
                                                type="checkbox"
                                                checked={!addonstaffData.some((itemstaff) => itemstaff?.isStaffChecked !== true)}
                                                value={price_tier_id}
                                                name={"add_on_price_tier[" + item + "]"}
                                                onChange={(e) => {
                                                  const { checked } = e.target;
                                                  let tempUser = addonstaffData.map((itemstaff) => {
                                                    return { ...itemstaff, isStaffChecked: checked };
                                                  });
                                                  dispatch(addonstaffAction({ ...isAddonStaff[item], staff: tempUser }));
                                                }}
                                              />
                                              <label>
                                                <b>{ucfirst(price_tier_name)}</b>
                                              </label>
                                            </div>
                                            <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                                              {addonstaffData &&
                                                Object.keys(addonstaffData).map((itemstaff) => {
                                                  let staff_id = addonstaffData[itemstaff].id;
                                                  let staff_first_name = addonstaffData[itemstaff].first_name;
                                                  let staff_last_name = addonstaffData[itemstaff].last_name;
                                                  // let isStaffChecked = addonstaffData[itemstaff].isStaffChecked;
                                                  return (
                                                    <li className="pt-3 pb-3" key={itemstaff} data-id={staff_id}>
                                                      <div className="checkbox">
                                                        <input
                                                          type="checkbox"
                                                          value={staff_id}
                                                          checked={addonstaffData[itemstaff]?.isStaffChecked || false}
                                                          id={"add_on_staff_" + item + "_" + itemstaff}
                                                          name={"add_on_staff[" + item + "][" + itemstaff + "]"}
                                                          onChange={(e) => {
                                                            const { value, checked } = e.target;
                                                            let tempUser = addonstaffData.map((itemstaff) => {
                                                              return parseInt(itemstaff.id) === parseInt(value) ? { ...itemstaff, isStaffChecked: checked } : itemstaff;
                                                            });
                                                            dispatch(addonstaffAction({ ...isAddonStaff[item], staff: tempUser }));
                                                          }}
                                                        />
                                                        <label>{ucfirst(staff_first_name + " " + staff_last_name)}</label>
                                                      </div>
                                                    </li>
                                                  );
                                                })}
                                            </ul>
                                          </li>
                                        );
                                      })}
                                    {isAddonStaff.length <= 0 ? <li>{t("No data found")}</li> : ""}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      {isAddonServices.length > 0 ? (
                        <>
                          <hr className="drawer-category-hr"></hr>
                          <div className="row mx-0 addstaff-member pb-0">
                            <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                              <h4 className="fw-semibold mb-2">{t("Add-on Services")}</h4>
                              <p>{t("Select which service you would like to offer as add-ons when this service is booked.")}</p>
                            </div>
                            <div className="col-md-6 pe-md-0 service mt-0 pt-0">
                              <ul className="list-unstyled mb-0 p-0 m-0">
                                <li className="pt-3 mt-0 all-staff">
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
                                            dispatch(addonservicesAction({ ...isAddonServices[item], services: tempUser }));
                                          });
                                        }
                                      }}
                                    />
                                    <label>{t("All Services")}</label>
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
                                                  dispatch(addonservicesAction({ ...isAddonServices[item], services: tempUser }));
                                                }}
                                              />
                                              <label>{ucfirst(category_name)}</label>
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
                                                            dispatch(addonservicesAction({ ...isAddonServices[item], services: tempUser }));
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
                                    {isAddonServices.length <= 0 ? <li>{t("No data found")}</li> : ""}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
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

export default ServiceEditForm;
