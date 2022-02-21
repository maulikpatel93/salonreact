import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { InputField, MapAddressField, ReactSelectField, TextareaField, SwitchField, InputFieldImage } from "../../../component/form/Field";
import { sweatalert } from "../../../component/Sweatalert2";

import useScriptRef from "../../../hooks/useScriptRef";
import { closeAddBusytimeForm, busytimeStoreApi } from "../../../store/slices/busytimeSlice";

const BusytimeAddForm = () => {
  const [loading, setLoading] = useState(false);
  const rightDrawerOpened = useSelector((state) => state.busytime.isOpenedAddForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scriptedRef = useScriptRef();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const handlecloseAddBusytimeForm = () => {
    dispatch(closeAddBusytimeForm());
  };

  const initialValues = {
    first_name: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().max(50).label(t("First Name")).required(),
  });
  yupconfig();

  const handleClientSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(busytimeStoreApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddBusytimeForm());
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

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleClientSubmit}>
        {(formik) => {
          return (
      <div className="drawer" id="addbusytime-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">Add Busy Time</h2>
            <a className="close-drawer">
              <img src="assets/images/close-icon.svg" alt="" />
            </a>
          </div>
          <div className="drawer-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="">Staff Member</label>
                <select name="" id="" className="form-control">
                  <option value="">Select Staff Member</option>
                  <option value="">Member</option>
                  <option value="">Member</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="">Date</label>
                <input type="text" className="form-control date" defaultValue="Wednesday, August 19th 2021" placeholder="Select Date" />
              </div>
              <div className="row gx-3">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Start Time</label>
                  <input type="text" className="form-control" placeholder="--/--" />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">End Time</label>
                  <input type="text" className="form-control" placeholder="--/--" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="">Repeats</label>
                <select name="" id="" className="form-control">
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
              <div className="mb-3 error">
                <label htmlFor="">Reason</label>
                <textarea id="my-textarea" className="form-control" name="" rows="8" placeholder="e.g. Training, lunch break etc"></textarea>
                <span className="error-txt">Error</span>
              </div>
              <input type="submit" className="btn w-100 btn-lg" defaultValue="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }}
</Formik>
</>
);
};

export default BusytimeAddForm;
