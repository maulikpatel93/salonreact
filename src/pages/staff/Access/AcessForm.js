import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// validation Formik
import * as Yup from "yup";
import { Formik, Field } from "formik";
// import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { sweatalert } from "../../../component/Sweatalert2";
// import { decimalOnly } from "../../../component/form/Validation";
import { ucfirst } from "helpers/functions";
// import { closeNewCategoryForm } from "../../../store/slices/categorySlice";
// import { salonaccessUpdateApi } from "../../../store/slices/salonaccessSlice";
import { salonmoduleListViewApi, salonModuleAccessUpdateApi, salonModuleAccessAction } from "../../../store/slices/salonmoduleSlice";
import useScriptRef from "../../../hooks/useScriptRef";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import moment from "moment";

const AccessForm = () => {
  const [loading, setLoading] = useState(false);

  const listview = useSelector((state) => state.salonmodule.isAccessView);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const initialValues = {
    salon_permission_id: [],
    salonmoduleaccess: [],
  };

  const validationSchema = Yup.object().shape({});
  yupconfig();

  const handleStaffSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    setLoading(true);
    try {
      dispatch(salonModuleAccessUpdateApi(values)).then((action) => {
        if (action.meta.requestStatus == "fulfilled") {
          setStatus({ success: true });
          dispatch(salonmoduleListViewApi({ role_id: 5 }));
          sweatalert({ title: t("updated"), text: t("updated_successfully"), icon: "success" });
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
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleStaffSubmit}>
        {(formik) => {
          useEffect(() => {
            if (listview) {
              Object.keys(listview).map((item) => {
                let salonpermission = listview[item].salonpermission;
                // let module_name = listview[item].title;
                // console.log(!addonservicesData.some((itemservice) => itemservice?.isServiceChecked !== true));
                if (salonpermission) {
                  Object.keys(salonpermission).map((itemservice) => {
                    let permission_id = salonpermission[itemservice].id;
                    let access = salonpermission[itemservice].access;
                    // let service_name = salonpermission[itemservice].name;
                    // console.log(module_name + " " + service_name + " " + salonpermission[itemservice]?.access);
                    formik.setFieldValue("salon_permission_id[" + item + "][" + itemservice + "]", permission_id, false);
                    formik.setFieldValue("salonmoduleaccess[" + item + "][" + itemservice + "]", access ? permission_id : "", false);
                  });
                }
              });
            }
          }, [listview]);
          return (
            <div className="bg-white p-4">
              <form noValidate onSubmit={formik.handleSubmit}>
                <ul className="list-unstyled mb-0 ps-lg-4 ps-3 row">
                  {listview &&
                    Object.keys(listview).map((item) => {
                      let module_id = listview[item].id;
                      let module_name = listview[item].title;
                      let salonpermission = listview[item].salonpermission;
                      return (
                        <li className="li col-md-2" key={item} data-id={module_id}>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              checked={!salonpermission.some((itemservice) => itemservice?.access !== true)}
                              value={module_id}
                              name={"salonmodule[" + item + "]"}
                              onChange={(e) => {
                                const { checked } = e.target;
                                let tempUser = salonpermission.map((itemservice) => {
                                  return { ...itemservice, access: checked };
                                });
                                dispatch(salonModuleAccessAction({ ...listview[item], salonpermission: tempUser }));
                              }}
                            />
                            <label>
                              <b>{ucfirst(module_name)}</b>
                            </label>
                          </div>
                          <ul className="list-unstyled mb-0 ps-lg-4 ps-3">
                            {salonpermission &&
                              Object.keys(salonpermission).map((itemservice) => {
                                let permission_id = salonpermission[itemservice].id;
                                let permission_name = salonpermission[itemservice].name;
                                // let access = salonpermission[itemservice].access;
                                return (
                                  <li className="pt-3 pb-3 li" key={itemservice} data-id={permission_id}>
                                    <div className="checkbox">
                                      <input type="hidden" value={permission_id} id={"salon_permission_id" + item + "_" + itemservice} name={"salon_permission_id[" + item + "][" + itemservice + "]"} onChange={formik.handleChange} />
                                      <input
                                        type="checkbox"
                                        value={permission_id}
                                        // checked={formik.values.salonmoduleaccess[j] === permission_id}
                                        checked={salonpermission[itemservice]?.access || false}
                                        id={"salonmoduleaccess" + item + "_" + itemservice}
                                        name={"salonmoduleaccess[" + item + "][" + itemservice + "]"}
                                        onChange={(e) => {
                                          const { value, checked } = e.target;
                                          let tempUser = salonpermission.map((itemservice) => {
                                            return parseInt(itemservice.id) === parseInt(value) ? { ...itemservice, access: checked } : itemservice;
                                          });
                                          dispatch(salonModuleAccessAction({ ...listview[item], salonpermission: tempUser }));
                                        }}
                                      />
                                      <label>{ucfirst(permission_name)}</label>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                  {listview.length <= 0 ? <li className="li">{t("no_data_found")}</li> : ""}
                </ul>
                <div className="row">
                  <div className="col-12 text-center mb-3">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
                      {t("Update")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default AccessForm;
