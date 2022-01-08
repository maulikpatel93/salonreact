import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { serviceManageStock, serviceDeleteApi, serviceDetailApi, serviceSortRemove, openEditServiceForm } from "../../../store/slices/serviceSlice";
import { supplierOptions } from "../../../store/slices/supplierSlice";
import { taxOptions } from "../../../store/slices/taxSlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
// import ReactPaginate from 'react-paginate';

const ServiceListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = props.currentUser;
  const view = props.view;

  // const view = useSelector((state) => state.service.isView);
  const objectData = view && view.data ? view.data : view;

  const handleServiceDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_service"), message: name, confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(serviceDeleteApi({ id: props.id }));
    }
  };

  const handleServiceEditForm = (e, props) => {
    const id = e.currentTarget.closest(".service-view-tr").dataset.id;
    dispatch(openEditServiceForm());
    dispatch(serviceDetailApi({ id })).then(action => {
      if(action.meta.requestStatus == 'fulfilled'){
          const detail = action.payload;
          if (detail.image) {
            dispatch(selectImage({ name: detail.image, size: "", type: "", url: detail.image_url }));
          }else{
            dispatch(removeImage());
          }
          dispatch(serviceManageStock(detail && detail.manage_stock));
          dispatch(supplierOptions({ option: { valueField: "id", labelField: "name" } }));
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
          let sku = objectData[item].sku;
          let cost_price = objectData[item].cost_price;
          let retail_price = objectData[item].retail_price;
          let manage_stock = objectData[item].manage_stock;
          let stock_quantity = objectData[item].stock_quantity;
          let low_stock_threshold = objectData[item].low_stock_threshold;
          let image_url = objectData[item].image_url;
          let supplier_name = objectData[item].supplier && objectData[item].supplier.name;
          return (
            <tr className="service-view-tr" key={i} data-id={id}>
              <td className="pe-0" width="60px">
                {image_url ? (
                  <div className="user">
                    <a data-fancybox="" data-src={image_url}>
                      <img src={image_url} alt="" className="rounded-circle wh-40" />
                    </a>
                  </div>
                ) : (
                  <div className="user-initial">{name.charAt(0)}</div>
                )}
              </td>
              <td>{ucfirst(name)}
              </td>
              <td>{sku}</td>
              <td>{supplier_name}</td>
              <td>{stock_quantity}</td>
              <td>{retail_price}</td>
              <td className="ps-0 text-end" width="60px">
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                      <li>
                        <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleServiceEditForm(e, { tab: "servicedetail" })}>
                          <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                          {t("edit")}
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleServiceDelete}>
                          <i className="far fa-trash me-3"></i>
                          {t("delete")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default ServiceListView;
