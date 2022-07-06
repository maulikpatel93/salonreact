import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import yupconfig from "../../../yupconfig";

import config from "../../../config";
import { ReactSelectField } from "component/form/Field";
import { BookingCategoryOptions, BookingServiceOptions, BookingStaffOptions } from "store/slices/bookingbuttonSlice";

const BookingButtons = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const isCategoryOption = useSelector((state) => state.bookingbutton.isCategoryOption);
  const isServiceOption = useSelector((state) => state.bookingbutton.isServiceOption);
  const isStaffOption = useSelector((state) => state.bookingbutton.isStaffOption);

  useEffect(() => {
    dispatch(BookingCategoryOptions({ option: { valueField: "id", labelField: "name" } }));
    // dispatch(BookingServiceOptions({ option: { valueField: "id", labelField: "name" } }));
    // dispatch(BookingStaffOptions({ option: { valueField: "users.id", labelField: "CONCAT(users.last_name,' ',users.first_name)" }, service_id: 0 }));
  }, []);

  const initialValues = {
    category_id: "",
    service_id: "",
    staff_id: "",
  };

  const validationSchema = Yup.object().shape({
    category_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Category")).required())),
    service_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Category")).required())),
    staff_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Category")).required())),
  });
  yupconfig();

  const handlecategoriesubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(false);
    try {
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };

  const categoryOptionsData = isCategoryOption;
  const serviceOptionsData = isServiceOption;
  const staffOptionsData = isStaffOption.length > 0 ? isStaffOption : null;
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlecategoriesubmit}>
        {(formik) => {
          useEffect(() => {
            dispatch(BookingServiceOptions({ option: { valueField: "id", labelField: "name" } }));
          }, []);
          return (
            <div className="row mx-0 h-100">
              <div className="col-xl-6 left-content bg-white text-md-start text-center h-100">
                <h4 className="fw-semibold mb-2">{t("Booking Links")}</h4>
                <h6>{t("Booking links allow your clients to make a booking directly online. Use the options below to customise your booking link. You can create as many links as you wish allowing you to send clients directly to specific services and/or staff members.")}</h6>
              </div>
              <div className="col-xl-6 right-content h-100">
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 text-start border-0 mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <div className="round-icon me-2 d-flex justify-content-center align-items-center">
                      <img src={config.imagepath + "setting.png"} alt="" />
                    </div>
                    <div>
                      <h4 className="mb-0 fw-semibold">{t("Customise your booking link")}</h4>
                    </div>
                  </div>
                  <div className="mb-md-5 mb-4">
                    <h6>{t("You can make everything bookable, or create a unique link for service categories, individual services and staff members.")}</h6>
                  </div>
                  <div className="col-md-5 mx-auto px-0 mb-md-4">
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <ReactSelectField name="category_id" placeholder={t("All Categories")} value={formik.values.category_id} options={categoryOptionsData} label={t("Service Category")} controlId="bookingButtonForm-category_id" isMulti={false} />
                      </div>
                      <div className="mb-3">
                        <ReactSelectField name="service_id" placeholder={t("Choose Service")} value={formik.values.service_id} options={serviceOptionsData} label={t("Service")} controlId="bookingButtonForm-service_id" isMulti={false} />
                      </div>
                      <div className="mb-3">
                        <ReactSelectField name="staff_id" placeholder={t("Choose Staff")} value={formik.values.staff_id} options={staffOptionsData} label={t("Staff")} controlId="bookingButtonForm-staff_id" isMulti={false} service_id={formik.values.service_id} />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        {t("Create a Link")}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 text-start border-0">
                  <div className="d-flex align-items-center mb-2">
                    <div className="round-icon me-2 d-flex justify-content-center align-items-center">
                      <img src={config.imagepath + "link.svg"} alt="" />
                    </div>
                    <div>
                      <h4 className="mb-0 fw-semibold">{t("Get link")}</h4>
                    </div>
                  </div>
                  <div>
                    <h6>{t("Copy and paste this link to use")}</h6>
                    <div className="pest-link mb-2">https://bookings.beauti.com.au/businessname/service=1234&staff=5678</div>
                    <a href="#" className="color-wine">
                      {t("Copy link")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default BookingButtons;
