import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm, sweatalert } from "../../../component/Sweatalert2";
import { serviceDeleteApi, serviceDetailApi, openEditServiceForm, addonservices, addonstaff } from "../../../store/slices/serviceSlice";
import { categoryOptions } from "../../../store/slices/categorySlice";
import { taxOptions } from "../../../store/slices/taxSlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
// import ReactPaginate from 'react-paginate';
import { checkaccess } from "helpers/functions";

const ServiceListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const views = props.view;
  const role_id = props.role_id;
  const access = props.access;

  const objectData = views && views.data ? views.data : views;

  const handleServiceDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this service?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(serviceDeleteApi({ id: props.id })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const appointment = action.payload && action.payload.message && action.payload.message.appointment;
          if (status === 410) {
            sweatalert({ title: `<h4 class="text-danger">${t("This service has not been deleted as {{ appointmenttotal }} appointments have already been booked for this service.", { appointmenttotal: appointment })}</h4>`, text: t("Uploaded successfully"), icon: "warning" });
          }
        }
      });
    }
  };

  const handleServiceEditForm = (e) => {
    const id = e.currentTarget.closest(".service-view-tr").dataset.id;
    dispatch(openEditServiceForm());
    dispatch(serviceDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        const detail = action.payload;
        if (detail.image) {
          dispatch(selectImage({ name: detail.image, size: "", type: "", url: detail.image_url }));
        } else {
          dispatch(removeImage());
        }
        dispatch(addonservices({ isNotId: id }));
        dispatch(addonstaff({ service_id: id }));
        dispatch(categoryOptions({ option: { valueField: "id", labelField: "name" } }));
        dispatch(taxOptions({ option: { valueField: "id", labelField: "name" } }));
      }
    });
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let duration = objectData[item].duration;
          // let serviceprice = objectData[item].serviceprice;
          let category_name = objectData[item].category && objectData[item].category.name;
          let add_on_service = objectData[item].addonservices;
          return (
            <tr className="service-view-tr" key={i} data-id={id}>
              <td>{i + 1}</td>
              <td>{ucfirst(name)}</td>
              <td>{duration}</td>
              <td>{category_name}</td>
              <td>
                {add_on_service &&
                  Object.keys(add_on_service).map((sp) => {
                    let name = add_on_service[sp].name;
                    return (
                      <a key={sp} className="btn btn-sm btn-outline-primary cursor-auto me-1 mb-1">
                        {name}
                      </a>
                    );
                  })}
              </td>
              {(checkaccess({ name: "update", role_id: role_id, controller: "services", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "services", access })) && (
                <td className="ps-0 text-end" width="60px">
                  <div className="dropdown d-inline-block setting-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                      <i className="far fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                      <ul className="p-0 m-0 list-unstyled">
                        {checkaccess({ name: "update", role_id: role_id, controller: "services", access }) && (
                          <li>
                            <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleServiceEditForm(e, { tab: "servicedetail" })}>
                              <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                              {t("Edit")}
                            </a>
                          </li>
                        )}
                        {checkaccess({ name: "delete", role_id: role_id, controller: "services", access }) && (
                          <li>
                            <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleServiceDelete}>
                              <i className="far fa-trash me-3"></i>
                              {t("Delete")}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          );
        })}
    </>
  );
};
ServiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
  role_id: PropTypes.number,
};
export default ServiceListView;
