import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";
import { InputField, TextareaField, ReactSelectField, SwitchField } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";
import { decimalOnly } from "../../../component/form/Validation";
import { ucfirst } from "helpers/functions";
// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
import { closeAddServiceForm, serviceStoreApi, addonservicesAction } from "../../../store/slices/serviceSlice";
import { removeImage } from "../../../store/slices/imageSlice";
import useScriptRef from "../../../hooks/useScriptRef";

const ServiceAddForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.service.isOpenedAddForm);
  const isCategoryOption = useSelector((state) => state.category.isCategoryOption);
  const isTaxOption = useSelector((state) => state.tax.isTaxOption);
  const isAddonServices = useSelector((state) => state.service.isAddonServices);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const handleCloseAddServiceForm = () => {
    dispatch(closeAddServiceForm());
    dispatch({ type: "service/detail/rejected" });
    dispatch(removeImage());
  };

  const initialValues = {
    name: "",
    category_id: "",
    description: "",
    service_price: {
      general: {
        price: "",
        add_on_price: "",
      },
      junior: {
        price: "",
        add_on_price: "",
      },
      senior: {
        price: "",
        add_on_price: "",
      },
    },
    duration: "",
    padding_time: "",
    tax_id: "",
    service_booked_online: "",
    deposit_booked_online: "",
    deposit_booked_price: "",
    add_on_services: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).label(t("service_name")).trim().required(),
    category_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("category")).required())),
    description: Yup.string().trim().label(t("description")).required(),
    duration: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("duration")).required())),
    padding_time: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("padding_time")).required())),
    tax_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("tax")).required())),
    service_price: Yup.object().shape({
      general: Yup.object().shape({
        price: Yup.string().trim().label(t("price")).required().test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
        add_on_price: Yup.string().trim().label(t("add_on_price")).test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
      }),
      junior: Yup.object().shape({
        price: Yup.string().trim().label(t("price")).required().test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
        add_on_price: Yup.string().trim().label(t("add_on_price")).test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
      }),
      senior: Yup.object().shape({
        price: Yup.string().trim().label(t("price")).required().test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
        add_on_price: Yup.string().trim().label(t("add_on_price")).test("Decimal only", t("The_field_should_have_decimal_only"), decimalOnly),
      }),
    }),
    service_booked_online: Yup.mixed().nullable(),
    deposit_booked_online: Yup.mixed().nullable(),
    deposit_booked_price: Yup.string()
      .nullable()
      .when("deposit_booked_online", {
        is: 1,
        then: Yup.string().trim().label(t("deposit_booked_price")).required().test("Digits only", t("The_field_should_have_digits_only"), decimalOnly),
      }),
    add_on_services: Yup.array(),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(serviceStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(removeImage());
          dispatch(closeAddServiceForm());
          sweatalert({ title: t("created"), text: t("created_successfully"), icon: "success" });
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
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

  const categoryOptionsData = isCategoryOption;
  const taxOptionsData = isTaxOption;
  const durationOptionsData = [
    { value: "30", label: "30 " + t("minute") },
    { value: "50", label: "50 " + t("minute") },
    { value: "60", label: "60 " + t("minute") },
  ];
  const paddingtimeOptionsData = [
    { value: "30", label: "30 " + t("minute") },
    { value: "50", label: "50 " + t("minute") },
    { value: "60", label: "60 " + t("minute") },
  ];
  const service_price = [
    { name: "General", price: "", add_on_price: "" },
    { name: "Junior", price: "", add_on_price: "" },
    { name: "Senior", price: "", add_on_price: "" },
  ];
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            if (isAddonServices) {
              Object.keys(isAddonServices).map((item) => {
                let addonservicesData = isAddonServices[item].services;
                // console.log(!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true));
                if (addonservicesData) {
                  Object.keys(addonservicesData).map((itemservice) => {
                    let service_id = addonservicesData[itemservice].id;
                    let isServiceChecked = addonservicesData[itemservice].isServiceChecked;
                    // let service_name = addonservicesData[itemservice].name;
                    // console.log(service_name + " " + addonservicesData[itemservice]?.isServiceChecked || false);
                    formik.setFieldValue("add_on_services["+item+"][" + itemservice + "]", isServiceChecked ? service_id : "", false);
                  });
                }
              });
            }
          }, [isAddonServices]);
          return (
            <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addservice-drawer">
              <div className="drawer-wrp position-relative">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
                    <h3 className="mb-0 fw-semibold">{t("new_service")}</h3>
                    <div className="ms-auto">
                      <button type="button" className="close btn me-1 cursor-pointer" onClick={handleCloseAddServiceForm}>
                        {t("cancel")}
                      </button>
                      <button type="submit" className="btn" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("save")}
                      </button>
                    </div>
                  </div>
                  <div className="drawer-body">
                    <div className="col-xxl-6 col-xl-10 col-md-12 mx-auto add-form px-md-4 px-1 py-lg-5 py-3">
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("description")}</h4>
                          <p>{t("add_the_name_and_description_of_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="mb-3">
                            <InputField type="text" name="name" value={formik.values.name} label={t("service_name")} controlId="serviceForm-name" />
                          </div>
                          <div className="mb-3">
                            <ReactSelectField name="category_id" placeholder={t("search_option")} value={formik.values.category_id} options={categoryOptionsData} label={t("category")} controlId="serviceForm-category_id" isMulti={false} />
                          </div>
                          <div className="mb-3">
                            <TextareaField name="description" value={formik.values.description} label={t("description")} controlId="serviceForm-description" />
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("price")}</h4>
                          <p className="text-sm">{t("price_note_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-3 mb-2 col-4"></div>
                            <div className="col-lg-3 col-md-4 col-4 mb-2">{t("price")}</div>
                            <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">{t("add_on_price")}</div>
                          </div>
                          {service_price &&
                            Object.keys(service_price).map((item, i) => {
                              let service_price_name = service_price[item].name.toLowerCase();
                              return (
                                <div className="row" key={i}>
                                  <div className="col-md-3 mb-2 col-4">
                                    <label htmlFor="">{ucfirst(service_price_name)}</label>
                                  </div>
                                  <div className="col-lg-3 col-md-4 col-4 mb-2">
                                    <InputField type="text" name={"service_price[" + service_price_name + "][price]"} value={formik.values.service_price[service_price_name].price} placeholder="$" label={""} controlId={"serviceForm-" + service_price_name + "-price"} />
                                  </div>
                                  <div className="col-lg-3 col-md-4 col-4 ms-xxl-4 mb-2">
                                    <InputField type="text" name={"service_price[" + service_price_name + "][add_on_price]"} value={formik.values.service_price[service_price_name].add_on_price} placeholder="$" label={""} controlId={"serviceForm-" + service_price_name + "-add_on_price"} />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("duration")}</h4>
                          <p>{t("how_long_is_this_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-auto">
                              <ReactSelectField name="duration" placeholder={t("search_option")} value={formik.values.duration} options={durationOptionsData} label={t("duration")} controlId="serviceForm-duration" isMulti={false} />
                            </div>
                            <div className="col-auto">
                              <ReactSelectField name="padding_time" placeholder={t("search_option")} value={formik.values.padding_time} options={paddingtimeOptionsData} label={t("padding_time")} controlId="serviceForm-padding_time" isMulti={false} />
                            </div>
                          </div>
                          <p>{t("padding_time_note")}</p>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("tax")}</h4>
                          <p>{t("set_the_tax_rate")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-8 mb-3">
                              <ReactSelectField name="tax_id" placeholder={t("search_option")} value={formik.values.tax_id} options={taxOptionsData} label={t("tax")} controlId="serviceForm-tax_id" isMulti={false} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("online_bookings")}</h4>
                          <p>{t("online_bookings_note_service")}</p>
                        </div>
                        <div className="col-md-6 pe-md-0">
                          <div className="row">
                            <div className="col-md-12">
                              <SwitchField
                                name="service_booked_online"
                                label={t("service_booked_online")}
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
                                label={t("deposit_booked_online")}
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
                                  <InputField type="text" name="deposit_booked_price" value={formik.values.deposit_booked_price} label={t("deposit_booked_price")} controlId="serviceForm-deposit_booked_price" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="drawer-category-hr"></hr>
                      <div className="row mx-0 addstaff-member pb-0">
                        <div className="col-md-6 ps-md-0 mb-md-0 mb-3">
                          <h4 className="fw-semibold mb-2">{t("add_on_services")}</h4>
                          <p>{t("add_on_services_note")}</p>
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
                                                      id={"add_on_services_"+item+"_" + itemservice}
                                                      name={"add_on_services["+item+"][" + itemservice + "]"}
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
                                {isAddonServices.length <= 0 ? <li>{t("no_data_found")}</li> : ""}
                              </ul>
                            </li>
                          </ul>
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

export default ServiceAddForm;
